"use client";

import type { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D", "E"] as const;

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  selected: number | null;
  onSelect: (choice: number) => void;
  reveal?: boolean;
  disabled?: boolean;
}

export function QuestionCard({
  question,
  index,
  total,
  selected,
  onSelect,
  reveal = false,
  disabled = false,
}: QuestionCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-3 text-sm text-[var(--muted-ink)]">
        <span>
          Question {index + 1} of {total}
        </span>
        <span className="uppercase tracking-[0.14em] text-xs">
          {question.topic.replace(/-/g, " ")}
        </span>
      </div>

      <h2 className="font-display text-2xl md:text-[1.75rem] leading-snug text-[var(--ink)] whitespace-pre-wrap">
        {question.stem}
      </h2>

      <div className="space-y-2" role="radiogroup" aria-label="Answer choices">
        {question.choices.map((choice, i) => {
          const isSelected = selected === i;
          const isCorrect = question.correctIndex === i;
          const showCorrect = reveal && isCorrect;
          const showWrong = reveal && isSelected && !isCorrect;

          return (
            <button
              key={`${question.id}-${i}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onSelect(i)}
              className={cn(
                "w-full text-left rounded-xl border px-4 py-3 transition-all duration-200",
                "flex gap-3 items-start",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                !reveal &&
                  (isSelected
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-sm"
                    : "border-[var(--line)] bg-white/70 hover:border-[var(--accent)]/50 hover:bg-white"),
                showCorrect && "border-emerald-600 bg-emerald-50",
                showWrong && "border-rose-500 bg-rose-50",
                disabled && "cursor-default"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  isSelected || showCorrect
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "bg-[var(--chip)] text-[var(--ink)]"
                )}
              >
                {LETTERS[i]}
              </span>
              <span className="pt-0.5 text-[0.98rem] leading-relaxed text-[var(--ink)]">
                {choice}
              </span>
            </button>
          );
        })}
      </div>

      {reveal && (
        <div className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-sm leading-relaxed text-[var(--ink)] animate-in-fade">
          <p className="font-medium mb-1">Explanation</p>
          <p className="text-[var(--muted-ink)]">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
