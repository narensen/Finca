export type JsonPrimitive = string | number | boolean | null;
export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | {
      [key: string]: JsonValue;
    };

export type BlockData = Record<string, JsonValue>;

export interface Batch {
  batch_id: string;
  crop_name: string;
  farmer_name: string;
  farm_location: string;
  created_at?: string | null;
}

export interface Block {
  batch_id: string;
  index: number;
  timestamp: string;
  event_type: string;
  data: BlockData;
  previous_hash: string;
  hash: string;
}

export interface BatchWithBlocks extends Batch {
  blocks: Block[];
}

export interface BatchSummary extends Batch {
  block_count: number;
  last_event_type: string | null;
  last_timestamp: string | null;
}

export interface ValidationResponse {
  valid: boolean;
  message?: string;
  invalid_index?: number | null;
  details?: string | null;
}

export interface CreateBatchPayload {
  batch_id: string;
  crop_name: string;
  farmer_name: string;
  farm_location: string;
}

export interface CreateBlockPayload {
  batch_id: string;
  event_type: string;
  data: BlockData;
  previous_hash: string;
  index: number;
}

export interface ValidatePayload {
  blocks: Block[];
}

export interface ApiMutationResponse {
  success?: boolean;
  message?: string;
  batch?: Batch;
  block?: Block;
  [key: string]: unknown;
}

export interface Database {
  public: {
    Tables: {
      batches: {
        Row: Batch;
        Insert: Batch;
        Update: Partial<Batch>;
        Relationships: [];
      };
      blocks: {
        Row: Block;
        Insert: Block;
        Update: Partial<Block>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
