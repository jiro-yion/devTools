"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";

export default function ColorConverter() {
  const { language } = useLanguage();
  const t = translations[language].colorConverter;

  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");

  // HEX -> RGB 변환 함수
  const toRgb = () => {
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      const [r, g, b] = cleanHex.split("").map((c) => parseInt(c + c, 16));
      setRgb(`rgb(${r}, ${g}, ${b})`);
    } else if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.slice(0, 2), 16);
      const g = parseInt(cleanHex.slice(2, 4), 16);
      const b = parseInt(cleanHex.slice(4, 6), 16);
      setRgb(`rgb(${r}, ${g}, ${b})`);
    } else {
      setRgb(t.invalidHex);
    }
  };

  // RGB -> HEX 변환 함수 (rgb(...) 형식 또는 쉼표로 구분된 숫자 허용)
  const toHex = () => {
    const match =
      rgb.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i) ||
      rgb.match(/^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/);

    if (!match) {
      setHex(t.invalidRgb);
      return;
    }
    const [_, r, g, b] = match;

    const toHexComponent = (numStr: string) => {
      const num = parseInt(numStr);
      if (num < 0 || num > 255 || isNaN(num)) return null;
      return num.toString(16).padStart(2, "0");
    };

    const rHex = toHexComponent(r);
    const gHex = toHexComponent(g);
    const bHex = toHexComponent(b);

    if (rHex === null || gHex === null || bHex === null) {
      setHex(t.invalidRgb);
      return;
    }

    setHex(`#${rHex}${gHex}${bHex}`.toUpperCase());
  };

  const reset = () => {
    setHex("");
    setRgb("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      {/* HEX 입력 및 변환 버튼 */}
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder={t.inputHexPlaceholder}
        value={hex}
        onChange={(e) => setHex(e.target.value)}
      />
      <button
        onClick={toRgb}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4 w-full"
      >
        {t.convertHexToRgbButton}
      </button>

      {/* RGB 입력 및 변환 버튼 */}
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder={t.inputRgbPlaceholder || "rgb(255, 255, 255)"}
        value={rgb}
        onChange={(e) => setRgb(e.target.value)}
      />
      <button
        onClick={toHex}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 w-full"
      >
        {t.convertRgbToHexButton || "RGB → HEX 변환"}
      </button>

      {/* 결과 출력 */}
      <div className="border p-2 mb-2 break-all">
        <strong>{t.hexLabel || "HEX"}:</strong> {hex}
      </div>
      <div className="border p-2 break-all">
        <strong>{t.rgbLabel || "RGB"}:</strong> {rgb}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
