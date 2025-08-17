"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function EscapeConverter() {
  const { language } = useLanguage();
  const t = translations[language].escapeConverter;

  const [input, setInput] = useState("");
  const [escaped, setEscaped] = useState("");
  const [mode, setMode] = useState<"js" | "html" | "url">("js");

  const convert = () => {
    let result = "";
    switch (mode) {
      case "js":
        result = input
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\t/g, "\\t");
        break;
      case "html":
        result = input
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
        break;
      case "url":
        result = encodeURIComponent(input);
        break;
    }
    setEscaped(result);
  };

  const reset = () => {
    setInput("");
    setEscaped("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <textarea
        rows={4}
        className="border p-2 w-full mb-3"
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        {["js", "html", "url"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m as "js" | "html" | "url")}
            className={`px-3 py-1 rounded ${
              mode === m
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-zinc-700"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        onClick={convert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4 w-full"
      >
        {t.convertButton}
      </button>

      <div className="flex items-center justify-between border p-2 break-all mb-4">
        <span className="flex-1 mr-2">
          <strong>{t.resultLabel}:</strong> {escaped}
        </span>
        <div className="flex-shrink-0 text-right">
          <CopyButton text={escaped} />
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
