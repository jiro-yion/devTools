"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton"; // ✅ 추가
import CopyButton from "@/components/CopyButton"; // ✅ 추가

export default function CaseConverter() {
  const { language } = useLanguage();
  const t = translations[language].caseConverter;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const toUpper = () => setOutput(input.toUpperCase());
  const toLower = () => setOutput(input.toLowerCase());
  const toSnake = () =>
    setOutput(input.trim().replace(/\s+/g, "_").toLowerCase());
  const toCamel = () => {
    const words = input.trim().split(/\s+/);
    const camel =
      words[0].toLowerCase() +
      words
        .slice(1)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
    setOutput(camel);
  };

  const reset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      <textarea
        className="border p-2 w-full mb-2"
        placeholder={t.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={toUpper}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          {t.buttons.upper}
        </button>
        <button
          onClick={toLower}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          {t.buttons.lower}
        </button>
        <button
          onClick={toSnake}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          {t.buttons.snake}
        </button>
        <button
          onClick={toCamel}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          {t.buttons.camel}
        </button>
      </div>
      <div className="flex items-center justify-between border p-2 break-all mb-4">
        <span>{output}</span>
        <CopyButton text={output} />
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
