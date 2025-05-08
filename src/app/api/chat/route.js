// src/app/api/chat/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // <-- ændret model
        messages,
        temperature: 0.7,
      }),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      console.error("OpenAI API fejl:", aiRes.status, text);
      return NextResponse.json(
        { error: `OpenAI API fejl: ${aiRes.status}` },
        { status: aiRes.status }
      );
    }

    const data = await aiRes.json();
    const reply = data.choices?.[0]?.message;
    if (!reply) {
      console.error("Tomt svar fra OpenAI:", JSON.stringify(data));
      return NextResponse.json(
        { error: "OpenAI sendte tomt svar" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Server fejl i /api/chat:", err);
    return NextResponse.json(
      { error: "Server fejl, prøv igen senere" },
      { status: 500 }
    );
  }
}
