"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";

export default function UuidValidator() {
  const { language } = useLanguage();
  const t = translations[language].uuidValidator;

  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [version, setVersion] = useState("");

  const validate = () => {
    const trimmed = input.trim().toLowerCase();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const valid = uuidRegex.test(trimmed);
    setIsValid(valid);
    if (valid) {
      const detectedVersion = trimmed.charAt(14); // UUID 버전 위치
      setVersion(detectedVersion);
    } else {
      setVersion("");
    }
  };

  const reset = () => {
    setInput("");
    setIsValid(null);
    setVersion("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <input
        type="text"
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setIsValid(null);
          setVersion("");
        }}
        className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-full mb-3 text-center"
      />

      <button
        onClick={validate}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-4"
      >
        {t.validateButton}
      </button>

      {isValid !== null && (
        <div
          className={`border rounded p-3 text-center ${
            isValid
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-red-500 bg-red-50 dark:bg-red-900/20"
          }`}
        >
          {isValid ? t.validResult : t.invalidResult}
          {isValid && version && (
            <div className="mt-1 text-sm text-gray-500">
              {t.versionLabel}: v{version}
            </div>
          )}
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
