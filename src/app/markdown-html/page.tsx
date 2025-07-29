"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function MarkdownToHtml() {
  const { language } = useLanguage();
  const t = translations[language].markdownToHtml;

  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const convert = () => {
    setHtml(markdown);
  };

  const reset = () => {
    setMarkdown("");
    setHtml("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <textarea
        className="border p-2 w-full mb-3"
        rows={6}
        placeholder={t.inputPlaceholder}
        value={markdown}
        onChange={(e) => {
          setMarkdown(e.target.value);
          setHtml(""); // 입력 바뀌면 결과 초기화
        }}
      />

      <button
        onClick={convert}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.convertButton}
      </button>

      <div className="mb-2 flex items-center justify-between">
        <strong>{t.resultLabel}:</strong>
        {html && <CopyButton text={html} />}
      </div>

      <div className="border border-gray-200 dark:border-zinc-700 rounded p-4 bg-gray-50 dark:bg-zinc-800 whitespace-pre-wrap break-words min-h-[100px]">
        {/* ReactMarkdown 컴포넌트로 실제 렌더링 */}
        {html ? <ReactMarkdown>{html}</ReactMarkdown> : t.noResult}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
