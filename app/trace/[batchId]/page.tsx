import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TraceValidationWorkspace } from "@/components/trace/trace-validation-workspace";
import { getBatchChain } from "@/lib/data";

export async function generateMetadata({
  params
}: {
  params: { batchId: string };
}): Promise<Metadata> {
  return {
    title: `Trace ${params.batchId}`
  };
}

export default async function TraceBatchPage({
  params
}: {
  params: { batchId: string };
}) {
  const chain = await getBatchChain(params.batchId);

  if (!chain) {
    notFound();
  }

  return <TraceValidationWorkspace chain={chain} />;
}
