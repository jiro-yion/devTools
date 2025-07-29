"use client";
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

export default function QrCodeGenerator() {
  const { language } = useLanguage();
  const t = translations[language].qrCodeGenerator;

  const [text, setText] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const qrRef = useRef<SVGSVGElement | null>(null);

  const handleGenerate = () => {
    if (text.trim()) {
      setGeneratedText(text.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setGeneratedText(""); // 입력 바뀌면 QR 사라짐
  };

  const reset = () => {
    setText("");
    setGeneratedText("");
  };

  // ✅ SVG 다운로드 함수
  const handleDownload = () => {
    if (qrRef.current) {
      const svgData = new XMLSerializer().serializeToString(qrRef.current);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.svg";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <textarea
        className="border p-2 w-full mb-3"
        rows={3}
        placeholder={t.inputPlaceholder}
        value={text}
        onChange={handleChange}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        {t.generateButton || "QR 코드 생성"}
      </button>

      {generatedText && (
        <div className="mb-4 flex flex-col items-center">
          <QRCodeSVG
            ref={qrRef}
            value={generatedText}
            size={180}
            includeMargin
          />

          <div className="flex gap-2 mt-2">
            <CopyButton text={generatedText} />
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-sm"
            >
              {t.downloadButton || "다운로드"}
            </button>
          </div>
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
