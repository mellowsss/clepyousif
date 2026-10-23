import Link from "next/link";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const gov = EXAM_CONFIGS.gov;
  const hist = EXAM_CONFIGS.hist;

  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(92vh,52rem)] bg-[linear-gradient(120deg,var(--hero-deep)_0%,var(--hero-mid)_48%,#3d7a6a_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(92vh,52rem)] opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18), transparent 28%), radial-gradient(circle at 80% 20%, rgba(232,196,120,0.28), transparent 32%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col px-5 pb-16 pt-8 md:px-8 md:pt-12">
        <header className="animate-rise">
          <p className="font-[family-name:var(--font-display)] text-[clamp(4.5rem,16vw,9rem)] leading-[0.85] tracking-[-0.04em] text-[#f4efe4]">
            Learn
          </p>
        </header>

        <div className="mt-6 max-w-xl animate-rise-delay space-y-4 text-[#e8f2ef]">
          <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-snug text-[#f7f3ea]">
            CLEP practice that mirrors the real exams.
          </h1>
          <p className="text-base md:text-lg text-[#d5e4df]">
            Thirty focused hours start here — timed American Government and U.S. History II
            drills with outline-weighted questions and topic feedback.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row animate-rise-delay-2">
          <Link
            href="/gov"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 justify-center bg-[#f4efe4] text-[var(--hero-deep)] hover:bg-white px-6"
            )}
          >
            {gov.title}
          </Link>
          <Link
            href="/hist"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-12 justify-center border-[#d7ebe4] bg-transparent text-[#f4efe4] hover:bg-white/10 px-6"
            )}
          >
            {hist.shortTitle}
          </Link>
        </div>

        <p className="mt-auto pt-16 text-xs text-[var(--muted-ink)] max-w-lg">
          Original practice items shaped to College Board CLEP outlines — not official retired
          exams. ACE typically recommends credit at a scaled score of 50; confirm with your school.
        </p>
      </div>
    </main>
  );
}
