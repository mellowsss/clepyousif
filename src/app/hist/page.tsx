import { ExamHub } from "@/components/ExamHub";
import { histQuestions } from "@/data/hist/questions";

export default function HistPage() {
  return <ExamHub examId="hist" bankSize={histQuestions.length} />;
}
