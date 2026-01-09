"use client";

import { BarChart3, ShieldCheck, Grid3x3 } from "lucide-react";

export default function TrustSection() {
    const features = [
        {
            icon: BarChart3,
            title: "行動心理分析",
            description: "36問の多角的質問で、表面的な回答では見抜けない深層心理を分析"
        },
        {
            icon: ShieldCheck,
            title: "矛盾回答の検知",
            description: "3層構造の検証システムで、意図的・無意識的な矛盾を自動検出"
        },
        {
            icon: Grid3x3,
            title: "10カテゴリ詳細診断",
            description: "誠実さ、コミュニケーション、恋愛スタイルなど、包括的に性格を評価"
        }
    ];

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-gray mb-4">
                        多角的クロスチェック・<br className="md:hidden" />アルゴリズム
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        単なるお遊び診断ではありません。心理学に基づいた<br />
                        信頼性の高い分析システムを採用しています。
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="bg-tech-blue text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-dark-gray mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
