"use client";

import type { ExamId, ExamResult, StoredProgress } from "./types";

const KEY = "learn-clep-progress-v1";

const empty: StoredProgress = {
  results: [],
  weakTopics: { gov: [], hist: [] },
};

function read(): StoredProgress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as StoredProgress;
    return {
      results: Array.isArray(parsed.results) ? parsed.results : [],
      weakTopics: {
        gov: parsed.weakTopics?.gov ?? [],
        hist: parsed.weakTopics?.hist ?? [],
      },
    };
  } catch {
    return empty;
  }
}

function write(data: StoredProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadProgress(): StoredProgress {
  return read();
}

export function saveResult(result: ExamResult): StoredProgress {
  const current = read();
  const weak = result.topicScores
    .filter((t) => t.percent < 60)
    .map((t) => t.topic);
  const next: StoredProgress = {
    results: [result, ...current.results].slice(0, 40),
    weakTopics: {
      ...current.weakTopics,
      [result.examId]: weak,
    },
  };
  write(next);
  return next;
}

export function clearProgress() {
  write(empty);
}

export function latestResult(examId: ExamId): ExamResult | null {
  return read().results.find((r) => r.examId === examId) ?? null;
}
