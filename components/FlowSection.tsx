"use client";

import { ArrowRight, User, Users, FileCheck } from "lucide-react";

export default function FlowSection() {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-dark-gray mb-4">
                    診断の流れ
                </h2>
                <p className="text-center text-gray-600 mb-12">
                    自己診断と他己診断の二段階認証で、信頼性の高い証明書を発行します
                </p>

                <div className="grid md:grid-cols-3 gap-8 md:gap-4">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-blue-100 rounded-full p-6 mb-4">
                            <User className="w-12 h-12 text-tech-blue" />
                        </div>
                        <div className="bg-tech-blue text-white rounded-full px-4 py-1 text-sm font-bold mb-3">
                            STEP 1
                        </div>
                        <h3 className="text-xl font-bold text-dark-gray mb-2">
                            自己診断
                        </h3>
                        <p className="text-sm text-gray-600">
                            36問の質問に回答し、あなた自身の性格を分析します（7段階評価）
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="w-8 h-8 text-gray-300" />
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-orange-100 rounded-full p-6 mb-4">
                            <Users className="w-12 h-12 text-orange-600" />
                        </div>
                        <div className="bg-orange-600 text-white rounded-full px-4 py-1 text-sm font-bold mb-3">
                            STEP 2
                        </div>
                        <h3 className="text-xl font-bold text-dark-gray mb-2">
                            他己診断
                        </h3>
                        <p className="text-sm text-gray-600">
                            友人・パートナーがあなたを評価。客観的な視点を追加します
                        </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="w-8 h-8 text-gray-300" />
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-green-100 rounded-full p-6 mb-4">
                            <FileCheck className="w-12 h-12 text-green-700" />
                        </div>
                        <div className="bg-green-700 text-white rounded-full px-4 py-1 text-sm font-bold mb-3">
                            STEP 3
                        </div>
                        <h3 className="text-xl font-bold text-dark-gray mb-2">
                            証明書発行
                        </h3>
                        <p className="text-sm text-gray-600">
                            AIが総合分析し、信頼性の高い「裏プロ証明書」を発行します
                        </p>
                    </div>
                </div>

                {/* Trust Message */}
                <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-lg p-6 text-center">
                    <p className="text-blue-900 font-bold mb-2">
                        🔒 自己分析 + 他者評価 = 高信頼性
                    </p>
                    <p className="text-sm text-blue-700">
                        一方的な自己申告ではなく、第三者の視点を加えることで、より客観的で信頼できる証明書を発行します。
                    </p>
                </div>
            </div>
        </section>
    );
}
