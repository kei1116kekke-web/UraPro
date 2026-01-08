import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UraPro - クロスチェック自己診断",
  description: "建前と本音のギャップを楽しむジョーク証明書発行アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className="font-sans antialiased bg-gray-100 text-gray-900"
      >
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
