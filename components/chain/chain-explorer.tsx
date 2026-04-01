"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Blocks, Clock3, Leaf, ScanSearch } from "lucide-react";

import { BlockCard } from "@/components/chain/block-card";
import { Timeline } from "@/components/chain/timeline";
import { ValidationBadge } from "@/components/chain/validation-badge";
import { useLanguage } from "@/components/providers/language-provider";
import { EmptyState } from "@/components/state/empty-state";
import { formatDateTime, getBlockHeadline, getBlockNarrative } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Batch, Block, ValidationResponse } from "@/lib/types";

interface ChainExplorerProps {
  batch: Batch;
  blocks: Block[];
  validation?: ValidationResponse | null;
}

export function ChainExplorer({ batch, blocks, validation = null }: ChainExplorerProps) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(Math.max(blocks.length - 1, 0));
  const [expandedIndex, setExpandedIndex] = useState<number | null>(blocks.length > 0 ? blocks.length - 1 : null);

  useEffect(() => {
    setActiveIndex(Math.max(blocks.length - 1, 0));
    setExpandedIndex(blocks.length > 0 ? blocks.length - 1 : null);
  }, [blocks.length]);

  if (blocks.length === 0) {
    return (
      <EmptyState
        title={t("chainExplorer.emptyTitle")}
        description={t("chainExplorer.emptyDescription")}
        actionHref={`/add-event?batchId=${batch.batch_id}`}
        actionLabel={t("chainExplorer.addSupplyEvent")}
      />
    );
  }

  const activeBlock = blocks[activeIndex] ?? blocks.at(-1) ?? blocks[0];
  const invalidIndex = validation?.valid === false ? validation.invalid_index ?? null : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 lg:p-7"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-finca-mint/70">{t("chainExplorer.synchronizedExplorer")}</p>
              <h2 className="text-3xl font-semibold text-black">{batch.crop_name} {t("chainExplorer.titleSuffix")}</h2>
              <p className="max-w-2xl text-sm leading-7 text-black/68">{t("chainExplorer.description")}</p>
            </div>
            <ValidationBadge validation={validation} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-black/45">
                <Leaf className="h-4 w-4" />
                {t("chainExplorer.selectedEvent")}
              </div>
              <p className="text-xl font-semibold text-black">{getBlockHeadline(activeBlock)}</p>
              <p className="mt-2 text-sm leading-7 text-black/65">{getBlockNarrative(activeBlock)}</p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-black/45">
                <Clock3 className="h-4 w-4" />
                {t("chainExplorer.timestamp")}
              </div>
              <p className="text-lg font-semibold text-black">{formatDateTime(activeBlock.timestamp)}</p>
              <p className="mt-2 text-sm text-black/65">{t("chainExplorer.blockActive", { index: activeBlock.index })}</p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-black/45">
                <ScanSearch className="h-4 w-4" />
                {t("chainExplorer.technicalSync")}
              </div>
              <p className="text-lg font-semibold text-black">{t("chainExplorer.connectedBlocks", { count: blocks.length })}</p>
              <p className="mt-2 text-sm text-black/65">{t("chainExplorer.clickToPivot")}</p>
            </div>
          </div>
        </motion.div>

        <div className="glass-panel flex flex-col justify-between p-6 lg:p-7">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-finca-mint/70">{t("chainExplorer.trustSignal")}</p>
            <h3 className="mt-3 text-2xl font-semibold text-black">{t("chainExplorer.trustTitle")}</h3>
            <p className="mt-3 text-sm leading-7 text-black/65">{t("chainExplorer.trustDesc")}</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] p-4">
              <Blocks className="h-5 w-5 text-finca-mint" />
              <p className="text-sm text-black/70">{t("chainExplorer.everyStepConnected")}</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] p-4">
              <ArrowRight className="h-5 w-5 text-finca-gold" />
              <p className="text-sm text-black/70">{t("chainExplorer.validationGlow")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Timeline
          batch={batch}
          blocks={blocks}
          activeIndex={activeIndex}
          invalidIndex={invalidIndex}
          onSelect={(index) => {
            setActiveIndex(index);
            setExpandedIndex(index);
          }}
        />

        <div className="glass-panel p-6 lg:p-7">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.28em] text-finca-mint/70">{t("chainExplorer.chainView")}</p>
            <h3 className="mt-3 text-2xl font-semibold text-black">{t("chainExplorer.chainViewTitle")}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-black/65">{t("chainExplorer.chainViewDesc")}</p>
          </div>

          <div className="space-y-4">
            {blocks.map((block, index) => {
              const compromised = invalidIndex !== null && index >= invalidIndex;
              const brokenAfter = invalidIndex !== null && index === invalidIndex - 1;

              return (
                <div key={`${block.batch_id}-${block.index}`}>
                  <BlockCard
                    block={block}
                    isActive={activeIndex === index}
                    isExpanded={expandedIndex === index}
                    compromised={compromised}
                    onSelect={() => {
                      setActiveIndex(index);
                      setExpandedIndex(index);
                    }}
                    onToggle={() => {
                      setExpandedIndex((current) => (current === index ? null : index));
                    }}
                  />

                  {index < blocks.length - 1 ? (
                    <div className="flex justify-center py-3">
                      <div
                        className={cn(
                          "relative h-10 w-px bg-gradient-to-b from-finca-mint/80 via-black/15 to-transparent",
                          brokenAfter && "bg-gradient-to-b from-finca-ember to-transparent"
                        )}
                      >
                        {brokenAfter ? (
                          <>
                            <span className="absolute left-1/2 top-3 h-3 w-px -translate-x-1/2 bg-white" />
                            <span className="absolute left-1/2 top-1 h-2 w-px -translate-x-1/2 bg-finca-ember shadow-[0_0_12px_rgba(255,123,112,0.8)]" />
                            <span className="absolute left-1/2 bottom-1 h-2 w-px -translate-x-1/2 bg-finca-ember shadow-[0_0_12px_rgba(255,123,112,0.8)]" />
                          </>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
