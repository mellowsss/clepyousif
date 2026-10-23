"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ExamId, Question, SessionMode } from "@/lib/types";
import { BRAND } from "@/lib/brand";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import {
  formatDuration,
  pickExamQuestions,
  pickWeightedGovQuestions,
  pickWeightedHistQuestions,
  scoreSession,
} from "@/lib/scoring";
import { saveResult } from "@/lib/storage";
import { getBank } from "@/data";
import { QuestionCard } from "@/components/QuestionCard";
import { TopicPicker } from "@/components/TopicPicker";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExamShellProps {
  examId: ExamId;
  mode: SessionMode;
}

type Phase = "setup" | "active";

export function ExamShell({ examId, mode }: ExamShellProps) {
  const router = useRouter();
  const config = EXAM_CONFIGS[examId];
  const bank = useMemo(() => getBank(examId), [examId]);

  const [phase, setPhase] = useState<Phase>(mode === "practice" ? "setup" : "active");
  const [topics, setTopics] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [index, setIndex] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const practiceCount = 25;

  const startSession = useCallback(
    (selectedTopics: string[] = []) => {
      try {
        setError(null);
        const count = mode === "exam" ? config.questionCount : practiceCount;
        if (!bank.length) {
          setError("Question bank failed to load. Refresh and try again.");
          return;
        }

        const picked =
          mode === "exam"
            ? examId === "gov"
              ? pickWeightedGovQuestions(bank, count)
              : pickWeightedHistQuestions(bank, count)
            : pickExamQuestions(bank, count, selectedTopics);

        if (!picked.length) {
          setError("No questions available for this selection.");
          return;
        }

        const initial: Record<string, number | null> = {};
        for (const q of picked) initial[q.id] = null;

        setQuestions(picked);
        setAnswers(initial);
        setIndex(0);
        setStartedAt(Date.now());
        setRevealed(false);
        setRemainingMs(mode === "exam" ? config.timeMinutes * 60 * 1000 : null);
        setPhase("active");
      } catch (err) {
        console.error(err);
        setError("Could not start the session. Refresh and try again.");
      }
    },
    [bank, config.questionCount, config.timeMinutes, examId, mode]
  );

  useEffect(() => {
    if (mode === "exam") startSession([]);
  }, [mode, examId, startSession]);

  useEffect(() => {
    if (phase !== "active" || remainingMs === null || remainingMs <= 0) return;
    const id = window.setInterval(() => {
      setRemainingMs((ms) => {
        if (ms === null) return null;
        return Math.max(0, ms - 1000);
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, remainingMs === null]);

  const finish = useCallback(() => {
    if (!questions.length) return;
    const scored = scoreSession(
      examId,
      mode,
      questions,
      answers,
      startedAt || Date.now()
    );
    saveResult(scored);
    router.push(`/${examId}/results`);
  }, [answers, examId, mode, questions, router, startedAt]);

  useEffect(() => {
    if (remainingMs === 0 && questions.length > 0 && phase === "active") {
      finish();
    }
  }, [remainingMs, questions.length, phase, finish]);

  const answeredCount = useMemo(
    () => Object.values(answers).filter((a) => a !== null).length,
    [answers]
  );

  function selectAnswer(choice: number) {
    const q = questions[index];
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.id]: choice }));
    if (mode === "practice") setRevealed(true);
  }

  if (phase === "setup") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <NavBar examId={examId} title={`${config.shortTitle} drill`} />
        <div className="mt-8 space-y-6">
          <header className="space-y-2">
            <h1 className="font-display text-4xl text-[var(--ink)]">Topic drill</h1>
            <p className="text-[var(--muted-ink)]">
              {practiceCount} questions with instant explanations. Untimed so you can learn the
              variations.
            </p>
          </header>
          <TopicPicker examId={examId} selected={topics} onChange={setTopics} />
          {error && <p className="text-sm text-rose-700">{error}</p>}
          <Button size="lg" type="button" onClick={() => startSession(topics)}>
            Start drill
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 space-y-4">
        <NavBar examId={examId} title="Error" />
        <p className="text-rose-700">{error}</p>
        <Button type="button" onClick={() => startSession(topics)}>
          Try again
        </Button>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-[var(--muted-ink)]">
        Loading questions…
      </div>
    );
  }

  const current = questions[index];
  const selected = answers[current.id] ?? null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <NavBar examId={examId} title={mode === "exam" ? "Full exam" : "Practice"} />
        <div className="flex items-center gap-3 text-sm tabular-nums">
          <span className="rounded-full bg-[var(--chip)] px-3 py-1 text-[var(--ink)]">
            {answeredCount}/{questions.length} answered
          </span>
          {remainingMs !== null && (
            <span
              className={cn(
                "rounded-full px-3 py-1 font-semibold",
                remainingMs < 5 * 60 * 1000
                  ? "bg-rose-100 text-rose-800"
                  : "bg-[var(--accent-soft)] text-[var(--ink)]"
              )}
            >
              {formatDuration(remainingMs)}
            </span>
          )}
        </div>
      </div>

      <div className="mb-6 h-1.5 rounded-full bg-[var(--chip)] overflow-hidden">
        <div
          className="h-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <QuestionCard
        question={current}
        index={index}
        total={questions.length}
        selected={selected}
        onSelect={selectAnswer}
        reveal={mode === "practice" && revealed}
        disabled={mode === "practice" && revealed}
      />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            type="button"
            disabled={index === 0}
            onClick={() => {
              const nextIndex = index - 1;
              setIndex(nextIndex);
              const prev = questions[nextIndex];
              setRevealed(
                mode === "practice" && prev ? answers[prev.id] !== null : false
              );
            }}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={index >= questions.length - 1}
            onClick={() => {
              const nextIndex = index + 1;
              setIndex(nextIndex);
              const next = questions[nextIndex];
              setRevealed(
                mode === "practice" && next ? answers[next.id] !== null : false
              );
            }}
          >
            Next
          </Button>
        </div>

        {mode === "practice" && revealed && index < questions.length - 1 && (
          <Button
            type="button"
            onClick={() => {
              setIndex(index + 1);
              setRevealed(false);
            }}
          >
            Continue
          </Button>
        )}

        {(mode === "exam" || index === questions.length - 1) && (
          <Button
            type="button"
            variant={answeredCount === questions.length ? "default" : "secondary"}
            onClick={finish}
          >
            Submit {mode === "exam" ? "exam" : "drill"}
          </Button>
        )}
      </div>

      {mode === "exam" && (
        <details className="mt-8 rounded-xl border border-[var(--line)] bg-white/50 px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium text-[var(--ink)]">
            Jump to question
          </summary>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {questions.map((q, i) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "h-8 w-8 rounded-md text-xs font-medium",
                  i === index && "ring-2 ring-[var(--accent)]",
                  answers[q.id] !== null
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "bg-[var(--chip)] text-[var(--ink)]"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

function NavBar({ examId, title }: { examId: ExamId; title: string }) {
  return (
    <div className="flex items-center justify-between gap-3 w-full min-w-0">
      <Link href="/" className="font-display text-xl tracking-tight text-[var(--ink)]">
        {BRAND.shortName}
      </Link>
      <div className="flex items-center gap-3 text-sm text-[var(--muted-ink)]">
        <span className="hidden sm:inline">{title}</span>
        <Link
          href={`/${examId}`}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          Exit
        </Link>
      </div>
    </div>
  );
}
