"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function RegexTester() {
  const { language } = useLanguage();
  const t = translations[language].regexTester;

  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, "g");
      const matches = text.match(regex) || [];
      setResult(matches);
    } catch {
      setResult([t.invalidRegex || "Invalid regex pattern"]);
    }
  };

  const reset = () => {
    setPattern("");
    setText("");
    setResult([]);
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <input
        type="text"
        className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
        placeholder={t.patternPlaceholder}
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />

      <textarea
        rows={4}
        className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
        placeholder={t.textPlaceholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={testRegex}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.testButton}
      </button>

      <div className="flex items-center justify-between mb-2">
        <strong>{t.resultLabel || "Result"}:</strong>
        {result.length > 0 && <CopyButton text={result.join(", ")} />}
      </div>
      <div className="border border-gray-200 dark:border-zinc-700 rounded p-2 bg-gray-50 dark:bg-zinc-800 min-h-[40px] break-all">
        {result.length === 0 ? t.noMatch || "No matches" : result.join(", ")}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
