"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

function csvToJson(csv: string): string {
  try {
    const lines = csv.trim().split(/\r?\n/);
    const headers = lines[0].split(",");
    const result = lines.slice(1).map((line) => {
      const values = line.split(",");
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header.trim()] = values[i]?.trim() || "";
      });
      return obj;
    });
    return JSON.stringify(result, null, 2);
  } catch {
    throw new Error("CSV to JSON conversion error");
  }
}

function jsonToCsv(json: string): string {
  try {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) throw new Error("Input JSON is not an array");

    if (arr.length === 0) return "";

    const headers = Object.keys(arr[0]);
    const lines = arr.map((obj: Record<string, any>) =>
      headers
        .map((header) => `"${String(obj[header] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );
    return headers.join(",") + "\n" + lines.join("\n");
  } catch {
    throw new Error("JSON to CSV conversion error");
  }
}

export default function CsvJsonConverter() {
  const { language } = useLanguage();
  const t = translations[language].csvJson;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convertToJson = () => {
    setError("");
    try {
      const json = csvToJson(input);
      setOutput(json);
    } catch {
      setError(t.convertError);
      setOutput("");
    }
  };

  const convertToCsv = () => {
    setError("");
    try {
      const csv = jsonToCsv(input);
      setOutput(csv);
    } catch {
      setError(t.convertError);
      setOutput("");
    }
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <textarea
        className="border border-gray-300 dark:border-zinc-700 rounded p-3 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
        rows={8}
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOutput("");
          setError("");
        }}
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={convertToJson}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {t.convertToJsonButton}
        </button>
        <button
          onClick={convertToCsv}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {t.convertToCsvButton}
        </button>
      </div>

      {error && (
        <div className="mb-3 text-red-600 dark:text-red-400">{error}</div>
      )}

      <div className="flex items-center justify-between mb-2">
        <strong>{t.resultLabel}:</strong>
        {output && <CopyButton text={output} />}
      </div>
      <textarea
        readOnly
        className="border border-gray-200 dark:border-zinc-700 rounded p-3 w-full bg-gray-50 dark:bg-zinc-800 text-sm min-h-[120px] whitespace-pre-wrap"
        value={output || t.noResult}
      />

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
