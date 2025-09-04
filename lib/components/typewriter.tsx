"use client";
import { useEffect, useRef, useState } from "react";

type TypewriterProps = {
  text: string;
  speed?: number; // ms per char
  className?: string;
  onDone?: () => void;
};

export default function Typewriter({
  text,
  speed = 28,
  className = "",
  onDone,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset on new text
    setDisplayed("");

    // Split text into grapheme clusters to avoid breaking emoji/accents
    // Prefer Intl.Segmenter if available; fall back to Array.from (code points)
    let chars: string[];
    if (typeof Intl !== "undefined" && (Intl).Segmenter) {
      const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
      chars = Array.from(seg.segment(text), (s) => s.segment as string);
    } else {
      // Handles surrogate pairs
      chars = Array.from(text);
    }

    let i = 0;

    const tick = () => {
      // Guard against out-of-bounds
      if (i >= chars.length) {
        onDone?.();
        return;
      }

      setDisplayed((prev) => prev + chars[i]);
      i += 1;

      if (i < chars.length) {
        timerRef.current = window.setTimeout(tick, speed);
      } else {
        onDone?.();
      }
    };

    if (chars.length > 0) {
      // Wait 2 seconds before starting
      timerRef.current = window.setTimeout(tick, 2000);
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [text, speed, onDone]);

  return (
    <div className="relative">
      <p
        className={`min-h-[8rem] whitespace-pre-wrap text-balance text-base leading-7 text-zinc-800 md:text-lg dark:text-zinc-100 ${className}`}>
        {displayed}
        <span className="ml-0.5 inline-block w-[1px] animate-pulse bg-zinc-800 align-middle dark:bg-zinc-100">
          &nbsp;
        </span>
      </p>
    </div>
  );
}
