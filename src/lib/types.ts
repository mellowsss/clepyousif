export type ExamId = "gov" | "hist";

export type GovTopic =
  | "institutions"
  | "civil-liberties"
  | "parties-interest"
  | "beliefs-behavior"
  | "constitutional";

export type HistTopic =
  | "political-policy"
  | "social"
  | "economic"
  | "cultural-intellectual"
  | "diplomacy";

export type HistEra = "1865-1914" | "1915-present";

export interface Question {
  id: string;
  exam: ExamId;
  topic: GovTopic | HistTopic;
  stem: string;
  choices: [string, string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3 | 4;
  explanation: string;
  era?: HistEra;
  tags?: string[];
}

export interface ExamConfig {
  id: ExamId;
  title: string;
  shortTitle: string;
  courseCode: string;
  description: string;
  questionCount: number;
  timeMinutes: number;
  topics: { id: string; label: string; weight: string }[];
}

export type SessionMode = "exam" | "practice";

export interface ExamSession {
  examId: ExamId;
  mode: SessionMode;
  questionIds: string[];
  answers: Record<string, number | null>;
  startedAt: number;
  durationMs: number | null;
  topicsFilter?: string[];
}

export interface TopicScore {
  topic: string;
  label: string;
  correct: number;
  total: number;
  percent: number;
}

export interface ExamResult {
  examId: ExamId;
  mode: SessionMode;
  correct: number;
  total: number;
  percent: number;
  topicScores: TopicScore[];
  completedAt: number;
  durationMs: number;
}

export interface StoredProgress {
  results: ExamResult[];
  weakTopics: Record<ExamId, string[]>;
}
