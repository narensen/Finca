"use client";

import { motion } from "framer-motion";
import { Bot, User2, Workflow } from "lucide-react";

import { VoicePlayer } from "@/components/VoicePlayer";
import { cn } from "@/lib/utils";
import type { AIChatMessage } from "@/lib/types";

interface ChatMessageProps {
  message: AIChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const assistant = message.role === "assistant";
  const apiCalls = message.response?.api_calls_made ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex", assistant ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          "max-w-3xl space-y-3 rounded-[28px] border p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]",
          assistant ? "border-black/10 bg-white text-black" : "border-black bg-black text-white"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-2xl border",
              assistant ? "border-black/10 bg-black/[0.03] text-black" : "border-white/15 bg-white/10 text-white"
            )}
          >
            {assistant ? <Bot className="h-4 w-4" /> : <User2 className="h-4 w-4" />}
          </span>
          <div>
            <p className={cn("text-sm font-semibold", assistant ? "text-black" : "text-white")}>
              {assistant ? "Finca Assistant" : "You"}
            </p>
            {assistant && message.response?.intent ? (
              <p className="text-xs uppercase tracking-[0.22em] text-black/45">{message.response.intent}</p>
            ) : null}
          </div>
        </div>

        <p className={cn("text-sm leading-7", assistant ? "text-black/75" : "text-white/85")}>
          {message.content}
        </p>

        {assistant && message.response ? (
          <div className="flex flex-wrap gap-2">
            {message.response.ui_action ? (
              <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-black/55">
                {message.response.ui_action}
              </span>
            ) : null}
            {typeof message.response.confidence === "number" ? (
              <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-black/55">
                Confidence {Math.round(message.response.confidence * 100)}%
              </span>
            ) : null}
            {message.response.requires_user_action ? (
              <span className="rounded-full border border-finca-gold/20 bg-finca-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-black/65">
                User action needed
              </span>
            ) : null}
          </div>
        ) : null}

        {assistant && message.response?.follow_up_question ? (
          <div className="rounded-[22px] border border-finca-gold/20 bg-finca-gold/10 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-black/45">Follow-up needed</p>
            <p className="mt-2 text-sm leading-7 text-black/72">{message.response.follow_up_question}</p>
          </div>
        ) : null}

        {assistant && message.response?.warnings?.length ? (
          <div className="rounded-[22px] border border-finca-gold/20 bg-finca-gold/10 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-black/45">Warnings</p>
            <div className="mt-2 space-y-2">
              {message.response.warnings.map((warning, index) => (
                <p key={`${warning}-${index}`} className="text-sm leading-7 text-black/72">
                  {warning}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {assistant && apiCalls.length > 0 ? (
          <div className="rounded-[22px] border border-black/10 bg-black/[0.03] p-4">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-black/45">
              <Workflow className="h-3.5 w-3.5" />
              API calls made
            </div>
            <div className="space-y-2">
              {apiCalls.map((call, index) => (
                <p key={`${call.method}-${call.endpoint}-${index}`} className="text-sm text-black/70">
                  <span className="font-semibold text-black">{call.method}</span> {call.endpoint}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {assistant && message.audioUrl ? (
          <VoicePlayer src={message.audioUrl} autoplay={Boolean(message.autoplayAudio)} />
        ) : null}
      </div>
    </motion.div>
  );
}
