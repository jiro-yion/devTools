"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function DiffChecker() {
  const { language } = useLanguage();
  const t = translations[language].diffChecker;

  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diffResult, setDiffResult] = useState("");

  const compare = () => {
    if (textA === textB) {
      setDiffResult(t.noDifference);
    } else {
      // 간단 비교: 차이나는 부분 표시 (예시)
      setDiffResult(`- ${textA}\n+ ${textB}`);
    }
  };

  const reset = () => {
    setTextA("");
    setTextB("");
    setDiffResult("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <textarea
        className="border border-gray-300 dark:border-zinc-700 rounded p-3 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
        rows={4}
        placeholder={t.inputPlaceholderA}
        value={textA}
        onChange={(e) => setTextA(e.target.value)}
      />
      <textarea
        className="border border-gray-300 dark:border-zinc-700 rounded p-3 w-full mb-4 bg-white dark:bg-zinc-900 text-sm"
        rows={4}
        placeholder={t.inputPlaceholderB}
        value={textB}
        onChange={(e) => setTextB(e.target.value)}
      />

      <button
        onClick={compare}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.compareButton}
      </button>

      <div className="flex items-center justify-between mb-2">
        <strong>{t.resultLabel}:</strong>
        {diffResult && <CopyButton text={diffResult} />}
      </div>
      <div className="border border-gray-200 dark:border-zinc-700 rounded p-3 bg-gray-50 dark:bg-zinc-800 min-h-[80px] whitespace-pre-line break-words">
        {diffResult || "-"}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={t.actionButtons}
      />
    </main>
  );
}
