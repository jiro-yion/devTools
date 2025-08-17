"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from "uuid";

export default function UuidGenerator() {
  const { language } = useLanguage();
  const t = translations[language].uuidGenerator;

  const [version, setVersion] = useState("v4");
  const [uuid, setUuid] = useState("");

  // v3과 v5는 네임스페이스와 이름이 필요하므로 샘플로 고정값 사용
  const NAMESPACE_DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

  const generate = () => {
    let newUuid = "";
    switch (version) {
      case "v1":
        newUuid = uuidv1();
        break;
      case "v3":
        newUuid = uuidv3("example.com", NAMESPACE_DNS);
        break;
      case "v4":
        newUuid = uuidv4();
        break;
      case "v5":
        newUuid = uuidv5("example.com", NAMESPACE_DNS);
        break;
      default:
        newUuid = uuidv4();
    }
    setUuid(newUuid);
  };

  const reset = () => {
    setUuid("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <div className="mb-4 flex space-x-2">
        {["v1", "v3", "v4", "v5"].map((v) => (
          <button
            key={v}
            onClick={() => setVersion(v)}
            className={`px-3 py-1 rounded ${
              version === v
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-zinc-700"
            }`}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>

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
