import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "裏プロ (UraPro) - 公的裏プロ証明書発行局",
  description: "120万通りのアルゴリズムが暴く、あなたの『裏』プロフィール。その性格、加工されていませんか？",
  metadataBase: new URL('https://urapro.pages.dev'),
  openGraph: {
    title: "裏プロ (UraPro) - 公的裏プロ証明書発行局",
    description: "120万通りのアルゴリズムが暴く、あなたの『裏』プロフィール。その性格、加工されていませんか？",
    url: 'https://urapro.pages.dev',
    siteName: '裏プロ (UraPro)',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '裏プロ - 公的裏プロ証明書発行局',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "裏プロ (UraPro) - 公的裏プロ証明書発行局",
    description: "120万通りのアルゴリズムが暴く、あなたの『裏』プロフィール。その性格、加工されていませんか？",
    images: ['/og-image.png'],
  },
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
