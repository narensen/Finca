import type { Metadata } from "next";

import { AIChat } from "@/components/AIChat";

export const metadata: Metadata = {
  title: "Assistant"
};

export default function AssistantPage({
  searchParams
}: {
  searchParams?: { batchId?: string; batch_id?: string };
}) {
  const initialBatchId = searchParams?.batchId ?? searchParams?.batch_id ?? "";

  return (
    <div className="section-shell py-14 sm:py-16">
      <div className="glass-stage p-3 sm:p-4 lg:p-5">
        <AIChat initialBatchId={initialBatchId} />
      </div>
    </div>
  );
}
