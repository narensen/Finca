import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Blocks, DatabaseZap, ShieldCheck, Sparkles, Sprout, Warehouse } from "lucide-react";

import { FlowVisualizer } from "@/components/sections/flow-visualizer";
import { getAdvancedCopy } from "@/lib/advanced-copy";
import { getRequestLanguage } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Advanced Mode"
};

export default function AdvancedModePage() {
  const language = getRequestLanguage();
  const copy = getAdvancedCopy(language);

  return (
    <div className="pb-24">
      <section className="section-shell pt-16 sm:pt-20 lg:pt-24">
        <div className="glass-stage relative overflow-hidden p-5 sm:p-8 lg:p-10">
          <div className="absolute -right-20 top-8 h-56 w-56 rounded-full bg-white/75 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-52 w-52 rounded-full bg-white/55 blur-3xl" />
          <div className="relative grid items-start gap-10 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-8">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/72 px-4 py-2 text-xs uppercase tracking-[0.28em] text-black/70 shadow-[0_10px_30px_rgba(148,163,184,0.12)]">
                  <Sparkles className="h-4 w-4" />
                  {copy.heroBadge}
                </span>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-black sm:text-6xl xl:text-7xl">
                  {copy.heroTitle}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-black/72">{copy.heroDescription}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/create-batch" className="button-primary gap-2">
                  {copy.createBatchCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/" className="button-secondary">
                  {copy.farmerModeCta}
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {copy.shortcuts.map((card) => (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="glass-panel group rounded-[24px] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-black/45">{copy.quickActionLabel}</p>
                    <h3 className="mt-3 text-xl font-semibold text-black">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-black/65">{card.description}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-black/50">
                      {copy.openLabel}
                      <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <FlowVisualizer copy={copy.flow} />
          </div>
        </div>
      </section>

      <section className="section-shell mt-24">
        <div className="glass-stage p-5 sm:p-8">
          <div className="section-heading">
            <p className="section-heading-eyebrow">{copy.problemEyebrow}</p>
            <h2 className="text-4xl font-semibold text-black">{copy.problemTitle}</h2>
            <p className="text-lg leading-8 text-black/70">{copy.problemDescription}</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {copy.problemCards.map((card) => (
              <div key={card.title} className="glass-panel p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-finca-gold/80">{copy.riskLabel}</p>
                <h3 className="mt-4 text-2xl font-semibold text-black">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/68">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell mt-24">
        <div className="glass-stage p-5 sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
            <div className="glass-panel p-6 lg:p-8">
              <p className="section-heading-eyebrow">{copy.solutionEyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold text-black">{copy.solutionTitle}</h2>
              <p className="mt-4 text-lg leading-8 text-black/70">{copy.solutionDescription}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {copy.solutionCards.map((card) => (
                <div key={card.title} className="glass-panel p-6">
                  <h3 className="text-2xl font-semibold text-black">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-black/68">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-24">
        <div className="glass-stage p-5 sm:p-8">
          <div className="grid gap-6 xl:grid-cols-3">
            <div className="glass-panel p-6 lg:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-finca-mint">
                <Sprout className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold text-black">{copy.journeyCards[0]?.title}</h3>
              <p className="mt-4 text-sm leading-7 text-black/68">{copy.journeyCards[0]?.description}</p>
            </div>
            <div className="glass-panel p-6 lg:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-finca-gold">
                <Warehouse className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold text-black">{copy.journeyCards[1]?.title}</h3>
              <p className="mt-4 text-sm leading-7 text-black/68">{copy.journeyCards[1]?.description}</p>
            </div>
            <div className="glass-panel p-6 lg:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-finca-emerald">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold text-black">{copy.journeyCards[2]?.title}</h3>
              <p className="mt-4 text-sm leading-7 text-black/68">{copy.journeyCards[2]?.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-24">
        <div className="glass-stage p-5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="glass-panel p-6 lg:p-8">
              <p className="section-heading-eyebrow">{copy.trustEyebrow}</p>
              <h2 className="mt-4 text-4xl font-semibold text-black">{copy.trustTitle}</h2>
              <p className="mt-4 text-lg leading-8 text-black/70">{copy.trustDescription}</p>
            </div>

            <div className="grid gap-4">
              <div className="glass-panel p-5">
                <div className="mb-3 flex items-center gap-2 text-black">
                  <Blocks className="h-5 w-5 text-finca-mint" />
                  {copy.trustCards[0]?.title}
                </div>
                <p className="text-sm leading-7 text-black/68">{copy.trustCards[0]?.description}</p>
              </div>
              <div className="glass-panel p-5">
                <div className="mb-3 flex items-center gap-2 text-black">
                  <DatabaseZap className="h-5 w-5 text-finca-gold" />
                  {copy.trustCards[1]?.title}
                </div>
                <p className="text-sm leading-7 text-black/68">{copy.trustCards[1]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
