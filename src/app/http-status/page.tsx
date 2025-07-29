"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import { statusDescriptions } from "@/data/statusDescriptions";

export default function HttpStatus() {
  const { language } = useLanguage();
  const t = translations[language].httpStatus;

  const [code, setCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const checkStatus = () => {
    if (!code) {
      setDescription(t.noResult);
      return;
    }

    const langData =
      statusDescriptions[language as keyof typeof statusDescriptions];
    const desc = langData?.[code as keyof typeof langData];

    setDescription(desc || t.notFound);
  };

  const reset = () => {
    setCode("");
    setDescription("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <input
        type="text"
        placeholder={t.inputPlaceholder}
        value={code}
        onChange={(e) => {
          setCode(e.target.value.trim());
          setDescription("");
        }}
        className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-full mb-3 text-center"
      />

      <button
        onClick={checkStatus}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-4"
      >
        {t.checkButton}
      </button>

      <div className="border border-gray-200 dark:border-zinc-700 rounded p-3 bg-gray-50 dark:bg-zinc-800 min-h-[60px] text-center">
        {description || t.noResult}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
