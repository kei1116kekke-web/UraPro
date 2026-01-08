"use client";

import { useFormContext } from "@/context/FormContext";
import { Heart, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
    const { setStep } = useFormContext();

    return (
        <div className="w-full max-w-2xl bg-gradient-to-br from-primary/5 via-white to-pink-50/30 p-8 md:p-12 rounded-2xl shadow-2xl border-2 border-primary/20">
            {/* Logo & Title */}
            <div className="text-center mb-8">
                <div className="mb-6 flex justify-center">
                    <div className="relative w-48 h-48">
                        <Image
                            src="/urapro_logo.png"
                            alt="UraPro Logo"
                            width={192}
                            height={192}
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-primary mb-2">
                    裏プロ
                </h1>
                <p className="text-xl text-gray-600 font-medium mb-1">UraPro</p>
                <p className="text-sm text-gray-500">
                    本音と建前を見抜く、総合恋愛診断
                </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                    <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <h3 className="font-bold text-sm text-gray-800 mb-1">10カテゴリ分析</h3>
                    <p className="text-xs text-gray-500">恋愛・生活・性格を多角的に診断</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                    <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <h3 className="font-bold text-sm text-gray-800 mb-1">矛盾検出</h3>
                    <p className="text-xs text-gray-500">建前と本音のズレを見抜く</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
                    <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h3 className="font-bold text-sm text-gray-800 mb-1">36問の精密診断</h3>
                    <p className="text-xs text-gray-500">信頼性の高い結果を提供</p>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white/80 p-6 rounded-xl border border-gray-200 mb-8">
                <h2 className="font-bold text-primary mb-3 text-lg">診断について</h2>
                <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">①</span>
                        <span>36問の質問に直感で回答（所要時間: 約6分）</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">②</span>
                        <span>10カテゴリで性格・恋愛観・生活力を分析</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">③</span>
                        <span>3層検証で建前と本音の矛盾を自動検出</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">④</span>
                        <span>詳細な診断書をダウンロード可能</span>
                    </li>
                </ul>
            </div>

            {/* Start Button */}
            <button
                onClick={() => setStep(1)}
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white font-bold py-5 px-8 rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] text-lg"
            >
                診断を開始する
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
                ※ 診断結果は保存されません。スクリーンショットでの保存を推奨します。
            </p>
        </div>
    );
}
