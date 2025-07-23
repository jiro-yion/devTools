// src/app/layout.tsx
import "./globals.css";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";

export const metadata = {
  title: "DevTools Hub",
  description: "빠르고 간단한 개발자용 변환 도구 모음",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100 flex flex-col min-h-screen">
        <LanguageProvider>
          <Header /> {/* 항상 상단에 표시 */}
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
