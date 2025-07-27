"use client";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";

export default function QrCodeGenerator() {
  const { language } = useLanguage();
  const t = translations[language].qrCodeGenerator;

  const [text, setText] = useState("");

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>
      <textarea
        className="border p-2 w-full mb-3"
        rows={3}
        placeholder={t.inputPlaceholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mb-4 flex justify-center">
        {text && <QRCodeSVG value={text} size={180} />}
      </div>
      <ActionButtons
        onReset={() => setText("")}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
