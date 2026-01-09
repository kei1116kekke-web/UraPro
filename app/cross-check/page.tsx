"use client";

import { useState } from "react";
import { AlertTriangle, Heart, TrendingUp, TrendingDown, BarChart } from "lucide-react";
import { getDiagnosisById } from "@/lib/diagnosisDb";
import { calculateCompatibility, getRiskColor } from "@/lib/compatibilityCalculator";
import { validateReadableId } from "@/lib/idGenerator";

export default function CrossCheckPage() {
    const [myId, setMyId] = useState("");
    const [partnerId, setPartnerId] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleCheck = async () => {
        setError("");
        setResult(null);

        // Validation
        if (!myId || !partnerId) {
            setError("両方のIDを入力してください");
            return;
        }

        if (!validateReadableId(myId) || !validateReadableId(partnerId)) {
            setError("IDの形式が正しくありません（例: UP-26-XXXX）");
            return;
        }

        if (myId === partnerId) {
            setError("同じIDを入力することはできません");
            return;
        }

        setLoading(true);

        try {
            // Fetch both diagnoses from Supabase
            const [diagnosis1, diagnosis2] = await Promise.all([
                getDiagnosisById(myId),
                getDiagnosisById(partnerId)
            ]);

            if (!diagnosis1 || !diagnosis2) {
                setError("IDが見つかりませんでした。正しいIDを入力してください。");
                setLoading(false);
                return;
            }

            // Calculate compatibility
            const compatibility = calculateCompatibility(
                diagnosis1.scores,
                diagnosis2.scores
            );

            setResult({
                person1: diagnosis1,
                person2: diagnosis2,
                compatibility
            });
        } catch (err) {
            console.error("Error checking compatibility:", err);
            setError("エラーが発生しました。もう一度お試しください。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-gray mb-4">
                        関係性リスク診断
                    </h1>
                    <p className="text-lg text-gray-600">
                        2つのIDを照合し、関係性の相性・リスクを分析します
                    </p>
                </div>

                {/* Input Form */}
                <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-blue-200 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                あなたのID
                            </label>
                            <input
                                type="text"
                                value={myId}
                                onChange={(e) => setMyId(e.target.value.toUpperCase())}
                                placeholder="UP-26-XXXX"
                                className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                相手のID
                            </label>
                            <input
                                type="text"
                                value={partnerId}
                                onChange={(e) => setPartnerId(e.target.value.toUpperCase())}
                                placeholder="UP-26-YYYY"
                                className="w-full p-3 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none font-mono"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-2 border-red-300 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleCheck}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "診断中..." : "関係性シミュレーションを実行"}
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="space-y-6 animate-in fade-in duration-700">
                        {/* Risk Score */}
                        <div className={`p-8 rounded-xl border-4 ${getRiskColor(result.compatibility.level)}`}>
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold mb-2">リスクスコア</h2>
                                <div className="text-6xl font-black mb-2">{result.compatibility.riskScore}%</div>
                                <div className="text-xl font-bold">{result.compatibility.message}</div>
                            </div>

                            {/* Risk Meter */}
                            <div className="bg-white/50 rounded-lg p-4">
                                <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${result.compatibility.level === 'low'
                                            ? 'bg-green-500'
                                            : result.compatibility.level === 'medium'
                                                ? 'bg-yellow-500'
                                                : result.compatibility.level === 'high'
                                                    ? 'bg-orange-500'
                                                    : 'bg-red-500'
                                            }`}
                                        style={{ width: `${result.compatibility.riskScore}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Advice */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Heart className="w-6 h-6 text-red-500" />
                                アドバイス
                            </h3>
                            <ul className="space-y-2">
                                {result.compatibility.advice.map((item: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Category Differences */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <BarChart className="w-6 h-6 text-blue-600" />
                                カテゴリ別の差異
                            </h3>
                            <div className="space-y-3">
                                {result.compatibility.categoryDiffs.map((item: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-32 text-sm font-medium text-gray-700">{item.category}</div>
                                        <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                                            <div
                                                className={`h-full ${item.diff >= 4
                                                    ? 'bg-red-500'
                                                    : item.diff >= 2
                                                        ? 'bg-yellow-500'
                                                        : 'bg-green-500'
                                                    }`}
                                                style={{ width: `${(item.diff / 6) * 100}%` }}
                                            />
                                        </div>
                                        <div className="w-20 text-sm text-gray-600 text-right">
                                            差: {item.diff}pt
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Another Check Button */}
                        <button
                            onClick={() => {
                                setResult(null);
                                setMyId("");
                                setPartnerId("");
                            }}
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                        >
                            別のIDで診断する
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
