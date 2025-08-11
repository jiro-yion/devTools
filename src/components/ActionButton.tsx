"use client";
import React from "react";

interface ActionButtonsProps {
  onReset: () => void;
  showBack?: boolean; // 뒤로가기 버튼 노출 여부 (기본 true)
  language: string;
  translations: {
    backButton: string;
    resetButton: string;
  };
}

export default function ActionButtons({
  onReset,
  showBack = true,
  language,
  translations,
}: ActionButtonsProps) {
  const goBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };
  console.debug("Current language:", language);

  return (
    <div className="flex gap-4 mt-4 mb-6 justify-center">
      {showBack && (
        <button
          onClick={goBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition w-32 text-center"
          type="button"
        >
          {translations.backButton}
        </button>
      )}
      <button
        onClick={onReset}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-32 text-center"
        type="button"
      >
        {translations.resetButton}
      </button>
    </div>
  );
}
