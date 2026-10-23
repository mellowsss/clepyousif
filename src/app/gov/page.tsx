import { ExamHub } from "@/components/ExamHub";
import { govQuestions } from "@/data/gov/questions";

export default function GovPage() {
  return <ExamHub examId="gov" bankSize={govQuestions.length} />;
}
