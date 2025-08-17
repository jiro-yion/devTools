"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function TimestampConverter() {
  const { language } = useLanguage();
  const t = translations[language].timestampConverter;

  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [dateResult, setDateResult] = useState("");
  const [timestampResult, setTimestampResult] = useState("");

  const toDate = () => {
    if (!timestampInput) return;
    const d = new Date(Number(timestampInput) * 1000);
    if (isNaN(d.getTime())) {
      setDateResult(t.invalidTimestamp || "Invalid timestamp");
    } else {
      setDateResult(d.toISOString());
    }
  };

  const toTimestamp = () => {
    if (!dateInput) return;
    const ts = Math.floor(new Date(dateInput).getTime() / 1000);
    if (isNaN(ts)) {
      setTimestampResult(t.invalidDate || "Invalid date");
    } else {
      setTimestampResult(String(ts));
    }
  };

  const reset = () => {
    setTimestampInput("");
    setDateInput("");
    setDateResult("");
    setTimestampResult("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      {/* Timestamp → Date */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={t.timestampPlaceholder}
          value={timestampInput}
          onChange={(e) => setTimestampInput(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={toDate}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mb-2"
        >
          {t.toDateButton}
        </button>
        <div className="flex items-center justify-between border p-2 mt-2 break-all min-h-[40px]">
          <span>
            <strong>{t.dateLabel || "Date"}:</strong> {dateResult || ""}
          </span>
          {dateResult && <CopyButton text={dateResult} />}
        </div>
      </div>

      {/* Date → Timestamp */}
      <h1 className="text-2xl font-bold mb-6">{t.title2}</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder={t.datePlaceholder}
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={toTimestamp}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mb-2"
        >
          {t.toTimestampButton}
        </button>
        <div className="flex items-center justify-between border p-2 mt-2 break-all min-h-[40px]">
          <span>
            <strong>{t.timestampLabel || "Timestamp"}:</strong>{" "}
            {timestampResult || ""}
          </span>
          {timestampResult && <CopyButton text={timestampResult} />}
        </div>
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
