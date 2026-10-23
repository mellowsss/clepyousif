"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ExamId } from "@/lib/types";
import { BRAND } from "@/lib/brand";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { latestResult } from "@/lib/storage";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ExamHub({ examId, bankSize }: { examId: ExamId; bankSize: number }) {
  const config = EXAM_CONFIGS[examId];
  const [last, setLast] = useState<ReturnType<typeof latestResult>>(null);

  useEffect(() => {
    setLast(latestResult(examId));
  }, [examId]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <Link href="/" className="font-display text-xl text-[var(--ink)]">
        {BRAND.shortName}
      </Link>

      <header className="mt-10 space-y-4">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          {config.courseCode}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-[var(--ink)] leading-tight">
          {config.title}
        </h1>
        <p className="text-lg text-[var(--muted-ink)] max-w-2xl">{config.description}</p>
        <p className="text-sm text-[var(--muted-ink)]">
          CLEP format: {config.questionCount} questions · {config.timeMinutes} minutes ·{" "}
          {bankSize} practice items in the bank
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={`/${examId}/exam`}
          className={cn(buttonVariants({ size: "lg" }), "min-w-[10rem] justify-center")}
        >
          Timed full exam
        </Link>
        <Link
          href={`/${examId}/practice`}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "min-w-[10rem] justify-center"
          )}
        >
          Topic drill
        </Link>
        {last && (
          <Link
            href={`/${examId}/results`}
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
          >
            Last score: {last.percent}%
          </Link>
        )}
      </div>

      <section className="mt-14 space-y-4">
        <h2 className="font-display text-2xl text-[var(--ink)]">Outline weights</h2>
        <ul className="space-y-2">
          {config.topics.map((topic) => (
            <li
              key={topic.id}
              className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] py-3"
            >
              <span className="text-[var(--ink)]">{topic.label}</span>
              <span className="text-sm tabular-nums text-[var(--muted-ink)]">{topic.weight}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
