"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton"; // ✅ 추가
import CopyButton from "@/components/CopyButton"; // ✅ 추가

export default function HashGenerator() {
  const { language } = useLanguage();
  const t = translations[language].hashGenerator;

  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  const generate = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    const hex = Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setHash(hex);
  };

  const reset = () => {
    setInput("");
    setHash("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      <textarea
        className="border p-2 w-full mb-2"
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={generate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        {t.generateButton}
      </button>
      <div className="flex items-center justify-between border p-2 break-all">
        <span>{hash}</span>
        <CopyButton text={hash} />
      </div>
      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
      {/* ✅ 추가 */}
    </main>
  );
}
