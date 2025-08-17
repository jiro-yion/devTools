"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function UrlQueryParser() {
  const { language } = useLanguage();
  const t = translations[language].urlQueryParser;

  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<Record<string, string>>({});
  const [built, setBuilt] = useState("");

  const parseQuery = () => {
    try {
      const url = new URL(input, "https://dummy.com"); // 상대 경로도 처리 가능하게
      const params = new URLSearchParams(url.search);
      const obj: Record<string, string> = {};
      for (const [key, value] of params) {
        obj[key] = value;
      }
      setParsed(obj);
      setBuilt(""); // 초기화
    } catch {
      setParsed({});
      setBuilt(t.parseError);
    }
  };

  const buildQuery = () => {
    const params = new URLSearchParams(parsed).toString();
    setBuilt(params);
  };

  const handleParamChange = (key: string, value: string) => {
    setParsed((prev) => ({ ...prev, [key]: value }));
    setBuilt("");
  };

  const reset = () => {
    setInput("");
    setParsed({});
    setBuilt("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <input
        type="text"
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-full mb-3"
      />

      <button
        onClick={parseQuery}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4 w-full"
      >
        {t.parseButton}
      </button>

      {Object.keys(parsed).length > 0 && (
        <div className="mb-4">
          <strong>{t.editParamsLabel}:</strong>
          {Object.entries(parsed).map(([key, value]) => (
            <div key={key} className="flex gap-2 mb-2">
              <input
                value={key}
                readOnly
                className="flex-1 border border-gray-300 dark:border-zinc-700 rounded p-1 bg-gray-100 dark:bg-zinc-800"
              />
              <input
                value={value}
                onChange={(e) => handleParamChange(key, e.target.value)}
                className="flex-1 border border-gray-300 dark:border-zinc-700 rounded p-1"
              />
            </div>
          ))}
          <button
            onClick={buildQuery}
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
          >
            {t.buildButton}
          </button>
        </div>
      )}

      {built && (
        <div className="mb-4">
          <strong>{t.buildResultLabel}:</strong>
          <div className="flex items-center justify-between border border-gray-200 dark:border-zinc-700 rounded p-2 bg-gray-50 dark:bg-zinc-800 break-all">
            <span className="flex-1">{built}</span>
            <CopyButton text={built} />
          </div>
        </div>
      )}

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
