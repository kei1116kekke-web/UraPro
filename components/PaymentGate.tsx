"use client";

import { useFormContext } from "@/context/FormContext";
import { CATEGORIES } from "@/data/questions";
import { Lock, CheckCircle, Sparkles, CreditCard } from "lucide-react";
import { useState } from "react";

export default function PaymentGate() {
    const { state, setPaid, setStep } = useFormContext();
    const { profile } = state;
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setPaid(true);
            setStep(6); // Go to full Type-B report
        }, 2500);
    };

    return (
        <div className="w-full max-w-3xl bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 md:p-12 rounded-2xl shadow-2xl border-2 border-blue-300">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-block bg-blue-600 p-4 rounded-full mb-4">
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-blue-700 mb-2">
                    他者分析が完了しました！
                </h1>
                <p className="text-gray-600 text-lg">
                    {profile.name}さんの診断に、友人による評価が追加されました
                </p>
            </div>

            {/* Free Preview */}
            <div className="bg-white rounded-xl border-2 border-blue-200 p-6 mb-6 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h2 className="font-bold text-blue-700 text-lg">診断結果（概要）</h2>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">本人診断: 36問完了</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">他者評価: 10カテゴリ完了</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">他者認定バッジ: 付与済み</span>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <h3 className="font-bold text-blue-700 mb-3 text-sm">評価カテゴリスコア（概要）</h3>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                        {CATEGORIES.map((cat) => {
                            const selfScore = 3; // Placeholder - hide actual score
                            const peerScore = state.friendAnswers?.ratings[cat.id] || 3;
                            return (
                                <div key={cat.id} className="flex items-center justify-between py-2 border-b border-blue-100 last:border-0">
                                    <span className="text-gray-700 font-medium">{cat.name}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-gray-500">自己: ★×{Math.round(selfScore)}</span>
                                        <span className="text-xs text-gray-500">他者: ★×{Math.round(peerScore)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <p className="text-xs text-yellow-800 text-center">
                        ※ 概要のみ表示。詳細な分析と他者コメントは有料版で閲覧可能です。
                    </p>
                </div>
            </div>

            {/* Locked Content */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-orange-300 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-orange-600" />
                    <h2 className="font-bold text-orange-700 text-lg">詳細レポート（有料）</h2>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">🔒</span>
                        <span><strong>10カテゴリの詳細スコア</strong> - 自己評価と他者評価の詳細比較表</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">🔒</span>
                        <span><strong>他者からのコメント</strong> - 率直な評価と具体的フィードバック</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">🔒</span>
                        <span><strong>印刷・保存機能</strong> - PDF形式でダウンロード可能</span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                    <p className="text-center text-gray-600 text-sm mb-2">
                        詳細レポートを見るには支払いが必要です
                    </p>
                    <p className="text-center text-3xl font-black text-orange-600 mb-1">
                        ¥480
                    </p>
                    <p className="text-center text-xs text-gray-500">
                        ※ デモ版のため実際には課金されません
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            {!isProcessing ? (
                <button
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-5 px-8 rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] text-lg flex items-center justify-center gap-3"
                >
                    <CreditCard className="w-6 h-6" />
                    詳細レポートを購入する (¥480)
                </button>
            ) : (
                <div className="w-full bg-blue-600 text-white font-bold py-5 px-8 rounded-xl shadow-lg text-center">
                    <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>決済処理中...</span>
                    </div>
                </div>
            )}

            <p className="text-center text-xs text-gray-400 mt-4">
                ※ このデモでは実際の決済は行われません。ボタンをクリックすると詳細レポートが表示されます。
            </p>
        </div>
    );
}
