"use client";
import { useState } from "react";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton"; // ✅ 추가
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";

export default function WordCounter() {
  const { language } = useLanguage();
  const t = translations[language].wordCounter;

  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const resetInput = () => setText("");

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      <textarea
        className="border p-2 w-full mb-2"
        rows={5}
        placeholder={t.placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-4 items-center">
        <span className="flex items-center gap-2">
          {t.wordLabel}: <strong>{wordCount}</strong>
          <CopyButton text={String(wordCount)} />
        </span>
      </div>
      <div>
        <span className="flex items-center gap-2 py-3">
          {t.charLabel}: <strong>{charCount}</strong>
          <CopyButton text={String(charCount)} />
        </span>
      </div>

      <ActionButtons
        onReset={resetInput}
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
