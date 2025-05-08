// src/components/Chat.jsx
"use client";

import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Du er en hjælpsom assistent." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const scrollRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setErrorMsg("");
    setLoading(true);

    // Trim historik
    const MAX_HISTORY = 8;
    const systemMsg = updated[0];
    const recent = updated.slice(-MAX_HISTORY);
    const payload = [systemMsg, ...recent];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok) {
        const status = res.status;
        let err;
        try {
          err = (await res.json()).error;
        } catch {
          err = await res.text();
        }
        setErrorMsg(
          status === 429
            ? "AI er overbelastet. Prøv igen om lidt."
            : `Fejl ${status}: ${err}`
        );
        return;
      }

      const { reply, error } = await res.json();
      if (error) {
        setErrorMsg(error);
      } else {
        setMessages((m) => [...m, reply]);
      }
    } catch (err) {
      console.error("Fetch-fejl:", err);
      setErrorMsg("Kan ikke kontakte serveren");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filtrér system-beskeden fra visningen
  const visibleMessages = messages.filter((m) => m.role !== "system");

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex-1 p-2 overflow-auto space-y-2 bg-gray-50">
        {visibleMessages.map((m, i) => (
          <div
            key={i}
            className={`px-3 py-1 rounded-lg max-w-[80%] break-words ${
              m.role === "user"
                ? "bg-indigo-200 self-end text-gray-900 text-right"
                : "bg-white self-start text-gray-900 text-left"
            }`}
          >
            {m.content}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {errorMsg && (
        <div className="text-red-600 text-sm px-3 py-1">⚠️ {errorMsg}</div>
      )}

      <div className="flex border-t">
        <input
          type="text"
          className="flex-1 px-3 py-2 outline-none placeholder-gray-500 text-gray-900"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          placeholder={loading ? "⏳ Henter svar..." : "Skriv en besked…"}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "…⏳" : "Send"}
        </button>
      </div>
    </div>
  );
}
