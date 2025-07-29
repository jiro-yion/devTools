"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function UuidValidator() {
  const { language } = useLanguage();
  const t = translations[language].uuidValidator;

  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validate = () => {
    const valid = uuidRegex.test(input.trim());
    setIsValid(valid);
  };

  const reset = () => {
    setInput("");
    setIsValid(null);
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <input
        type="text"
        className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-full mb-3"
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setIsValid(null);
        }}
      />

      <button
        onClick={validate}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-4"
      >
        {t.validateButton}
      </button>

      {isValid !== null && (
        <div
          className={`text-center font-semibold mb-4 ${
            isValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {isValid ? t.valid : t.invalid}
        </div>
      )}

      {input && <CopyButton text={input} />}

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
