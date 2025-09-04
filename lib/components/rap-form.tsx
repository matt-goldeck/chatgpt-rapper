"use client";

import { useGenerateRap } from "@/hooks/use-generate-rap";
import { useState } from "react";
import { RapMood, RapStyle } from "@/lib/types/rap";

export default function RapForm() {
  const [style, setStyle] = useState<RapStyle | "">("");
  const [mood, setMood] = useState<RapMood | "">("");
  const [topic, setTopic] = useState("");

  const {
    isLoadingRap: loadingRap,
    isSpeakingRap: speakingRap,
    generateAndSpeakRap,
  } = useGenerateRap();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !style || !mood) return;
    generateAndSpeakRap(
      topic,
      style as RapStyle,
      mood as RapMood
    );
  };

  const disabled = loadingRap || speakingRap;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Rap Generator Form">
      <div className="space-y-1">
        <label
          htmlFor="style"
          className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
          Style
        </label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value as RapStyle)}
          required
          className="w-full rounded-lg border border-zinc-300/70 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-950">
          <option value="">Choose a style</option>
          {Object.values(RapStyle).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="text-xs text-zinc-500">What's the flavor?</p>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="mood"
          className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
          Mood
        </label>
        <select
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value as RapMood)}
          required
          className="w-full rounded-lg border border-zinc-300/70 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-950">
          <option value="">Choose a mood</option>
          {Object.values(RapMood).map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <p className="text-xs text-zinc-500">Dial in the mood</p>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
          Topic
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          required
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. peeling potatoes, your cat's allergies, etc"
          className="w-full rounded-lg border border-zinc-300/70 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-950"
        />
        <p className="text-xs text-zinc-500">What's the verse about?</p>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className={`group relative inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition
        ${
          disabled
            ? "bg-indigo-400/80"
            : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
        }
        focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}>
        {disabled ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"
              />
            </svg>
            {loadingRap ? "Generating rap..." : "Recording rap..."}
          </>
        ) : (
          <>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden>
              <path d="M4 12a8 8 0 1116 0A8 8 0 014 12zm8-5a1 1 0 00-1 1v5.382l-2.447 1.224a1 1 0 10.894 1.788l3.105-1.553A1 1 0 0013 14V8a1 1 0 00-1-1z" />
            </svg>
            Generate
          </>
        )}
      </button>

      <p className="text-xs text-zinc-500">
        Audio auto-plays when ready. Change style/mood to remaster the vibe.
      </p>
    </form>
  );
}
