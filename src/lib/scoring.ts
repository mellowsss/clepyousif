import type {
  ExamResult,
  Question,
  SessionMode,
  TopicScore,
  ExamId,
} from "./types";
import { EXAM_CONFIGS, TOPIC_LABELS } from "./exam-config";

export function scoreSession(
  examId: ExamId,
  mode: SessionMode,
  questions: Question[],
  answers: Record<string, number | null>,
  startedAt: number,
  completedAt: number = Date.now()
): ExamResult {
  let correct = 0;
  const byTopic = new Map<string, { correct: number; total: number }>();

  for (const q of questions) {
    const bucket = byTopic.get(q.topic) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (answers[q.id] === q.correctIndex) {
      correct += 1;
      bucket.correct += 1;
    }
    byTopic.set(q.topic, bucket);
  }

  const topicScores: TopicScore[] = [...byTopic.entries()]
    .map(([topic, stats]) => ({
      topic,
      label: TOPIC_LABELS[topic] ?? topic,
      correct: stats.correct,
      total: stats.total,
      percent: stats.total ? Math.round((stats.correct / stats.total) * 100) : 0,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const total = questions.length;
  return {
    examId,
    mode,
    correct,
    total,
    percent: total ? Math.round((correct / total) * 100) : 0,
    topicScores,
    completedAt,
    durationMs: Math.max(0, completedAt - startedAt),
  };
}

export function pickExamQuestions(
  bank: Question[],
  count: number,
  topicFilter?: string[]
): Question[] {
  let pool = topicFilter?.length
    ? bank.filter((q) => topicFilter.includes(q.topic))
    : [...bank];

  if (pool.length === 0) pool = [...bank];

  const shuffled = shuffle(pool);
  if (shuffled.length >= count) return shuffled.slice(0, count);

  // If filter is too narrow, top up from full bank (unique ids)
  const seen = new Set(shuffled.map((q) => q.id));
  for (const q of shuffle(bank)) {
    if (seen.has(q.id)) continue;
    shuffled.push(q);
    seen.add(q.id);
    if (shuffled.length >= count) break;
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function pickWeightedGovQuestions(
  bank: Question[],
  count: number
): Question[] {
  const weights: Record<string, number> = {
    institutions: 0.32,
    "civil-liberties": 0.12,
    "parties-interest": 0.18,
    "beliefs-behavior": 0.18,
    constitutional: 0.2,
  };
  return pickByWeights(bank, count, weights);
}

export function pickWeightedHistQuestions(
  bank: Question[],
  count: number
): Question[] {
  const topicWeights: Record<string, number> = {
    "political-policy": 0.3,
    social: 0.3,
    "cultural-intellectual": 0.2,
    economic: 0.1,
    diplomacy: 0.1,
  };
  const byTopic = pickByWeights(bank, count, topicWeights);

  // Prefer ~30% early era / 70% later when possible
  const earlyTarget = Math.round(count * 0.3);
  const early = byTopic.filter((q) => q.era === "1865-1914");
  const late = byTopic.filter((q) => q.era !== "1865-1914");
  if (early.length >= earlyTarget && late.length >= count - earlyTarget) {
    return shuffle([
      ...shuffle(early).slice(0, earlyTarget),
      ...shuffle(late).slice(0, count - earlyTarget),
    ]);
  }
  return byTopic;
}

function pickByWeights(
  bank: Question[],
  count: number,
  weights: Record<string, number>
): Question[] {
  const selected: Question[] = [];
  const used = new Set<string>();

  for (const [topic, weight] of Object.entries(weights)) {
    const n = Math.max(1, Math.round(count * weight));
    const pool = shuffle(bank.filter((q) => q.topic === topic && !used.has(q.id)));
    for (const q of pool.slice(0, n)) {
      selected.push(q);
      used.add(q.id);
    }
  }

  if (selected.length < count) {
    for (const q of shuffle(bank)) {
      if (used.has(q.id)) continue;
      selected.push(q);
      used.add(q.id);
      if (selected.length >= count) break;
    }
  }

  return shuffle(selected).slice(0, count);
}

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function formatDuration(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function passingNote(percent: number): string {
  const ace = EXAM_CONFIGS.gov.aceScoreHint;
  if (percent >= ace) {
    return `Around an ACE-recommended range (${ace}+ scaled is typical for credit — your school sets the real cutoff).`;
  }
  return `Keep drilling weak topics. Many schools use ACE’s ${ace} scaled score as a credit baseline.`;
}
