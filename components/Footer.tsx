"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import PolicyModal from "./PolicyModal";

export default function Footer() {
    const [showPolicy, setShowPolicy] = useState(false);
    const [policyType, setPolicyType] = useState<'terms' | 'privacy'>('terms');

    const openPolicy = (type: 'terms' | 'privacy') => {
        setPolicyType(type);
        setShowPolicy(true);
    };

    return (
        <>
            <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t-2 border-blue-200 py-8 md:py-12 mt-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Logo & Description */}
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-3">
                            <Image
                                src="/urapro_logo.png"
                                alt="UraPro 裏プロ"
                                width={200}
                                height={67}
                                className="object-contain"
                            />
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                            URAPRO CERTIFICATION AUTHORITY (FICTIONAL)
                        </div>
                        <p className="text-sm text-gray-600 max-w-md mx-auto">
                            架空の行政機関による、エンターテインメント診断サービス
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 text-sm">
                        <button
                            onClick={() => openPolicy('terms')}
                            className="text-tech-blue hover:underline font-medium"
                        >
                            利用規約
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => openPolicy('privacy')}
                            className="text-tech-blue hover:underline font-medium"
                        >
                            プライバシーポリシー
                        </button>
                        <span className="text-gray-300">|</span>
                        <a
                            href="mailto:contact@urapro.example"
                            className="text-tech-blue hover:underline font-medium"
                        >
                            お問い合わせ
                        </a>
                    </div>

                    {/* Donate Buttons */}
                    <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
                        <a
                            href="#"
                            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all text-sm"
                        >
                            <Heart className="w-4 h-4" />
                            開発を支援
                        </a>

                        <div className="hidden md:block text-xs text-gray-400">
                            💡 継続的な開発・運営にご協力ください
                        </div>

                        <a
                            href="#"
                            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all text-sm"
                        >
                            <Heart className="w-4 h-4" />
                            Donate
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-xs text-gray-500 border-t border-gray-300 pt-4">
                        <p>© 2026 裏プロフィール発行局（架空）All Rights Reserved.</p>
                        <p className="mt-1 text-gray-400">
                            本サービスはジョークサイトです。診断結果は娯楽目的でご利用ください。
                        </p>
                    </div>
                </div>
            </footer>

            {/* Policy Modal */}
            {showPolicy && (
                <PolicyModal
                    type={policyType}
                    onClose={() => setShowPolicy(false)}
                />
            )}
        </>
    );
}
