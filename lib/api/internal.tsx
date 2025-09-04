import { RapMood, RapStyle } from "../types/rap";

export const createRapTextFromCriteria = async (
  topic: string,
  style: string,
  mood: string
) => {
  const rapRes = await fetch("/api/rap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, style, mood }),
  });
  if (!rapRes.ok) {
    throw new Error("Rap generation failed");
  }
  const rapData = await rapRes.json();
  return (rapData.rap as string) || "";
};

export const generateRapAudioURLFromText = async (
  rap: string,
  style: RapStyle,
  mood: RapMood
) => {
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: rap,
      style: style,
      mood: mood,
      voice: "ash",
    }),
  });
  if (!res.ok) {
    throw new Error("TTS failed");
  }

  const blob = await res.blob(); // audio/mpeg
  const url = URL.createObjectURL(blob);

  return url;
};
