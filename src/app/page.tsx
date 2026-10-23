import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { DemoVideo } from "@/components/DemoVideo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const gov = EXAM_CONFIGS.gov;
  const hist = EXAM_CONFIGS.hist;

  return (
    <main className="relative">
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <DemoVideo className="scale-105" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,58,69,0.55)_0%,rgba(22,58,69,0.72)_45%,rgba(15,40,48,0.92)_100%)]"
          />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col px-5 pb-14 pt-8 md:px-8 md:pt-12">
          <header className="animate-rise space-y-2">
            <p className="font-display text-[clamp(3.5rem,12vw,7rem)] leading-[0.9] tracking-[-0.04em] text-[#f4efe4]">
              {BRAND.shortName}
            </p>
            <p className="font-display text-2xl md:text-3xl tracking-tight text-[#d9ebe4]">
              {BRAND.tagline}
            </p>
          </header>

          <div className="mt-8 max-w-xl animate-rise-delay space-y-4 text-[#e8f2ef]">
            <h1 className="font-display text-xl md:text-2xl leading-snug text-[#f7f3ea]">
              Practice that mirrors the real CLEP exams.
            </h1>
            <p className="text-base md:text-lg text-[#d5e4df]">
              Timed American Government and U.S. History II drills with outline-weighted
              questions and topic feedback.
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

          <p className="mt-auto pt-16 text-xs text-[#b7c9c3] max-w-lg">
            {BRAND.name}: original practice items shaped to College Board CLEP outlines — not
            official retired exams. ACE typically recommends credit at a scaled score of 50;
            confirm with your school.
          </p>
        </div>
      </section>
    </main>
  );
}
