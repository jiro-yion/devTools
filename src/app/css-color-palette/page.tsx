"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
//import CopyButton from "@/components/CopyButton";

// 색상 밝기 조절 함수 (간단한 밝기 조절)
function adjustBrightness(hex: string, percent: number) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.min(255, Math.max(0, r + (r * percent) / 100));
  g = Math.min(255, Math.max(0, g + (g * percent) / 100));
  b = Math.min(255, Math.max(0, b + (b * percent) / 100));

  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export default function CssColorPalette() {
  const { language } = useLanguage();
  const t = translations[language].cssColorPalette;

  const [baseColor, setBaseColor] = useState("#3490dc");
  const [palette, setPalette] = useState<string[]>([]);

  const generatePalette = () => {
    const newPalette = [];
    for (let i = -40; i <= 40; i += 20) {
      newPalette.push(adjustBrightness(baseColor, i));
    }
    setPalette(newPalette);
  };

  const reset = () => {
    setBaseColor("#3490dc");
    setPalette([]);
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <label className="block mb-2 font-semibold">{t.baseColorLabel}</label>
      <input
        type="color"
        value={baseColor}
        onChange={(e) => {
          setBaseColor(e.target.value);
          setPalette([]);
        }}
        className="w-20 h-10 rounded border border-gray-300 mb-4"
      />

      <button
        onClick={generatePalette}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition mb-6 font-semibold"
      >
        {t.generateButton}
      </button>

      {palette.length > 0 && (
        <div className="grid grid-cols-5 gap-4 mb-6">
          {palette.map((color, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigator.clipboard.writeText(color)}
              title={t.clickToCopy}
            >
              <div
                style={{ backgroundColor: color }}
                className="w-16 h-16 rounded border border-gray-300"
              />
              <span className="mt-2 text-sm font-mono select-text">
                {color}
              </span>
            </div>
          ))}
        </div>
      )}

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
