"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function WikiSummary() {
  const { language } = useLanguage();
  const t = translations[language].wikiSummary;

  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");

  const fetchSummary = async () => {
    if (!query) return;

    // 언어에 따라 API 호출할 도메인 선택
    const apiLang = language === "ko" ? "ko" : language === "ja" ? "ja" : "en";

    try {
      const res = await fetch(
        `https://${apiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      if (data.extract) {
        setSummary(data.extract);
      } else {
        setSummary(t.notFound);
      }
    } catch {
      setSummary(t.error);
    }
  };

  const reset = () => {
    setQuery("");
    setSummary("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <input
        type="text"
        placeholder={t.inputPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
      />

      <button
        onClick={fetchSummary}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.searchButton}
      </button>

      <div className="flex items-center justify-between mb-2">
        <strong>{t.resultLabel}:</strong>
        {summary && <CopyButton text={summary} />}
      </div>

      <div className="border border-gray-200 dark:border-zinc-700 rounded p-3 bg-gray-50 dark:bg-zinc-800 min-h-[80px] whitespace-pre-line break-words">
        {summary || t.noResult}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
