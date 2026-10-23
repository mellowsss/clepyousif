"use client";

import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ExamId } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TopicPickerProps {
  examId: ExamId;
  selected: string[];
  onChange: (topics: string[]) => void;
}

export function TopicPicker({ examId, selected, onChange }: TopicPickerProps) {
  const topics = EXAM_CONFIGS[examId].topics;

  function toggle(id: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((t) => t !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-[var(--muted-ink)]">
          Choose topics for a focused drill. Leave all off to mix the full outline.
        </p>
        <button
          type="button"
          className="text-xs uppercase tracking-wider text-[var(--accent)] hover:underline"
          onClick={() => onChange([])}
        >
          Clear
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {topics.map((topic) => {
          const active = selected.includes(topic.id);
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => toggle(topic.id)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-colors",
                active
                  ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-[var(--line)] bg-white/60 hover:bg-white"
              )}
            >
              <div className="font-medium text-[var(--ink)]">{topic.label}</div>
              <div className="text-xs text-[var(--muted-ink)] mt-1">
                CLEP weight ~{topic.weight}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
