"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function HtmlTableGenerator() {
  const { language } = useLanguage();
  const t = translations[language].htmlTableGenerator;

  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");

  const generateTable = () => {
    setError("");
    const r = Number(rows);
    const c = Number(cols);

    if (!r || r < 1 || !c || c < 1) {
      setError(t.errorInvalidNumber);
      setHtml("");
      return;
    }

    let table = '<table border="1" cellspacing="0" cellpadding="4">\n';

    for (let i = 0; i < r; i++) {
      table += "  <tr>\n";
      for (let j = 0; j < c; j++) {
        table += `    <td>Cell ${i + 1}-${j + 1}</td>\n`;
      }
      table += "  </tr>\n";
    }
    table += "</table>";

    setHtml(table);
  };

  const reset = () => {
    setRows("");
    setCols("");
    setHtml("");
    setError("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <div className="flex space-x-3 mb-3">
        <input
          type="number"
          min="1"
          placeholder={t.rowsPlaceholder}
          value={rows}
          onChange={(e) => {
            setRows(e.target.value);
            setHtml("");
            setError("");
          }}
          className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-1/2 bg-white dark:bg-zinc-900 text-sm"
        />
        <input
          type="number"
          min="1"
          placeholder={t.colsPlaceholder}
          value={cols}
          onChange={(e) => {
            setCols(e.target.value);
            setHtml("");
            setError("");
          }}
          className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-1/2 bg-white dark:bg-zinc-900 text-sm"
        />
      </div>

      <button
        onClick={generateTable}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.generateButton}
      </button>

      {error && (
        <div className="mb-3 text-red-600 dark:text-red-400">{error}</div>
      )}

      <div className="flex items-center justify-between mb-2">
        <strong>{t.resultLabel}:</strong>
        {html && <CopyButton text={html} />}
      </div>

      <textarea
        readOnly
        className="border border-gray-200 dark:border-zinc-700 rounded p-3 w-full bg-gray-50 dark:bg-zinc-800 text-sm min-h-[120px] whitespace-pre-wrap"
        value={html || t.noResult}
      />

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
