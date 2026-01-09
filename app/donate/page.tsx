"use client";

import { Heart, CreditCard, Gift, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="mb-4">
                        <Image
                            src="/urapro_logo.png"
                            alt="UraPro"
                            width={200}
                            height={67}
                            className="mx-auto"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-gray mb-4">
                        開発を支援する
                    </h1>
                    <p className="text-lg text-gray-600">
                        UraProの継続的な開発・運営にご協力ください
                    </p>
                </div>

                {/* Message */}
                <div className="bg-gradient-to-r from-pink-50 to-red-50 border-2 border-pink-300 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-pink-900 mb-4 flex items-center gap-2">
                        <Heart className="w-6 h-6" />
                        あなたの支援が必要です
                    </h2>
                    <p className="text-gray-700 mb-4">
                        UraProは完全無料で提供していますが、以下の運営コストが発生しています：
                    </p>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-1">•</span>
                            <span>データベース・サーバー費用</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-1">•</span>
                            <span>新機能の開発・メンテナンス</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-1">•</span>
                            <span>セキュリティ対策・安定運用</span>
                        </li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        少額でも構いません。皆様の温かいご支援が、UraProをより良いサービスにします。
                    </p>
                </div>

                {/* Donation Options (Mock) */}
                <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 p-8 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Gift className="w-5 h-5 text-pink-500" />
                        支援方法
                    </h3>

                    <div className="space-y-4">
                        {/* Option 1 */}
                        <div className="border-2 border-pink-300 rounded-lg p-6 hover:bg-pink-50 transition-colors cursor-not-allowed opacity-60">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-2xl font-bold text-pink-600">¥300</div>
                                <div className="text-sm text-gray-500">コーヒー1杯分</div>
                            </div>
                            <p className="text-sm text-gray-600">開発者にコーヒーを1杯おごる感覚で</p>
                        </div>

                        {/* Option 2 */}
                        <div className="border-2 border-pink-400 rounded-lg p-6 hover:bg-pink-50 transition-colors cursor-not-allowed opacity-60">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-2xl font-bold text-pink-600">¥1,000</div>
                                <div className="text-sm text-gray-500">ランチ1回分</div>
                            </div>
                            <p className="text-sm text-gray-600">機能改善のモチベーションになります</p>
                        </div>

                        {/* Option 3 */}
                        <div className="border-2 border-pink-500 rounded-lg p-6 hover:bg-pink-50 transition-colors cursor-not-allowed opacity-60">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-2xl font-bold text-pink-600">¥3,000</div>
                                <div className="text-sm text-gray-500">サポーター</div>
                            </div>
                            <p className="text-sm text-gray-600">新機能開発の大きな助けになります</p>
                        </div>

                        {/* Custom Amount */}
                        <div className="border-2 border-gray-300 rounded-lg p-6">
                            <div className="mb-3">
                                <div className="text-lg font-bold text-gray-700 mb-2">カスタム金額</div>
                                <input
                                    type="number"
                                    placeholder="金額を入力（円）"
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mock Payment Button */}
                    <button
                        disabled
                        className="w-full mt-6 bg-gray-400 text-white font-bold text-lg px-8 py-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <CreditCard className="w-5 h-5" />
                        決済機能は準備中です
                    </button>
                </div>

                {/* Benefits */}
                <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        ご支援いただいた方へ
                    </h3>
                    <ul className="space-y-2 text-blue-800">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">✓</span>
                            <span>開発ロードマップへの優先アクセス</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">✓</span>
                            <span>新機能のアーリーアクセス</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">✓</span>
                            <span>心からの感謝 🙏</span>
                        </li>
                    </ul>
                </div>

                {/* Note */}
                <div className="text-center text-sm text-gray-500 mb-8">
                    <p>※ 現在は寄付機能のデモページです。実際の決済は行われません。</p>
                    <p className="mt-2">将来的に Stripe / PayPal などの決済システムを導入予定です。</p>
                </div>

                {/* Back Button */}
                <div className="text-center">
                    <a
                        href="/"
                        className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold px-8 py-3 rounded-lg transition-colors"
                    >
                        トップページに戻る
                    </a>
                </div>
            </div>
        </div>
    );
}
