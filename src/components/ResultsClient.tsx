"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ExamId, ExamResult } from "@/lib/types";
import { BRAND } from "@/lib/brand";
import { latestResult } from "@/lib/storage";
import { ResultsBreakdown } from "@/components/ResultsBreakdown";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ResultsClient({ examId }: { examId: ExamId }) {
  const [result, setResult] = useState<ExamResult | null | undefined>(undefined);

  useEffect(() => {
    setResult(latestResult(examId));
  }, [examId]);

  if (result === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-[var(--muted-ink)]">Loading…</div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 space-y-6">
        <Link href="/" className="font-display text-xl text-[var(--ink)]">
          {BRAND.shortName}
        </Link>
        <h1 className="font-display text-3xl text-[var(--ink)]">No results yet</h1>
        <p className="text-[var(--muted-ink)]">Finish an exam or drill to see a breakdown here.</p>
        <div className="flex gap-3">
          <Link href={`/${examId}/exam`} className={cn(buttonVariants())}>
            Start full exam
          </Link>
          <Link href={`/${examId}/practice`} className={cn(buttonVariants({ variant: "outline" }))}>
            Topic drill
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Link href="/" className="font-display text-xl text-[var(--ink)]">
        {BRAND.shortName}
      </Link>
      <div className="mt-8">
        <ResultsBreakdown result={result} />
      </div>
    </div>
  );
}
