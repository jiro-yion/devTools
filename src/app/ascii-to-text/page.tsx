"use client";
import { useState } from "react";
import { translations } from "@/data/translation";
import { useLanguage } from "@/context/LanguageContext";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton"; // ✅ 추가

export default function AsciiToText() {
  const { language } = useLanguage();
  const t = translations[language].asciiToText;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    // 쉼표, 세미콜론, 공백, 탭, 줄바꿈 등으로 구분
    const chars = input.trim().split(/[\s,;]+/);
    const text = chars
      .map((c) => {
        const code = Number(c);
        return isNaN(code) ? "" : String.fromCharCode(code);
      })
      .join("");
    setOutput(text);
  };

  const reset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <textarea
        className="border border-gray-300 dark:border-zinc-700 rounded p-3 w-full mb-3 bg-white dark:bg-zinc-900 text-sm"
        rows={3}
        placeholder={t.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={convert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4 w-full"
      >
        {t.button}
      </button>

      {/* 결과 + 복사 버튼 */}
      <div className="flex items-center justify-between border border-gray-200 dark:border-zinc-700 rounded p-3 min-h-[40px] bg-gray-50 dark:bg-zinc-800 whitespace-pre-wrap break-all mb-2">
        <span>{output}</span>
        <CopyButton text={output} />
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
