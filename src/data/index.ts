import { govQuestions } from "./gov/questions";
import { histQuestions } from "./hist/questions";
import type { ExamId, Question } from "@/lib/types";

export { govQuestions, histQuestions };

export function getBank(examId: ExamId): Question[] {
  return examId === "gov" ? govQuestions : histQuestions;
}
