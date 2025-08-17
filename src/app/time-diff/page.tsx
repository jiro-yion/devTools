"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import CopyButton from "@/components/CopyButton";
import ActionButtons from "@/components/ActionButton";

export default function TimeDiff() {
  const { language } = useLanguage();
  const t = translations[language].timeDiff;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [diffResult, setDiffResult] = useState("");

  const calculateDiff = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setDiffResult(t.invalidDate);
      return;
    }

    let diffMs = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    diffMs -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diffMs / (1000 * 60));
    diffMs -= minutes * (1000 * 60);
    const seconds = Math.floor(diffMs / 1000);

    setDiffResult(
      `${days}${t.day} ${hours}${t.hour} ${minutes}${t.minute} ${seconds}${t.second}`
    );
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setDiffResult("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
      />
      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
      />
      <button
        onClick={calculateDiff}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.calculateButton}
      </button>

      <div className="flex items-center justify-between mb-2">
        <strong>{t.resultLabel}:</strong>
        {diffResult && <CopyButton text={diffResult} />}
      </div>
      <div className="border border-gray-200 dark:border-zinc-700 rounded p-3 bg-gray-50 dark:bg-zinc-800 min-h-[50px] whitespace-pre-line break-words">
        {diffResult || t.noResult}
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
