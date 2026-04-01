import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, CirclePlus, LayoutDashboard, Link2, ShieldCheck, Sparkles } from "lucide-react";

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
      <section className="section-shell pt-16 sm:pt-18 lg:pt-20">
        <div className="glass-stage relative overflow-hidden p-5 sm:p-8">
          <div className="absolute -right-20 top-6 h-44 w-44 rounded-full bg-white/70 blur-3xl" />
          <div className="absolute bottom-0 left-8 h-40 w-40 rounded-full bg-white/50 blur-3xl" />
          <div className="relative space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-xs uppercase tracking-[0.28em] text-black/70 shadow-[0_10px_30px_rgba(148,163,184,0.12)]">
                <Sparkles className="h-4 w-4" />
                Farmer mode
              </span>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-black sm:text-5xl">
                Simple daily workflow for trusted farm records.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-black/70 sm:text-lg">
                Everything stays on one page: view batches, create a new lot, record the next movement, verify the
                chain, and ask the assistant in your language.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="#create" className="button-primary gap-2">
                Start here
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/advanced" className="button-secondary">
                Advanced mode
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[24px] border border-black/10 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">Live batches</p>
                <p className="mt-2 text-3xl font-semibold text-black">{batches.length}</p>
              </div>
              <div className="rounded-[24px] border border-black/10 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">Recorded steps</p>
                <p className="mt-2 text-3xl font-semibold text-black">{totalBlocks}</p>
              </div>
              <div className="rounded-[24px] border border-black/10 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">Mic languages</p>
                <p className="mt-2 text-sm font-semibold text-black">EN, TA, HI, ES, FR, AR</p>
              </div>
              <div className="rounded-[24px] border border-black/10 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">Best for</p>
                <p className="mt-2 text-sm font-semibold text-black">Fast daily updates</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {workspaceAnchors.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/72 transition duration-300 hover:border-black/20 hover:text-black"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="batches" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage space-y-8 p-5 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="section-heading">
              <p className="section-heading-eyebrow">My batches</p>
              <h2 className="text-4xl font-semibold text-black">See every live chain at a glance.</h2>
              <p className="text-lg leading-8 text-black/70">Open a batch if you need the full explorer, or keep working below.</p>
            </div>

            <Link href="/dashboard" className="button-secondary">
              Full explorer
            </Link>
          </div>

          <BatchGrid batches={batches} emptyActionHref="#create" emptyActionLabel="Create first batch here" />
        </div>
      </section>

      <section id="create" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage space-y-5 p-3 sm:p-4 lg:p-5">
          <div className="px-2 pt-2 sm:px-3">
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">Create batch</p>
            <h2 className="mt-2 text-3xl font-semibold text-black">Start a new trusted batch.</h2>
          </div>
          <CreateBatchForm />
        </div>
      </section>

      <section id="events" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage space-y-5 p-3 sm:p-4 lg:p-5">
          <div className="px-2 pt-2 sm:px-3">
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">Add event</p>
            <h2 className="mt-2 text-3xl font-semibold text-black">Record the next handoff.</h2>
          </div>
          <AddEventForm batches={batchOptions} />
        </div>
      </section>

      <section id="verify" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage space-y-5 p-3 sm:p-4 lg:p-5">
          <div className="px-2 pt-2 sm:px-3">
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">Verify</p>
            <h2 className="mt-2 text-3xl font-semibold text-black">Check chain integrity.</h2>
          </div>
          <VerifyWorkspace batches={batchOptions} />
        </div>
      </section>

      <section id="assistant" className="section-shell mt-16 scroll-mt-28">
        <div className="glass-stage space-y-5 p-3 sm:p-4 lg:p-5">
          <div className="px-2 pt-2 sm:px-3">
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">Assistant</p>
            <h2 className="mt-2 text-3xl font-semibold text-black">Ask for help in plain language.</h2>
            <p className="mt-2 text-sm leading-7 text-black/68">
              Use the mic or type. Speech to text supports English, Tamil, Hindi, Spanish, French, and Arabic.
            </p>
          </div>
          <AIChat initialBatchId={batchOptions[0]?.batch_id ?? ""} mode="simple" />
        </div>
      </section>
    </div>
  );
}
