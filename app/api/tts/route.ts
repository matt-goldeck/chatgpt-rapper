import { RapMood, RapStyle } from "@/lib/types/rap";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const {
      text,
      style,
      mood,
      voice = "verse",
    } = (await req.json()) as {
      text: string;
      style: RapStyle;
      mood: RapMood;
      voice?: string;
    };
    if (!text || !text.trim()) {
      return new Response("Missing `text`", { status: 400 });
    }
    if (!style || !style.trim()) {
      return new Response("Missing `style`", { status: 400 });
    }
    if (!mood || !mood.trim()) {
      return new Response("Missing `mood`", { status: 400 });
    }

    // Generate speech (MP3)
    const instructions = `
      You are a world-class rap artist. Perform the following rap with the style: ${style} and mood: ${mood}.
      Make it sound authentic and true to the style and mood requested. Use appropriate slang, tone, and cadence.
    `;
    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      input: text,
      instructions: instructions,
    });

    // Convert to a Node Buffer and return as audio
    const audioBuffer = Buffer.from(await speech.arrayBuffer());

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("TTS error", { status: 500 });
  }
}
