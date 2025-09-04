import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { topic, style, mood } = (await req.json()) as {
    topic: string;
    style: string;
    mood: string;
  };
  if (!topic || !topic.trim()) {
    return new Response("Missing `topic`", { status: 400 });
  }
  if (!style || !style.trim()) {
    return new Response("Missing `style`", { status: 400 });
  }
  if (!mood || !mood.trim()) {
    return new Response("Missing `mood`", { status: 400 });
  }

  // Generate rap text
  const prompt = `
        Write a rap about "${topic}" in the style of "${style}"". 
        The tone should be "${mood}".
        Keep it concise, short, and rhythmic. Less than 50 words. 
        Return only the raw rap lyrics without any additional commentary or formatting.`;

  const rap = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a creative rap lyricist." },
      { role: "user", content: prompt },
    ],
    max_completion_tokens: 300,
    temperature: 0.8,
  });

  const rapText =
    rap.choices[0].message?.content?.trim() || "No rap generated.";

  return new Response(JSON.stringify({ rap: rapText }), {
    headers: { "Content-Type": "application/json" },
  });
}
