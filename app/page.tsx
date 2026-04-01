import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  CirclePlus,
  LayoutDashboard,
  Link2,
  ShieldCheck,
  Sparkles
} from "lucide-react";

import { AIChat } from "@/components/AIChat";
import { BatchGrid } from "@/components/dashboard/batch-grid";
import { AddEventForm } from "@/components/forms/add-event-form";
import { CreateBatchForm } from "@/components/forms/create-batch-form";
import { VerifyWorkspace } from "@/components/forms/verify-workspace";
import { getBatchOptions, getDashboardData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Farmer Mode"
};

const workspaceAnchors = [
  { href: "#batches", label: "My batches", icon: LayoutDashboard },
  { href: "#create", label: "Create batch", icon: CirclePlus },
  { href: "#events", label: "Add event", icon: Link2 },
  { href: "#verify", label: "Verify", icon: ShieldCheck },
  { href: "#assistant", label: "Assistant", icon: Bot }
];

export default async function HomePage() {
  const [batches, batchOptions] = await Promise.all([getDashboardData(), getBatchOptions()]);
  const totalBlocks = batches.reduce((total, batch) => total + batch.block_count, 0);

  return (
    <div className="pb-24">
      <section className="section-shell pt-16 sm:pt-20 lg:pt-24">
        <div className="glass-stage relative overflow-hidden p-5 sm:p-8 lg:p-10">
          <div className="absolute -right-20 top-8 h-56 w-56 rounded-full bg-white/75 blur-3xl" />
          <div className="absolute bottom-0 left-10 h-52 w-52 rounded-full bg-white/55 blur-3xl" />
          <div className="relative grid items-start gap-10 xl:grid-cols-[1fr_0.94fr]">
            <div className="space-y-8">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/72 px-4 py-2 text-xs uppercase tracking-[0.28em] text-black/70 shadow-[0_10px_30px_rgba(148,163,184,0.12)]">
                  <Sparkles className="h-4 w-4" />
                  Farmer mode
                </span>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-black sm:text-6xl xl:text-[4.5rem]">
                  One simple workspace for every trusted farm action.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-black/72">
                  Create a batch, add the next custody event, validate the journey, and ask for help without jumping
                  across pages. Advanced mode is still available when you need the deeper explorer.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="#create" className="button-primary gap-2">
                  Start in farmer mode
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/advanced" className="button-secondary">
                  Open advanced mode
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {workspaceAnchors.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="glass-panel group flex items-center justify-between gap-4 rounded-[24px] px-5 py-4 transition duration-300 hover:-translate-y-1 hover:shadow-glow"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-black">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-black/45">Jump to</p>
                          <p className="mt-1 text-sm font-semibold text-black">{item.label}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-black/45 transition duration-300 group-hover:translate-x-1 group-hover:text-black" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="glass-panel p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-black/45">Today&apos;s workspace</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-black/45">Batches</p>
                    <p className="mt-2 text-3xl font-semibold text-black">{batches.length}</p>
                  </div>
                  <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-black/45">Recorded steps</p>
                    <p className="mt-2 text-3xl font-semibold text-black">{totalBlocks}</p>
                  </div>
                  <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-black/45">Mode</p>
                    <p className="mt-2 text-lg font-semibold text-black">Easy, single-page</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-black/45">How farmer mode works</p>
                <div className="mt-5 space-y-4">
                  {[
                    "Create a batch and lock the origin into the first trusted record.",
                    "Add each real handoff or movement event as the produce travels.",
                    "Validate the chain any time you need to prove nothing was altered."
                  ].map((step, index) => (
                    <div key={step} className="flex items-start gap-4 rounded-[24px] border border-black/10 bg-black/[0.03] p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white text-sm font-semibold text-black">
                        0{index + 1}
                      </span>
                      <p className="text-sm leading-7 text-black/72">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[24px] border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.75),rgba(255,255,255,0.35))] p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-black" />
                    <p className="text-sm font-semibold text-black">Need deeper explorer tools later?</p>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-black/68">
                    Advanced mode keeps the richer storytelling, explorer views, and separate route-by-route workflow
                    intact for demos and detailed walkthroughs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="batches" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage space-y-8 p-5 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="section-heading">
              <p className="section-heading-eyebrow">My batches</p>
              <h2 className="text-4xl font-semibold text-black">See every live chain in one glance.</h2>
              <p className="text-lg leading-8 text-black/70">
                Open any batch to view the synchronized explorer, or keep working in the single-page flow below.
              </p>
            </div>

            <Link href="/dashboard" className="button-secondary">
              Open full explorer
            </Link>
          </div>

          <BatchGrid batches={batches} emptyActionHref="#create" emptyActionLabel="Create first batch here" />
        </div>
      </section>

      <section id="create" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage p-3 sm:p-4 lg:p-5">
          <CreateBatchForm />
        </div>
      </section>

      <section id="events" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage p-3 sm:p-4 lg:p-5">
          <AddEventForm batches={batchOptions} />
        </div>
      </section>

      <section id="verify" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage p-3 sm:p-4 lg:p-5">
          <VerifyWorkspace batches={batchOptions} />
        </div>
      </section>

      <section id="assistant" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage p-3 sm:p-4 lg:p-5">
          <AIChat initialBatchId={batchOptions[0]?.batch_id ?? ""} />
        </div>
      </section>
    </div>
  );
}
