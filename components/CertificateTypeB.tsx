"use client";

import { useFormContext } from "@/context/FormContext";
import React, { useMemo } from "react";
import { Download, RotateCcw, AlertTriangle, Skull, FileWarning } from "lucide-react";
import { COMPREHENSIVE_QUESTIONS, CATEGORIES } from "@/data/questions";

export default function CertificateTypeB() {
    const { state, resetForm, setStep } = useFormContext();
    const { profile, answers, friendAnswers } = state;

    // Calculate gap between self and friend ratings
    const gapAnalysis = useMemo(() => {
        if (!friendAnswers) return [];

        const gaps = CATEGORIES.map(cat => {
            // Get average self-rating for this category
            const catQuestions = COMPREHENSIVE_QUESTIONS.filter(q => q.category === cat.id);
            const selfScores = catQuestions.map(q => {
                const answer = answers[q.id];
                if (typeof answer === 'number') return answer;
                if (q.options) {
                    const idx = q.options.indexOf(answer as string);
                    return idx !== -1 ? Math.round((idx / (q.options.length - 1)) * 4) + 1 : 3;
                }
                return 3;
            });
            const selfAvg = selfScores.reduce((sum, s) => sum + s, 0) / selfScores.length;

            // Friend rating
            const friendRating = friendAnswers.ratings[cat.id] || 3;

            // Calculate gap
            const gap = selfAvg - friendRating;

            return {
                category: cat.name,
                self: selfAvg,
                friend: friendRating,
                gap: gap,
                severity: Math.abs(gap) >= 2 ? 'high' : Math.abs(gap) >= 1 ? 'medium' : 'low'
            };
        });

        return gaps;
    }, [answers, friendAnswers]);

    const totalGap = useMemo(() => {
        return gapAnalysis.reduce((sum, g) => sum + Math.abs(g.gap), 0) / gapAnalysis.length;
    }, [gapAnalysis]);

    const trustLevel = useMemo(() => {
        if (totalGap >= 2.0) return { grade: 'D', label: '要注意人物', color: 'text-red-500' };
        if (totalGap >= 1.5) return { grade: 'C', label: '建前度高め', color: 'text-orange-500' };
        if (totalGap >= 1.0) return { grade: 'B', label: '普通', color: 'text-yellow-500' };
        return { grade: 'A', label: '信頼性高', color: 'text-green-500' };
    }, [totalGap]);

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-in fade-in duration-700 pb-8">
            {/* Certificate Card - Type B (Black/Red/Yellow CIA style) */}
            <div
                id="certificate-type-b"
                className="bg-gradient-to-br from-gray-900 via-black to-red-950 p-6 md:p-8 rounded-xl shadow-2xl border-4 border-red-600 relative overflow-hidden w-full print:shadow-none print:border-2 print:p-6"
                style={{ maxWidth: '850px' }}
            >
                {/* Top Secret Watermark */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center transform rotate-12">
                    <div className="text-9xl font-black text-red-500">CLASSIFIED</div>
                </div>

                {/* Warning Stripes */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-400 via-black to-yellow-400" />
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-400 via-black to-yellow-400" />

                {/* Header */}
                <div className="border-b-4 border-double border-red-500 pb-3 mb-4 text-center relative">
                    <div className="absolute -top-2 -left-2 bg-red-600 text-white px-3 py-1 text-xs font-black transform -rotate-3 shadow-lg">
                        CLASSIFIED
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                        <div className="text-xs font-bold text-red-400 tracking-widest">⚠️ CONFIDENTIAL INTELLIGENCE REPORT ⚠️</div>
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500">
                        裏・人物実態報告書
                    </h1>
                    <div className="text-sm text-gray-400 mt-1">Type-B: Redacted Intelligence</div>
                </div>

                {/* Subject Name */}
                <div className="text-center mb-4">
                    <div className="text-xs text-gray-500 mb-1">SUBJECT CODENAME</div>
                    <div className="text-4xl md:text-5xl font-serif font-bold text-red-400 mb-2 tracking-wide">
                        {profile.name}
                    </div>
                    <div className="inline-block bg-gradient-to-r from-red-900 to-yellow-900 px-6 py-2 rounded border-2 border-yellow-500">
                        <div className="flex items-center gap-2">
                            <Skull className="w-5 h-5 text-yellow-400" />
                            <span className="text-yellow-300 font-bold">信頼性評価: {trustLevel.grade}</span>
                            <span className={`${trustLevel.color} font-bold`}>({trustLevel.label})</span>
                        </div>
                    </div>
                </div>

                {/* Gap Analysis Table */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <FileWarning className="w-5 h-5 text-red-500" />
                        <h3 className="font-bold text-red-400 text-sm">建前 vs 本音 対比表</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                            <thead>
                                <tr className="bg-red-900 text-yellow-300 border-2 border-red-500">
                                    <th className="p-2 border border-red-700 font-bold">カテゴリ</th>
                                    <th className="p-2 border border-red-700 font-bold">本人(建前)</th>
                                    <th className="p-2 border border-red-700 font-bold">友人(本音)</th>
                                    <th className="p-2 border border-red-700 font-bold">ギャップ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gapAnalysis.map((gap, idx) => (
                                    <tr key={idx} className={`border border-red-900 ${gap.severity === 'high' ? 'bg-red-950' : gap.severity === 'medium' ? 'bg-yellow-950/30' : 'bg-gray-900'}`}>
                                        <td className="p-2 border border-red-900 text-gray-300 font-medium">{gap.category}</td>
                                        <td className="p-2 border border-red-900 text-center">
                                            <span className="text-blue-400">★ {gap.self.toFixed(1)}</span>
                                        </td>
                                        <td className="p-2 border border-red-900 text-center">
                                            <span className="text-orange-400">★ {gap.friend.toFixed(1)}</span>
                                        </td>
                                        <td className="p-2 border border-red-900 text-center font-bold">
                                            {gap.gap > 0 ? (
                                                <span className="text-red-400">+{gap.gap.toFixed(1)} ⚠️</span>
                                            ) : gap.gap < 0 ? (
                                                <span className="text-green-400">{gap.gap.toFixed(1)} ✓</span>
                                            ) : (
                                                <span className="text-gray-400">0.0</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Friend Comments (Redacted Style) */}
                {friendAnswers?.comments && friendAnswers.comments.trim() && (
                    <div className="border-4 border-yellow-500 bg-black p-4 rounded mb-4 relative">
                        <div className="absolute -top-3 left-4 bg-yellow-500 text-black px-3 py-1 text-xs font-black">
                            INTELLIGENCE REPORT
                        </div>
                        <h4 className="text-yellow-400 font-bold mb-2 text-sm flex items-center gap-2">
                            <Skull className="w-4 h-4" />
                            友人による暴露コメント
                        </h4>
                        <div className="bg-red-950/50 p-3 rounded border border-red-700">
                            <p className="text-red-300 whitespace-pre-wrap text-sm leading-relaxed">
                                {friendAnswers.comments}
                            </p>
                        </div>
                    </div>
                )}

                {/* System Judgment */}
                <div className="border-4 border-red-600 bg-gradient-to-r from-red-950 to-black p-4 rounded text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 animate-pulse" />
                        <p className="text-yellow-300 font-bold text-sm">
                            ━━━ システム判定 ━━━
                        </p>
                        <AlertTriangle className="w-5 h-5 text-yellow-400 animate-pulse" />
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className="text-red-300">
                            <span className="font-bold">建前度:</span> {Math.round(totalGap * 20)}%
                            {totalGap >= 1.5 && <span className="ml-2 text-yellow-400">(かなり盛ってる)</span>}
                        </p>
                        <p className="text-red-300">
                            <span className="font-bold">平均ギャップ:</span> {totalGap.toFixed(2)} ポイント
                        </p>
                        <p className="text-yellow-200 text-xs mt-2">
                            ※ この情報は機密扱いです。取り扱いにご注意ください。
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 print:hidden">
                <button
                    onClick={() => {
                        resetForm();
                        setStep(0);
                    }}
                    className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-bold"
                >
                    <RotateCcw className="w-5 h-5" /> 最初から
                </button>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-yellow-600 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-yellow-700 transition-colors shadow-lg font-bold"
                >
                    <Download className="w-5 h-5" /> 裏証明書を保存
                </button>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body { 
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .print\\:hidden { display: none !important; }
                    #certificate-type-b {
                        max-width: 100% !important;
                        margin: 0 !important;
                        page-break-inside: avoid !important;
                    }
                    @page {
                        size: A4;
                        margin: 8mm;
                    }
                }
            `}</style>
        </div>
    );
}
