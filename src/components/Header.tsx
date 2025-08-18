"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [showFAQ, setShowFAQ] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const t = translations[language];

  return (
    <>
      <header className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50 flex items-center justify-between px-4 py-3">
        <Link href="/">
          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 cursor-pointer select-none">
            🛠 DevTools Hub
          </div>
        </Link>
        <div className="flex space-x-2 items-center">
          <button
            onClick={() => setShowFAQ(true)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 hover:bg-blue-500 hover:text-white transition"
          >
            FAQ
          </button>

          {/* 언어 선택 드롭다운 */}
          <button
            onClick={() => setOpenLang(!openLang)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 hover:bg-blue-500 hover:text-white transition flex items-center"
          >
            🌐{" "}
            {language === "ko"
              ? "한국어"
              : language === "en"
                ? "English"
                : "日本語"}
          </button>

          {/* 드롭다운 메뉴 */}
          {openLang && (
            <div className="absolute right-0 top-12 bg-white dark:bg-zinc-800 shadow-lg rounded-lg border border-gray-200 dark:border-zinc-700 w-32">
              <button
                onClick={() => {
                  setLanguage("ko");
                  setOpenLang(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white ${
                  language === "ko" ? "bg-blue-500 text-white" : ""
                }`}
              >
                한국어
              </button>
              <button
                onClick={() => {
                  setLanguage("en");
                  setOpenLang(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white ${
                  language === "en" ? "bg-blue-500 text-white" : ""
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage("ja");
                  setOpenLang(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white ${
                  language === "ja" ? "bg-blue-500 text-white" : ""
                }`}
              >
                日本語
              </button>
            </div>
          )}
        </div>
      </header>

      {/* FAQ 모달 */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t.faqTitle}</h2>
              <div className="space-y-4">
                {t.faq.map((item: { q: string; a: string }, i: number) => (
                  <div key={i} className="border-b pb-2 last:border-none">
                    <p className="font-semibold">Q. {item.q}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      A. {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowFAQ(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
