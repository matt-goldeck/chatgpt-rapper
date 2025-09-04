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
  speed = 60,
  className = "",
  onDone,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset state on new text
    setDisplayed("");

    // Split into grapheme clusters (handles emojis, accents, etc.)
    let chars: string[];
    if (typeof Intl !== "undefined" && (Intl).Segmenter) {
      const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
      chars = Array.from(seg.segment(text), (s) => s.segment as string);
    } else {
      chars = Array.from(text);
    }

    let i = 0;
    const tick = () => {
      setDisplayed((prev) => prev + chars[i]);
      i++;
      if (i < chars.length - 1) {
        timerRef.current = window.setTimeout(tick, speed);
      } else {
        onDone?.();
      }
    };

    // wait 2 seconds before starting
    if (chars.length > 0) {
      timerRef.current = window.setTimeout(tick, 2000);
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [text, speed, onDone]);


  return (
    <div className="relative">
      <p
        className={`min-h-[8rem] whitespace-pre-wrap text-balance text-base leading-7 text-zinc-800 md:text-lg dark:text-zinc-100 ${className}`}
      >
        {displayed}
        <span className="ml-0.5 inline-block w-[1px] animate-pulse bg-zinc-800 align-middle dark:bg-zinc-100">
          &nbsp;
        </span>
      </p>
    </div>
  );
}