"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton"; // ← 추가

export default function TimestampConverter() {
  const { language } = useLanguage();
  const t = translations[language].timestampConverter;

  const [timestamp, setTimestamp] = useState("");
  const [date, setDate] = useState("");

  const toDate = () => {
    if (!timestamp) return;
    const d = new Date(Number(timestamp) * 1000);
    setDate(d.toISOString());
  };

  const toTimestamp = () => {
    if (!date) return;
    const ts = Math.floor(new Date(date).getTime() / 1000);
    setTimestamp(String(ts));
  };

  const reset = () => {
    setTimestamp("");
    setDate("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder={t.timestampPlaceholder}
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={toDate}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          {t.toDateButton}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder={t.datePlaceholder}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={toTimestamp}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          {t.toTimestampButton}
        </button>
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
