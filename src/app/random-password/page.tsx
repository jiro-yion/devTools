"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton"; // ← 추가

export default function RandomPassword() {
  const { language } = useLanguage();
  const t = translations[language].randomPassword;

  const [length, setLength] = useState<number>(t.lengthMin);
  const [password, setPassword] = useState("");

  const generate = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
  };

  const reset = () => {
    setLength(t.lengthMin);
    setPassword("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm">{t.lengthLabel}</label>
        <input
          type="number"
          min={t.lengthMin}
          max={t.lengthMax}
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="border border-gray-300 dark:border-zinc-700 rounded p-2 w-20 bg-white dark:bg-zinc-900 text-sm"
        />
        <button
          onClick={generate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {t.generateButton}
        </button>
      </div>
      <div className="border border-gray-200 dark:border-zinc-700 rounded p-3 bg-gray-50 dark:bg-zinc-800 break-all">
        {password}
      </div>
      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
