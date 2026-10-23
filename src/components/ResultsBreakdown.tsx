"use client";

import Link from "next/link";
import type { ExamResult } from "@/lib/types";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatDuration, passingNote } from "@/lib/scoring";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResultsBreakdownProps {
  result: ExamResult;
}

export function ResultsBreakdown({ result }: ResultsBreakdownProps) {
  const config = EXAM_CONFIGS[result.examId];
  const weak = result.topicScores.filter((t) => t.percent < 60);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
          Session complete
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--ink)]">
          {result.percent}%
        </h1>
        <p className="text-lg text-[var(--muted-ink)]">
          {result.correct} of {result.total} correct · {formatDuration(result.durationMs)} ·{" "}
          {result.mode === "exam" ? "Full exam" : "Topic drill"}
        </p>
        <p className="text-sm text-[var(--muted-ink)] max-w-xl">
          {passingNote(result.percent)} This is practice scoring, not an official CLEP scaled
          score.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
          By topic
        </h2>
        <ul className="space-y-2">
          {result.topicScores.map((topic) => (
            <li
              key={topic.topic}
              className="grid grid-cols-[1fr_auto] gap-3 items-center rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3"
            >
              <div>
                <div className="font-medium text-[var(--ink)]">{topic.label}</div>
                <div className="text-xs text-[var(--muted-ink)]">
                  {topic.correct}/{topic.total}
                </div>
              </div>
              <div className="flex items-center gap-3 min-w-[7rem] justify-end">
                <div className="h-2 w-20 rounded-full bg-[var(--chip)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent)] transition-all"
                    style={{ width: `${topic.percent}%` }}
                  />
                </div>
                <span className="text-sm font-semibold tabular-nums w-10 text-right">
                  {topic.percent}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {weak.length > 0 && (
        <section className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-5 py-4">
          <h3 className="font-medium text-[var(--ink)] mb-2">Focus next</h3>
          <p className="text-sm text-[var(--muted-ink)] mb-3">
            Drill these below 60% before your next timed run.
          </p>
          <ul className="flex flex-wrap gap-2">
            {weak.map((t) => (
              <li
                key={t.topic}
                className="rounded-full bg-[var(--chip)] px-3 py-1 text-xs text-[var(--ink)]"
              >
                {t.label}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${result.examId}/exam`}
          className={cn(buttonVariants({ size: "lg" }))}
        >
          Retake full exam
        </Link>
        <Link
          href={`/${result.examId}/practice`}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Topic drill
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
          Back to Learn
        </Link>
      </div>

      <p className="text-xs text-[var(--muted-ink)]">
        {config.title} · ACE credit-granting recommendation is typically a scaled 50 (3 semester
        hours); your college sets the final policy.
      </p>
    </div>
  );
}
