"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton"; // ✅ 추가

export default function UuidGenerator() {
  const { language } = useLanguage();
  const t = translations[language].uuidGenerator;

  const [uuid, setUuid] = useState("");

  const generate = () => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
  };

  const reset = () => {
    setUuid("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      <button
        onClick={generate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.generateButton}
      </button>
      <div className="flex items-center justify-between border border-gray-200 dark:border-zinc-700 rounded p-3 bg-gray-50 dark:bg-zinc-800 break-all min-h-[52px]">
        <span>{uuid}</span>
        {uuid && <CopyButton text={uuid} />}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
