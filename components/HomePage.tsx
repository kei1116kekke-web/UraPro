"use client";

import { useFormContext } from "@/context/FormContext";
import Image from "next/image";
import VisionSection from "./VisionSection";
import TrustSection from "./TrustSection";
import Footer from "./Footer";

export default function HomePage() {
    const { setStep } = useFormContext();

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Catchphrase */}
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-dark-gray mb-6 leading-tight">
                        そのプロフィール、<br />
                        本物ですか？
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-12 font-medium">
                        AIが暴く、あなたの『裏』恋愛証明書。
                    </p>

                    {/* 3D Certificate Image */}
                    <div className="mb-12 flex justify-center">
                        <div className="relative w-full max-w-md h-64 md:h-80">
                            <Image
                                src="/hero-certificate-3d.png"
                                alt="恋愛適性診断書"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={() => setStep(1)}
                        className="inline-block bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-bold text-lg px-12 py-5 rounded-lg shadow-xl transition-all transform hover:scale-105 active:scale-95"
                    >
                        証明書を発行する（診断開始）
                    </button>

                    <p className="mt-6 text-sm text-gray-500">
                        ※ 所要時間: 約5分 | 完全無料
                    </p>
                </div>
            </section>

            {/* Vision Section */}
            <VisionSection />

            {/* Trust Section */}
            <TrustSection />

            {/* Footer CTA */}
            <section className="bg-tech-blue text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-bold mb-4">
                        あなたの『裏』を、今すぐ証明。
                    </h2>
                    <p className="mb-8 text-blue-100">
                        建前ではなく、本音で繋がる恋愛を。
                    </p>
                    <button
                        onClick={() => setStep(1)}
                        className="bg-white text-tech-blue font-bold text-lg px-12 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                    >
                        無料で診断を開始する
                    </button>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
