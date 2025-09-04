"use client";

import Image from "next/image";
import { useGenerateRap } from "@/hooks/use-generate-rap";
import Typewriter from "@/lib/components/typewriter";

export default function RapTypewriter() {
  const { rap } = useGenerateRap();

  if (!rap) {
    return (
      <div className="flex h-full min-h-[12rem] items-center justify-center rounded-lg bg-zinc-50 text-sm text-zinc-500 dark:bg-zinc-950/50">
        Your generated lyrics will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header with avatar + title */}
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12">
          <Image
            src="/odin.jpeg"
            alt="Grandmaster Ron"
            fill
            sizes="48px"
            className="rounded-full object-cover ring-2 ring-indigo-500/60 shadow-sm"
            priority
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold leading-tight text-zinc-800 dark:text-zinc-100">
            Grandmaster Ron
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Original bars, freshly generated
          </p>
        </div>
      </div>

      {/* Lyrics card */}
      <div className="rounded-xl border border-zinc-200/60 bg-white/70 p-4 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/60">
        <Typewriter text={rap} />
      </div>
    </div>
  );
}