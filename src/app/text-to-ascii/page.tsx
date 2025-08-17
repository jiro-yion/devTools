"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton"; // ← 추가
import CopyButton from "@/components/CopyButton"; // ✅ 추가

export default function TextToAscii() {
  const { language } = useLanguage();
  const t = translations[language].textToAscii;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    const codes = input
      .split("")
      .map((c) => c.charCodeAt(0))
      .join(" ");
    setOutput(codes);
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
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={convert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.convertButton}
      </button>
      <div className="flex items-center justify-between border border-gray-200 dark:border-zinc-700 rounded p-3 min-h-[40px] bg-gray-50 dark:bg-zinc-800 break-all mb-4">
        <span>
          <strong>{t.resultLabel}:</strong> {output}
        </span>
        <CopyButton text={output} />
      </div>
      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
      <section className="mt-8 p-4 border border-gray-200 dark:border-zinc-700 rounded bg-gray-50 dark:bg-zinc-800 text-sm leading-relaxed">
        <h2 className="font-semibold mb-2">{t.tutorial.title}</h2>
        <ol className="list-decimal list-inside space-y-1">
          {t.tutorial.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
