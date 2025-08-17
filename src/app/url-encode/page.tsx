"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton"; // ← 추가
import CopyButton from "@/components/CopyButton"; // ✅ 추가

export default function UrlEncoderDecoder() {
  const { language } = useLanguage();
  const t = translations[language].urlEncoderDecoder;

  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  const encode = () => {
    try {
      setEncoded(encodeURIComponent(input));
    } catch {
      setEncoded(t.encodeError);
    }
  };

  const decode = () => {
    try {
      setDecoded(decodeURIComponent(input));
    } catch {
      setDecoded(t.decodeError);
    }
  };

  const reset = () => {
    setInput("");
    setEncoded("");
    setDecoded("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <textarea
        className="border border-gray-300 dark:border-zinc-700 rounded p-3 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
        rows={3}
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={encode}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {t.encodeButton}
        </button>
        <button
          onClick={decode}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {t.decodeButton}
        </button>
      </div>

      {/* Encoded result */}
      <div className="flex items-center justify-between mb-2">
        <strong>{t.encodedLabel}:</strong>
        <CopyButton text={encoded} />
      </div>
      <div className="border border-gray-200 dark:border-zinc-700 rounded p-2 bg-gray-50 dark:bg-zinc-800 min-h-[40px] max-w-full overflow-auto break-all mb-4">
        {encoded}
      </div>

      {/* Decoded result */}
      <div className="flex items-center justify-between mb-2">
        <strong>{t.decodedLabel}:</strong>
        <CopyButton text={decoded} />
      </div>
      <div className="border border-gray-200 dark:border-zinc-700 rounded p-2 bg-gray-50 dark:bg-zinc-800 min-h-[40px] max-w-full overflow-auto break-all">
        {decoded}
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
