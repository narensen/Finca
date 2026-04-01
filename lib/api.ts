import { configState } from "@/lib/env";
import type {
  ApiMutationResponse,
  Block,
  CreateBatchPayload,
  CreateBlockPayload,
  ValidatePayload,
  ValidationResponse
} from "@/lib/types";

const appApiBase = "/api/v1";

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function postJson<T>(path: string, payload: unknown): Promise<T> {
  if (!configState.hasApi) {
    throw new ApiError("NEXT_PUBLIC_API_URL is missing. Point it to your FastAPI service before using blockchain actions.");
  }

  const response = await fetch(`${appApiBase}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json().catch(() => null)) as T | null;

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new ApiError(message);
  }

  if (!data) {
    throw new ApiError("The API returned an empty response.");
  }

  return data;
}

export async function createBatch(payload: CreateBatchPayload) {
  return postJson<ApiMutationResponse>("/batches", payload);
}

export async function createBlock(payload: CreateBlockPayload) {
  return postJson<ApiMutationResponse>("/blocks", payload);
}

export async function validateChain(payload: ValidatePayload): Promise<ValidationResponse> {
  const normalizedBlocks = payload.blocks.map((block) => ({
    ...block,
    timestamp: normalizeTimestampForValidation(block.timestamp)
  }));

  const response = await postJson<
    | ValidationResponse
    | {
        result?: ValidationResponse;
        valid?: boolean;
        is_valid?: boolean;
        message?: string;
        invalid_index?: number | null;
        broken_index?: number | null;
      }
  >(
    "/validate",
    { blocks: normalizedBlocks }
  );

  if ("result" in response && response.result) {
    return response.result;
  }

  const invalidIndex =
    "invalid_index" in response
      ? response.invalid_index ?? null
      : "broken_index" in response
        ? response.broken_index ?? null
        : null;

  return {
    valid: response.valid ?? response.is_valid ?? false,
    message: response.message,
    invalid_index: invalidIndex
  };
}

export function extractReturnedBlock(response: ApiMutationResponse, fallbackBatchId: string) {
  const directBlock = response.block;

  if (directBlock) {
    return normalizeReturnedBlock(directBlock, fallbackBatchId);
  }

  const nestedData =
    typeof response.data === "object" && response.data !== null && "block" in response.data
      ? response.data.block
      : null;

  return normalizeReturnedBlock(nestedData, fallbackBatchId);
}

function normalizeReturnedBlock(candidate: unknown, fallbackBatchId: string): Block | null {
  if (!candidate || typeof candidate !== "object") {
    return null;
  }

  const block = candidate as Partial<Block> & {
    data?: Block["data"];
  };

  if (
    typeof block.index !== "number" ||
    typeof block.timestamp !== "string" ||
    typeof block.event_type !== "string" ||
    typeof block.previous_hash !== "string" ||
    typeof block.hash !== "string"
  ) {
    return null;
  }

  const batchIdFromData = block.data && typeof block.data.batch_id === "string" ? block.data.batch_id : null;

  return {
    batch_id: typeof block.batch_id === "string" ? block.batch_id : batchIdFromData ?? fallbackBatchId,
    index: block.index,
    timestamp: block.timestamp,
    event_type: block.event_type,
    data: block.data ?? {},
    previous_hash: block.previous_hash,
    hash: block.hash
  };
}

function normalizeTimestampForValidation(timestamp: string) {
  return timestamp.replace(/([+-]00(?::?00)?)$/, "Z");
}
