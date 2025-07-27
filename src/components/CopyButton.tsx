"use client";
import { useState } from "react";
import { Copy } from "lucide-react"; // 아이콘 사용 (npm install lucide-react 필요)

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`flex items-center gap-1 px-2 py-1 text-xs border rounded hover:bg-gray-100 dark:hover:bg-zinc-700 transition ${className}`}
    >
      <Copy size={14} />
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
