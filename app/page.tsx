import type { Metadata } from "next";

import { FarmerWorkspace } from "@/components/farmer/farmer-workspace";
import { getBatchOptions, getDashboardData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Farmer Mode"
};

export default async function HomePage() {
  const [batches, batchOptions] = await Promise.all([getDashboardData(), getBatchOptions()]);
  const totalBlocks = batches.reduce((total, batch) => total + batch.block_count, 0);

  return <FarmerWorkspace batches={batches} batchOptions={batchOptions} totalBlocks={totalBlocks} />;
}
