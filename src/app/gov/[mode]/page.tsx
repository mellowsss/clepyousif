import { notFound } from "next/navigation";
import { ExamShell } from "@/components/ExamShell";
import { ResultsClient } from "@/components/ResultsClient";

const MODES = ["exam", "practice", "results"] as const;

export function generateStaticParams() {
  return MODES.map((mode) => ({ mode }));
}

export default async function GovModePage({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = await params;
  if (!MODES.includes(mode as (typeof MODES)[number])) notFound();

  if (mode === "results") return <ResultsClient examId="gov" />;

  return <ExamShell examId="gov" mode={mode === "exam" ? "exam" : "practice"} />;
}
