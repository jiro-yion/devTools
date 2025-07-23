"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-50  flex items-center justify-between px-4 py-3">
      <Link href="/">
        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 cursor-pointer select-none">
          🛠 DevTools Hub
        </div>
      </Link>
      <div className="flex space-x-2">
        <button
          onClick={() => setLanguage("ko")}
          className={`px-2 py-1 rounded ${
            language === "ko"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-zinc-700"
          }`}
        >
          한국어
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-2 py-1 rounded ${
            language === "en"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-zinc-700"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("ja")}
          className={`px-2 py-1 rounded ${
            language === "ja"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-zinc-700"
          }`}
        >
          日本語
        </button>
      </div>
    </header>
  );
}
