"use client";
import { useState } from "react";
import Link from "next/link";
import { translations } from "@/data/translation";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const [search, setSearch] = useState("");

  const filtered = t.tools.filter((tool) => {
    const searchLower = search.toLowerCase();
    return (
      tool.label.toLowerCase().includes(searchLower) ||
      tool.desc.toLowerCase().includes(searchLower) ||
      tool.keywords?.some((kw) => kw.toLowerCase().includes(searchLower))
    );
  });

  return (
    <main className="max-w-5xl mx-auto mt-12 px-4 space-y-16">
      {/* 소개 */}
      <section className="text-center">
        <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{t.description}</p>
      </section>

      {/* 검색 */}
      <section>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 dark:border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800"
        />
      </section>

      {/* 도구 목록 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">{t.allToolsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length > 0 ? (
            filtered.map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="block border border-gray-200 dark:border-zinc-700 rounded-xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur shadow hover:shadow-md transition p-4"
                aria-label={`${label} - ${desc}`}
              >
                <h3 className="text-lg font-semibold mb-1">{label}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {desc}
                </p>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
              {t.noResults}
            </div>
          )}
        </div>
      </section>

      {/* Tutorial + FAQ Box */}
      <section className="mt-12 border border-gray-200 dark:border-zinc-700 rounded-xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur shadow p-6 space-y-8">
        {/* Tutorial */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t.tutorialTitle}</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
            {t.tutorialSteps.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faq.map((item: { q: string; a: string }, i: number) => (
              <div key={i} className="border-b pb-2 last:border-none">
                <p className="font-semibold">Q. {item.q}</p>
                <p className="text-gray-600 dark:text-gray-300">A. {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
