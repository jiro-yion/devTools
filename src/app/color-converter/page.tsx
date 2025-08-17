"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function ColorConverter() {
  const { language } = useLanguage();
  const t = translations[language].colorConverter;

  // 입력값 상태
  const [hexInput, setHexInput] = useState("");
  const [rgbInput, setRgbInput] = useState("");

  // 변환 결과 상태
  const [convertedHex, setConvertedHex] = useState("");
  const [convertedRgb, setConvertedRgb] = useState("");

  // HEX -> RGB
  const toRgb = () => {
    const cleanHex = hexInput.replace("#", "");
    if (cleanHex.length === 3) {
      const [r, g, b] = cleanHex.split("").map((c) => parseInt(c + c, 16));
      setConvertedRgb(`rgb(${r}, ${g}, ${b})`);
    } else if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.slice(0, 2), 16);
      const g = parseInt(cleanHex.slice(2, 4), 16);
      const b = parseInt(cleanHex.slice(4, 6), 16);
      setConvertedRgb(`rgb(${r}, ${g}, ${b})`);
    } else {
      setConvertedRgb(t.invalidHex);
    }
  };

  // RGB -> HEX (쉼표만 입력도 허용)
  const toHex = () => {
    const match =
      rgbInput.match(
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
      ) || rgbInput.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/);

    if (!match) {
      setConvertedHex(t.invalidRgb);
      return;
    }
    const [, r, g, b] = match;

    const toHexComponent = (numStr: string) => {
      const num = parseInt(numStr);
      if (num < 0 || num > 255 || isNaN(num)) return null;
      return num.toString(16).padStart(2, "0");
    };

    const rHex = toHexComponent(r);
    const gHex = toHexComponent(g);
    const bHex = toHexComponent(b);

    if (rHex === null || gHex === null || bHex === null) {
      setConvertedHex(t.invalidRgb);
      return;
    }

    setConvertedHex(`#${rHex}${gHex}${bHex}`.toUpperCase());
  };

  const reset = () => {
    setHexInput("");
    setRgbInput("");
    setConvertedHex("");
    setConvertedRgb("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      {/* HEX → RGB */}
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder={t.inputHexPlaceholder}
        value={hexInput}
        onChange={(e) => setHexInput(e.target.value)}
      />
      <button
        onClick={toRgb}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 w-full"
      >
        {t.convertHexToRgbButton}
      </button>
      <div className="flex items-center justify-between border p-2 mb-4 break-all">
        <span>
          <strong>{t.rgbLabel || "RGB"}:</strong> {convertedRgb}
        </span>
        <CopyButton text={convertedRgb} />
      </div>

      <h1 className="text-2xl font-bold mb-6">{t.title2}</h1>
      {/* RGB → HEX */}
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder={
          t.inputRgbPlaceholder || "rgb(255, 255, 255) 또는 255,255,255"
        }
        value={rgbInput}
        onChange={(e) => setRgbInput(e.target.value)}
      />
      <button
        onClick={toHex}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-2 w-full"
      >
        {t.convertRgbToHexButton}
      </button>
      <div className="flex items-center justify-between border p-2 mb-4 break-all">
        <span>
          <strong>{t.hexLabel || "HEX"}:</strong> {convertedHex}
        </span>
        <CopyButton text={convertedHex} />
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
