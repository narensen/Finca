"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronDown, ChevronUp, Loader2, Mic, MicOff, SendHorizontal, Sparkles, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { ChatMessage } from "@/components/ChatMessage";
import { handleAssistantAction } from "@/lib/actionHandler";
import { sendAIQuery } from "@/lib/aiClient";
import { cn, toTitleCase } from "@/lib/utils";
import type { AIChatMessage, AIQueryRequest, AIResponse, AIResponseStyle } from "@/lib/types";

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getValidationFlag(data: Record<string, unknown> | null) {
  if (!data) {
    return null;
  }

  if (typeof data.valid === "boolean") {
    return data.valid;
  }

  if (typeof data.is_valid === "boolean") {
    return data.is_valid;
  }

  return null;
}

function renderValue(value: unknown) {
  if (value === null || value === undefined) {
    return "Not provided";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

function getBatchIdFromResponse(response: AIResponse | null) {
  if (!response) {
    return null;
  }

  if (typeof response.data?.batch_id === "string" && response.data.batch_id.trim()) {
    return response.data.batch_id;
  }

  const executionBatch = response.execution_results?.batch;

  if (
    executionBatch &&
    typeof executionBatch === "object" &&
    "batch_id" in executionBatch &&
    typeof executionBatch.batch_id === "string"
  ) {
    return executionBatch.batch_id;
  }

  const validationBatch = response.execution_results?.["/validate"];

  if (
    validationBatch &&
    typeof validationBatch === "object" &&
    "batch_id" in validationBatch &&
    typeof validationBatch.batch_id === "string"
  ) {
    return validationBatch.batch_id;
  }

  return null;
}

function getReadableActionLabel(value: string | null) {
  if (!value) {
    return "Waiting for assistant response";
  }

  return toTitleCase(value);
}

function getPromptBatchId(prompt: string) {
  const match = prompt.match(/\b[A-Z0-9]+(?:-[A-Z0-9]+)+\b/);
  return match?.[0] ?? null;
}

function getFollowUpPrompt(intent: string, activeBatchId: string | null) {
  const fallbackBatchId = activeBatchId ?? "RICE-001";

  switch (intent) {
    case "create_batch":
      return `Create a rice batch for Ravi in Tamil Nadu with batch ID ${fallbackBatchId}`;
    case "add_block":
      return `Add shipped event for batch ${fallbackBatchId}`;
    case "validate_chain":
    case "tamper_check":
      return `Validate batch ${fallbackBatchId}`;
    case "get_batch_details":
    case "explain_batch":
    case "translate_explain":
    case "voice_explain":
      return `Explain batch ${fallbackBatchId}`;
    default:
      return null;
  }
}

function buildSuggestedPrompts(response: AIResponse | null, activeBatchId: string | null) {
  const prompts: string[] = [];
  const followUpPrompt = getFollowUpPrompt(response?.intent ?? "unknown", activeBatchId);

  if (followUpPrompt) {
    prompts.push(followUpPrompt);
  }

  if (activeBatchId) {
    prompts.push(`Explain batch ${activeBatchId}`);
    prompts.push(`Validate batch ${activeBatchId}`);
    prompts.push(`Show batch ${activeBatchId} details`);
    prompts.push(`Add shipped event for batch ${activeBatchId}`);
  } else {
    prompts.push("Create a rice batch for Ravi in Tamil Nadu with batch ID RICE-001");
    prompts.push("Show my dashboard summary");
    prompts.push("How many batches are currently tracked?");
    prompts.push("Search history");
  }

  return Array.from(new Set(prompts)).slice(0, 4);
}

interface AIChatProps {
  initialBatchId?: string;
}

interface BrowserSpeechRecognitionAlternative {
  transcript: string;
}

interface BrowserSpeechRecognitionResult {
  length: number;
  isFinal: boolean;
  [index: number]: BrowserSpeechRecognitionAlternative;
}

interface BrowserSpeechRecognitionResultList {
  length: number;
  [index: number]: BrowserSpeechRecognitionResult;
}

interface BrowserSpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: BrowserSpeechRecognitionResultList;
}

interface BrowserSpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface BrowserSpeechRecognitionInstance {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null;
  onerror: ((event: BrowserSpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognitionInstance;

function getSpeechRecognitionConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  const speechWindow = window as typeof window & {
    SpeechRecognition?: BrowserSpeechRecognitionConstructor;
    webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
  };

  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null;
}

function getSpeechLanguage(language: string) {
  return assistantLanguageOptions.find((option) => option.value === language)?.speechLocale ?? "en-US";
}

const assistantLanguageOptions = [
  { value: "en", label: "English", speechLocale: "en-US" },
  { value: "ta", label: "Tamil", speechLocale: "ta-IN" },
  { value: "hi", label: "Hindi", speechLocale: "hi-IN" },
  { value: "es", label: "Spanish", speechLocale: "es-ES" },
  { value: "fr", label: "French", speechLocale: "fr-FR" },
  { value: "ar", label: "Arabic", speechLocale: "ar-SA" }
] as const;

export function AIChat({ initialBatchId = "" }: AIChatProps) {
  const router = useRouter();
  const reactId = useId();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const queryRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognitionInstance | null>(null);
  const speechCommittedQueryRef = useRef("");
  const speechShouldRestartRef = useRef(false);
  const sessionId = useMemo(() => `session-${reactId.replace(/:/g, "")}`, [reactId]);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [query, setQuery] = useState("");
  const [batchId, setBatchId] = useState(initialBatchId);
  const [language, setLanguage] = useState("en");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [responseStyle, setResponseStyle] = useState<AIResponseStyle>("brief");
  const [isLoading, setIsLoading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<Record<string, unknown> | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<AIResponse | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    setSpeechSupported(Boolean(getSpeechRecognitionConstructor()));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isLoading, messages, validationResult, actionError]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    const inferredBatchId = getBatchIdFromResponse(lastResponse);

    if (inferredBatchId) {
      setBatchId(inferredBatchId);
    }
  }, [lastResponse]);

  useEffect(() => {
    if (lastResponse?.requires_user_action && lastResponse.follow_up_question) {
      queryRef.current?.focus();
    }
  }, [lastResponse]);

  const validationFlag = useMemo(() => getValidationFlag(validationResult), [validationResult]);
  const validationEntries = useMemo(() => Object.entries(validationResult ?? {}), [validationResult]);
  const activeBatchId = useMemo(() => batchId.trim() || getBatchIdFromResponse(lastResponse) || null, [batchId, lastResponse]);
  const suggestedPrompts = useMemo(
    () => buildSuggestedPrompts(lastResponse, activeBatchId),
    [activeBatchId, lastResponse]
  );
  const activeFollowUpQuestion =
    lastResponse?.requires_user_action && lastResponse.follow_up_question ? lastResponse.follow_up_question : null;
  const queryPlaceholder = activeFollowUpQuestion
    ? activeFollowUpQuestion
    : activeBatchId
      ? `Ask about ${activeBatchId}, validate it, or add the next event.`
      : "Create a batch, ask where it came from, or validate a chain.";

  const applyPrompt = (prompt: string) => {
    const promptBatchId = getPromptBatchId(prompt);

    if (promptBatchId) {
      setBatchId(promptBatchId);
    }

    setQuery(prompt);
    setActionError(null);
    queryRef.current?.focus();
  };

  const stopListening = () => {
    speechShouldRestartRef.current = false;
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const startListening = () => {
    const SpeechRecognition = getSpeechRecognitionConstructor();

    if (!SpeechRecognition) {
      setSpeechError("Speech-to-text is not supported in this browser.");
      return;
    }

    recognitionRef.current?.abort();
    const recognition = new SpeechRecognition();
    recognition.lang = getSpeechLanguage(language);
    recognition.continuous = true;
    recognition.interimResults = true;

    speechCommittedQueryRef.current = query.trim();
    speechShouldRestartRef.current = true;
    setSpeechError(null);
    setIsListening(true);

    recognition.onresult = (event) => {
      let committedSegment = "";
      let interimSegment = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result?.[0]?.transcript?.trim() ?? "";

        if (!transcript) {
          continue;
        }

        if (result.isFinal) {
          committedSegment += `${transcript} `;
        } else {
          interimSegment += `${transcript} `;
        }
      }

      if (committedSegment.trim()) {
        speechCommittedQueryRef.current = [speechCommittedQueryRef.current, committedSegment.trim()]
          .filter(Boolean)
          .join(" ")
          .trim();
      }

      const nextQuery = [speechCommittedQueryRef.current, interimSegment.trim()].filter(Boolean).join(" ").trim();

      setQuery(nextQuery);
    };

    recognition.onerror = (event) => {
      if (event.error !== "no-speech" && event.error !== "aborted") {
        setSpeechError(`Speech input stopped: ${event.error}.`);
      }

      speechShouldRestartRef.current = false;
      setIsListening(false);
    };

    recognition.onend = () => {
      if (speechShouldRestartRef.current) {
        try {
          recognition.start();
          return;
        } catch {
          speechShouldRestartRef.current = false;
        }
      }

      setIsListening(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      setSpeechError("Speech input could not be started.");
      setIsListening(false);
    }
  };

  const submitQuery = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery || isLoading) {
      return;
    }

    if (isListening) {
      stopListening();
    }

    const userMessage: AIChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedQuery
    };

    setMessages((current) => [...current, userMessage]);
    setQuery("");
    setIsLoading(true);
    setActionError(null);

    const payload: AIQueryRequest = {
      query: trimmedQuery,
      session_id: sessionId,
      language,
      voice_mode: voiceEnabled,
      response_style: responseStyle,
      ...(batchId.trim()
        ? {
            batch_id: batchId.trim()
          }
        : {}),
      ...(batchId.trim()
        ? {
            context: {
              batch_id: batchId.trim()
            }
          }
        : {})
    };

    try {
      const response = await sendAIQuery(payload);
      setLastResponse(response);
      setLastAction(response.ui_action ?? response.intent ?? "NO_UI_ACTION_RETURNED");

      const playbackRequest = {
        url: response.audio_url ?? null,
        autoplay: Boolean(response.audio_url && voiceEnabled)
      };

      const assistantMessage: AIChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content: response.assistant_message,
        response,
        audioUrl: response.audio_url ?? null,
        autoplayAudio: playbackRequest.autoplay
      };

      handleAssistantAction({
        response,
        router,
        setValidationResult,
        setError: setActionError,
        playAudio: (audioUrl, autoplay = true) => {
          playbackRequest.url = audioUrl;
          playbackRequest.autoplay = autoplay;
        }
      });

      assistantMessage.audioUrl = playbackRequest.url;
      assistantMessage.autoplayAudio = Boolean(playbackRequest.url && playbackRequest.autoplay);

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "The assistant request could not be completed.";

      setActionError(message);
      setLastAction("SHOW_ERROR");
      setLastResponse(null);
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content: message
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="glass-panel flex min-h-[720px] flex-col p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/10 pb-5">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-finca-mint/70">Finca AI Assistant</p>
            <h1 className="text-3xl font-semibold text-black">Ask about provenance, trust, and verification.</h1>
            <p className="max-w-2xl text-sm leading-7 text-black/68">
              This module sends your question to <span className="font-semibold text-black">/api/ai</span>, reads the
              structured response, and updates the UI instantly.
            </p>
          </div>

          <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-black/45">Latest action</p>
            <p className="mt-2 text-sm font-semibold text-black">{lastAction ?? "Waiting for assistant response"}</p>
            <p className="mt-2 text-xs text-black/50">Session {sessionId}</p>
          </div>
        </div>

        <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-black/10 bg-black/[0.03] p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white text-black">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-black">Interpreter ready</p>
                  <p className="text-sm leading-7 text-black/65">
                    Ask where a batch came from, request verification, or ask the assistant to open a related view.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </AnimatePresence>

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-3 text-black/65">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-black">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Waiting for structured assistant response
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={submitQuery} className="mt-6 space-y-4 border-t border-black/10 pt-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_170px_150px_150px]">
            <label className="space-y-2">
              <span className="text-sm font-medium text-black/80">Batch context</span>
              <input
                value={batchId}
                onChange={(event) => setBatchId(event.target.value)}
                className="input-shell"
                placeholder="Optional batch ID"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-black/80">Language</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value)} className="input-shell">
                {assistantLanguageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-black/80">Style</span>
              <select
                value={responseStyle}
                onChange={(event) => setResponseStyle(event.target.value as AIResponseStyle)}
                className="input-shell"
              >
                <option value="brief">Brief</option>
                <option value="balanced">Balanced</option>
                <option value="detailed">Detailed</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-black/80">Voice</span>
              <button
                type="button"
                onClick={() => setVoiceEnabled((current) => !current)}
                className={cn(
                  "input-shell inline-flex items-center justify-between",
                  voiceEnabled && "border-black/20 bg-black/[0.05]"
                )}
              >
                <span>{voiceEnabled ? "Audio reply on" : "Audio reply off"}</span>
                <Volume2 className="h-4 w-4" />
              </button>
            </label>
          </div>

          <div className="flex gap-3">
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="input-shell min-h-[108px] flex-1 resize-y"
              placeholder="Where did this batch come from, and is the chain verified?"
            />
            <div className="flex min-w-[148px] flex-col gap-3">
              <button
                type="button"
                disabled={!speechSupported}
                onClick={() => {
                  if (isListening) {
                    stopListening();
                    return;
                  }

                  startListening();
                }}
                className={cn(
                  "button-secondary h-full min-h-[52px] gap-2 disabled:cursor-not-allowed disabled:opacity-50",
                  isListening && "border-finca-mint/35 bg-finca-mint/10 text-black"
                )}
              >
                {isListening ? "Stop mic" : "Speak"}
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>

              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="button-primary h-full min-h-[52px] gap-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Sending..." : "Send"}
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {speechError ? (
            <div className="rounded-2xl border border-finca-gold/20 bg-finca-gold/10 p-4 text-sm text-black/75">
              {speechError}
            </div>
          ) : null}
        </form>
      </div>

      <div className="space-y-6">
        <div className="glass-panel p-6 lg:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-finca-mint/70">Interpreter state</p>
          <div className="mt-5 grid gap-4">
            <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Message count</p>
              <p className="mt-2 text-3xl font-semibold text-black">{messages.length}</p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Audio reply</p>
              <p className="mt-2 text-lg font-semibold text-black">{voiceEnabled ? "Autoplay enabled" : "Manual playback"}</p>
              <p className="mt-2 text-sm leading-7 text-black/65">
                If the backend returns an audio file, the player will load automatically and play when voice is enabled.
              </p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Speech to text</p>
              <p className="mt-2 text-lg font-semibold text-black">
                {speechSupported ? (isListening ? "Listening now" : "Mic ready") : "Browser not supported"}
              </p>
              <p className="mt-2 text-sm leading-7 text-black/65">
                The mic button uses browser speech recognition to fill the query box before sending anything to `/api/ai`.
              </p>
            </div>
            <div className="rounded-[24px] border border-black/10 bg-black/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">Response mode</p>
              <p className="mt-2 text-lg font-semibold text-black">{responseStyle}</p>
              <p className="mt-2 text-sm leading-7 text-black/65">
                This is sent directly as <span className="font-semibold text-black">response_style</span> in the
                `/api/ai` request.
              </p>
            </div>
          </div>
        </div>

        {lastResponse?.router_plan ? (
          <div className="glass-panel p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-finca-mint/70">Router plan</p>
            <div className="mt-5 grid gap-3">
              {Object.entries(lastResponse.router_plan).map(([key, value]) => (
                <div key={key} className="rounded-[22px] border border-black/10 bg-black/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-black/45">{key.replace(/_/g, " ")}</p>
                  <p className="mt-2 break-words text-sm leading-7 text-black/75">{renderValue(value)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {validationResult ? (
          <div
            className={cn(
              "glass-panel p-6 lg:p-8",
              validationFlag === true && "border-finca-emerald/35 shadow-glow",
              validationFlag === false && "border-finca-ember/35 shadow-glow-red"
            )}
          >
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-finca-mint/70">Verification result</p>
              <h2 className="text-2xl font-semibold text-black">
                {validationFlag === true
                  ? "Chain verified"
                  : validationFlag === false
                    ? "Integrity compromised"
                    : "Validation response received"}
              </h2>
              <p className="text-sm leading-7 text-black/68">
                This panel is shown only because the backend returned the
                <span className="font-semibold text-black"> SHOW_VERIFICATION_RESULT </span>
                action.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {validationEntries.map(([key, value]) => (
                <div key={key} className="rounded-[22px] border border-black/10 bg-black/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-black/45">{key.replace(/_/g, " ")}</p>
                  <p className="mt-2 break-words text-sm leading-7 text-black/75">{renderValue(value)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {actionError ? (
          <div className="glass-panel border-finca-ember/30 p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-finca-ember">Interpreter error</p>
            <p className="mt-3 text-sm leading-7 text-black/72">{actionError}</p>
          </div>
        ) : null}

        {lastResponse?.warnings?.length ? (
          <div className="glass-panel p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-finca-gold">Backend warnings</p>
            <div className="mt-4 space-y-3">
              {lastResponse.warnings.map((warning, index) => (
                <div key={`${warning}-${index}`} className="rounded-[22px] border border-finca-gold/20 bg-finca-gold/10 p-4">
                  <p className="text-sm leading-7 text-black/72">{warning}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
