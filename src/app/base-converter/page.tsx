"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton"; // 추가

export default function BaseConverter() {
  const { language } = useLanguage();
  const t = translations[language].baseConverter;

  const [inputBase, setInputBase] = useState("10");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [binary, setBinary] = useState("");
  const [octal, setOctal] = useState("");
  const [decimal, setDecimal] = useState("");
  const [hex, setHex] = useState("");
  const [base32, setBase32] = useState("");

  const regexMap: { [key: string]: RegExp } = {
    "2": /^[0-1]*$/i,
    "8": /^[0-7]*$/i,
    "10": /^[0-9]*$/i,
    "16": /^[0-9a-f]*$/i,
    "32": /^[0-9a-v]*$/i,
  };

  useEffect(() => {
    if (!regexMap[inputBase].test(input)) {
      setError(t.errorInvalidInput);
    } else {
      setError("");
    }
  }, [input, inputBase, t.errorInvalidInput]);

  const convert = () => {
    if (error || input === "") {
      setBinary("");
      setOctal("");
      setDecimal("");
      setHex("");
      setBase32("");
      return;
    }
    const base = parseInt(inputBase);
    const num = parseInt(input, base);
    if (isNaN(num)) {
      setBinary(t.invalidValue);
      setOctal(t.invalidValue);
      setDecimal(t.invalidValue);
      setHex(t.invalidValue);
      setBase32(t.invalidValue);
      return;
    }
    setBinary(num.toString(2));
    setOctal(num.toString(8));
    setDecimal(num.toString(10));
    setHex(num.toString(16).toUpperCase());
    setBase32(num.toString(32).toUpperCase());
  };

  const reset = () => {
    setInputBase("10");
    setInput("");
    setError("");
    setBinary("");
    setOctal("");
    setDecimal("");
    setHex("");
    setBase32("");
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          {t.inputBaseLabel}
        </label>
        <select
          value={inputBase}
          onChange={(e) => setInputBase(e.target.value)}
          className="border rounded px-2 py-1 w-full dark:bg-zinc-800"
        >
          {Object.entries(t.options).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <input
          type="text"
          placeholder={t.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value.toLowerCase())}
          className="border p-2 w-full"
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      <button
        onClick={convert}
        disabled={!!error || input === ""}
        className={`px-4 py-2 rounded mb-4 text-white ${
          error || input === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {t.convertButton}
      </button>

      <div className="border p-2 mb-2">
        {t.resultLabels.binary}: {binary}
      </div>
      <div className="border p-2 mb-2">
        {t.resultLabels.octal}: {octal}
      </div>
      <div className="border p-2 mb-2">
        {t.resultLabels.decimal}: {decimal}
      </div>
      <div className="border p-2 mb-2">
        {t.resultLabels.hex}: {hex}
      </div>
      <div className="border p-2 mb-6">
        {t.resultLabels.base32}: {base32}
      </div>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
