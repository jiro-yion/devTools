"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton"; // ← 추가

export default function Slugify() {
  const { language } = useLanguage();
  const t = translations[language].slugify;

  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");

  const convert = () => {
    const result = input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(result);
  };

  const reset = () => {
    setInput("");
    setSlug("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      <textarea
        className="border p-2 w-full mb-2"
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={convert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        {t.convertButton}
      </button>
      <div className="border p-2 break-all">
        <strong>{t.resultLabel}:</strong> {slug}
      </div>
      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
