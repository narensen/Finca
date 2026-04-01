"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, DatabaseZap, ShieldCheck } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { createBatch, extractReturnedBlock } from "@/lib/api";
import { configState } from "@/lib/env";
import { persistBatchAndGenesis } from "@/lib/persistence";

function generateBatchId() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const serial = Math.floor(100 + Math.random() * 900);
  return `FINCA-${stamp}-${serial}`;
}

interface CreateBatchFormProps {
  mode?: "full" | "simple";
}

export function CreateBatchForm({ mode = "full" }: CreateBatchFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ tone: "success" | "error"; message: string } | null>(null);
  const [form, setForm] = useState({
    batch_id: generateBatchId(),
    crop_name: "Arabica Coffee",
    farmer_name: "Lucia Reyes",
    farm_location: "Huehuetenango, Guatemala"
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };
  const isSimpleMode = mode === "simple";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    startTransition(async () => {
      try {
        const response = await createBatch(form);
        const batchId = form.batch_id;
        const block = extractReturnedBlock(response, batchId);

        if (!block) {
          throw new Error(t("createBatch.unusableGenesis"));
        }

        await persistBatchAndGenesis(
          {
            ...form,
            created_at: block.timestamp
          },
          block
        );

        setStatus({
          tone: "success",
          message: response.message ?? t("createBatch.successStored")
        });
        router.push(`/batches/${batchId}`);
        router.refresh();
      } catch (error) {
        setStatus({
          tone: "error",
          message: error instanceof Error ? error.message : t("createBatch.unable")
        });
      }
    });
  };

  return (
    <div className={isSimpleMode ? "" : "grid gap-6 xl:grid-cols-[0.98fr_1.02fr]"}>
      <form onSubmit={handleSubmit} className="glass-panel space-y-6 p-6 lg:p-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-finca-mint/70">{t("createBatch.eyebrow")}</p>
          <h2 className="text-3xl font-semibold text-black">
            {isSimpleMode ? t("createBatch.titleSimple") : t("createBatch.titleFull")}
          </h2>
          {!isSimpleMode ? (
            <p className="max-w-2xl text-sm leading-7 text-black/68">
              {t("createBatch.description")}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-black/80">{t("createBatch.batchId")}</span>
            <input
              required
              value={form.batch_id}
              onChange={(event) => updateField("batch_id", event.target.value)}
              className="input-shell"
              placeholder={t("createBatch.batchIdPlaceholder")}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-black/80">{t("createBatch.cropName")}</span>
            <input
              required
              value={form.crop_name}
              onChange={(event) => updateField("crop_name", event.target.value)}
              className="input-shell"
              placeholder={t("createBatch.cropNamePlaceholder")}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-black/80">{t("createBatch.farmerName")}</span>
            <input
              required
              value={form.farmer_name}
              onChange={(event) => updateField("farmer_name", event.target.value)}
              className="input-shell"
              placeholder={t("createBatch.farmerNamePlaceholder")}
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-black/80">{t("createBatch.farmLocation")}</span>
            <input
              required
              value={form.farm_location}
              onChange={(event) => updateField("farm_location", event.target.value)}
              className="input-shell"
              placeholder={t("createBatch.farmLocationPlaceholder")}
            />
          </label>
        </div>

        {status ? (
          <div
            className={`rounded-2xl border p-4 text-sm ${
              status.tone === "success"
                ? "border-finca-emerald/30 bg-finca-emerald/10 text-finca-mist"
                : "border-finca-ember/30 bg-finca-ember/10 text-finca-mist"
            }`}
          >
            {status.message}
          </div>
        ) : null}

        {!configState.hasApi ? (
          <div className="rounded-2xl border border-finca-gold/25 bg-finca-gold/10 p-4 text-sm text-finca-gold">
            {t("createBatch.warningApi")}
          </div>
        ) : null}

        {!configState.hasSupabase ? (
          <div className="rounded-2xl border border-finca-gold/25 bg-finca-gold/10 p-4 text-sm text-finca-gold">
            {t("createBatch.warningSupabase")}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isPending || !configState.hasApi || !configState.hasSupabase}
          className="button-primary gap-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? t("createBatch.submitting") : t("createBatch.submit")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {!isSimpleMode ? (
        <div className="glass-panel flex flex-col justify-between gap-6 p-6 lg:p-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-finca-mint/70">{t("createBatch.nextTitle")}</p>
            <div className="rounded-[26px] border border-black/10 bg-black/[0.03] p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-finca-mint">
                <DatabaseZap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-black">{t("createBatch.step1Title")}</h3>
              <p className="mt-3 text-sm leading-7 text-black/68">{t("createBatch.step1Desc")}</p>
            </div>

            <div className="rounded-[26px] border border-black/10 bg-black/[0.03] p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-finca-lime">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-black">{t("createBatch.step2Title")}</h3>
              <p className="mt-3 text-sm leading-7 text-black/68">{t("createBatch.step2Desc")}</p>
            </div>
          </div>

          <div className="rounded-[26px] border border-black/10 bg-[linear-gradient(135deg,rgba(140,245,211,0.1),rgba(255,255,255,0.02))] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-finca-mint/75">{t("createBatch.trustPrinciple")}</p>
            <p className="mt-3 text-sm leading-7 text-black/75">{t("createBatch.trustDesc")}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
