"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translation";
import ActionButtons from "@/components/ActionButton";
import CopyButton from "@/components/CopyButton";

// base64url 디코딩 함수
function base64UrlDecode(str: string) {
  // base64url to base64 변환
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  // padding
  while (str.length % 4) {
    str += "=";
  }
  try {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return null;
  }
}

// base64url 인코딩 함수
function base64UrlEncode(str: string) {
  try {
    const base64 = btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch {
    return null;
  }
}

export default function JwtEncoderDecoder() {
  const { language } = useLanguage();
  const t = translations[language].jwtEncoderDecoder;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  // JWT 디코더
  const decodeJwt = () => {
    setError(null);
    setOutput("");
    try {
      const parts = input.split(".");
      if (parts.length !== 3) {
        setError(t.invalidJwt);
        return;
      }
      const header = base64UrlDecode(parts[0]);
      const payload = base64UrlDecode(parts[1]);
      if (!header || !payload) {
        setError(t.invalidBase64);
        return;
      }
      const prettyHeader = JSON.stringify(JSON.parse(header), null, 2);
      const prettyPayload = JSON.stringify(JSON.parse(payload), null, 2);
      setOutput(`Header:\n${prettyHeader}\n\nPayload:\n${prettyPayload}`);
    } catch {
      setError(t.decodeError);
    }
  };

  // JWT 인코더 (간단히 header와 payload JSON 문자열을 받아 인코딩만, 서명 제외)
  const encodeJwt = () => {
    setError(null);
    setOutput("");
    try {
      const obj = JSON.parse(input);
      if (!obj.header || !obj.payload) {
        setError(t.encodeFormatError);
        return;
      }
      const headerEncoded = base64UrlEncode(JSON.stringify(obj.header));
      const payloadEncoded = base64UrlEncode(JSON.stringify(obj.payload));
      if (!headerEncoded || !payloadEncoded) {
        setError(t.encodeError);
        return;
      }
      const fakeSignature = "signature"; // 실제 서명은 없음
      setOutput(`${headerEncoded}.${payloadEncoded}.${fakeSignature}`);
    } catch {
      setError(t.encodeError);
    }
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <main className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">{t.title}</h1>

      <textarea
        className="border p-2 w-full mb-3 font-mono text-sm"
        rows={6}
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOutput("");
          setError(null);
        }}
      />

      <div className="flex gap-2 mb-4">
        <button
          onClick={decodeJwt}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {t.decodeButton}
        </button>
        <button
          onClick={encodeJwt}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {t.encodeButton}
        </button>
      </div>

      {error && (
        <div className="mb-2 text-red-600 dark:text-red-400 font-semibold">
          {error}
        </div>
      )}

      <div className="mb-2 flex items-center justify-between">
        <strong>{t.outputLabel}:</strong>
        {output && <CopyButton text={output} />}
      </div>

      <pre className="border border-gray-200 dark:border-zinc-700 rounded p-3 bg-gray-50 dark:bg-zinc-800 whitespace-pre-wrap break-words min-h-[100px]">
        {output || t.noOutput}
      </pre>

      <ActionButtons
        onReset={reset}
        language={language}
        translations={translations[language].actionButtons}
      />
    </main>
  );
}
