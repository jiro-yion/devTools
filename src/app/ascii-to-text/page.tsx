"use client";
import { useState } from "react";
import { translations } from "@/data/translation";
import { useLanguage } from "@/context/LanguageContext";
import ActionButtons from "@/components/ActionButton"; // 추가

export default function AsciiToText() {
  const { language } = useLanguage();
  const t = translations[language].asciiToText;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    const chars = input.trim().split(/\s+/);
    const text = chars.map((c) => String.fromCharCode(Number(c))).join("");
    setOutput(text);
  };

  const reset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      <textarea
        className="border border-gray-300 dark:border-zinc-700 rounded p-3 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
        rows={3}
        placeholder={t.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={convert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.button}
      </button>
      <div className="border border-gray-200 dark:border-zinc-700 rounded p-3 min-h-[40px] bg-gray-50 dark:bg-zinc-800 whitespace-pre-wrap">
        {output}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
