"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function LoremIpsumGenerator() {
  const { language } = useLanguage();
  const t = translations[language].loremIpsum;

  const [paragraphs, setParagraphs] = useState(3);
  const [result, setResult] = useState("");

  const generate = () => {
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
    const generated = Array(paragraphs).fill(lorem).join("\n\n");
    setResult(generated);
  };

  const reset = () => {
    setParagraphs(3);
    setResult("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          min={1}
          max={20}
          value={paragraphs}
          onChange={(e) => setParagraphs(Number(e.target.value))}
          className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-20 bg-white dark:bg-zinc-900 text-sm"
        />
        <span>{t.paragraphsLabel}</span>
      </div>

      <button
        onClick={generate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.generateButton}
      </button>

      <div className="flex items-center justify-between mb-2">
        <strong>{t.resultLabel}:</strong>
        {result && <CopyButton text={result} />}
      </div>
      <div className="border border-gray-200 dark:border-zinc-700 rounded p-3 bg-gray-50 dark:bg-zinc-800 min-h-[80px] whitespace-pre-line break-words">
        {result || t.noResult}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
