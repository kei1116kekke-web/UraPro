"use client";

import { useFormContext } from "@/context/FormContext";
import { Share2, ArrowRight, Shield, Eye, Sparkles } from "lucide-react";

export default function HandoffScreen() {
    const { setStep } = useFormContext();

    return (
        <div className="w-full max-w-2xl bg-gradient-to-br from-orange-50 via-yellow-50 to-white p-8 md:p-12 rounded-2xl shadow-2xl border-2 border-orange-300">
            {/* Icon */}
            <div className="flex justify-center mb-6">
                <div className="bg-orange-500 p-6 rounded-full">
                    <Share2 className="w-16 h-16 text-white" />
                </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-center text-orange-600 mb-4">
                友人にシェアしてください
            </h1>

            <p className="text-center text-gray-700 text-lg mb-8">
                あなたの建前診断が完了しました<br />
                次に、あなたをよく知る友人に<br />
                <span className="font-bold text-orange-600">「本音で評価」</span>してもらいましょう
            </p>

            {/* Info Cards */}
            <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-lg border-2 border-orange-200 flex items-start gap-3">
                    <Shield className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold text-gray-800 mb-1">友人はあなたの回答を見ません</h3>
                        <p className="text-sm text-gray-600">先入観なく、純粋な実態評価を収集します</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-orange-200 flex items-start gap-3">
                    <Eye className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold text-gray-800 mb-1">友人が感じる「あなたの実態」を入力</h3>
                        <p className="text-sm text-gray-600">10カテゴリで率直な評価を収集します</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-orange-200 flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold text-gray-800 mb-1">友人の本音があなたの魅力を引き出す</h3>
                        <p className="text-sm text-gray-600">建前だけでは見えない、あなたの真の個性が明らかに</p>
                    </div>
                </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-8">
                <p className="text-sm text-yellow-800 text-center font-medium">
                    ⚠️ 注意: 友人が正直に答えると、予想外の発見があるかもしれません
                </p>
            </div>

            {/* Action Button */}
            <button
                onClick={() => setStep(4)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-5 px-8 rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] text-lg flex items-center justify-center gap-3"
            >
                友人に評価してもらう
                <ArrowRight className="w-6 h-6" />
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
                ※ このデモ版では同じ端末で続けて入力します。友人にリンクを送る機能は今後実装予定です。
            </p>
        </div>
    );
}
