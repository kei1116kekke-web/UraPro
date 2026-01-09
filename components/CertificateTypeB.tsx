"use client";

import { useFormContext } from "@/context/FormContext";
import React, { useMemo } from "react";
import { Download, RotateCcw, CheckCircle, Shield, Star } from "lucide-react";
import { COMPREHENSIVE_QUESTIONS, CATEGORIES } from "@/data/questions";

export default function CertificateTypeB() {
    const { state, resetForm, setStep } = useFormContext();
    const { profile, answers, friendAnswers } = state;

    // Calculate comparison between self and friend ratings
    const evaluationComparison = useMemo(() => {
        if (!friendAnswers) return [];

        const comparisons = CATEGORIES.map(cat => {
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

            // Calculate difference
            const diff = selfAvg - friendRating;
            let assessment = '概ね一致';
            if (diff > 1) assessment = 'やや高めの自己評価';
            else if (diff < -1) assessment = 'やや控えめな自己評価';

            return {
                category: cat.name,
                self: selfAvg,
                friend: friendRating,
                assessment: assessment
            };
        });

        return comparisons;
    }, [answers, friendAnswers]);

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-in fade-in duration-700 pb-8">
            {/* Certificate Card - Type B (Clean White/Blue design) */}
            <div
                id="certificate-type-b"
                className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border-4 border-blue-400 relative overflow-hidden w-full print:shadow-none print:border-2 print:p-6"
                style={{ maxWidth: '850px' }}
            >
                {/* Watermark */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
                    <div className="text-9xl font-serif font-black text-blue-500">URAPRO</div>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b-4 border-double border-blue-500 pb-3 mb-4">
                    <div className="text-center md:text-left">
                        <div className="text-xs font-bold text-gray-400 tracking-widest">PEER-EVALUATED DIAGNOSIS REPORT</div>
                        <h1 className="text-2xl md:text-3xl font-serif font-black text-blue-600">
                            他者分析診断書
                        </h1>
                        <div className="text-sm text-gray-500 mt-1">Type-B: Peer Evaluation</div>
                    </div>
                    <div className="mt-2 md:mt-0 flex flex-col gap-2">
                        <div className="flex items-center gap-2 bg-green-50 border-2 border-green-500 rounded px-3 py-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div className="text-xs font-bold text-green-700">
                                <div>✓ 友人認定済み</div>
                                <div>Verified by Peer</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Name & Basic Info */}
                <div className="text-center mb-4">
                    <div className="text-xs text-gray-400 mb-1">対象者</div>
                    <div className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2">
                        {profile.name}
                    </div>
                    <div className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-1 rounded-full text-sm font-medium text-blue-700 border border-blue-300">
                        他者評価による性格分析が完了しました
                    </div>
                </div>

                {/* Basic Data Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4 text-sm">
                    <div>
                        <div className="text-xs text-gray-400">年齢</div>
                        <div className="font-bold">{profile.age || "未設定"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">職業</div>
                        <div className="font-bold truncate">{profile.job || "未設定"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">MBTI</div>
                        <div className="font-bold">{profile.mbti ? profile.mbti.split('(')[0] : "未設定"}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">LOVEタイプ</div>
                        <div className="font-bold truncate">{profile.loveType ? profile.loveType.split('(')[0] : "未設定"}</div>
                    </div>
                </div>

                {/* Peer Evaluation Report */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-blue-600 text-sm">10カテゴリ 他者評価レポート</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="p-2 border border-blue-500 font-bold">カテゴリ</th>
                                    <th className="p-2 border border-blue-500 font-bold">自己評価</th>
                                    <th className="p-2 border border-blue-500 font-bold">友人評価</th>
                                    <th className="p-2 border border-blue-500 font-bold">評価</th>
                                </tr>
                            </thead>
                            <tbody>
                                {evaluationComparison.map((comp, idx) => (
                                    <tr key={idx} className={`border border-blue-200 ${idx % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'}`}>
                                        <td className="p-2 border border-blue-200 text-gray-800 font-medium">{comp.category}</td>
                                        <td className="p-2 border border-blue-200 text-center">
                                            <div className="flex gap-0.5 justify-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star} className={star <= Math.round(comp.self) ? 'text-blue-500' : 'text-gray-300'}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-2 border border-blue-200 text-center">
                                            <div className="flex gap-0.5 justify-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star} className={star <= Math.round(comp.friend) ? 'text-orange-500' : 'text-gray-300'}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-2 border border-blue-200 text-center text-gray-600 text-xs">
                                            {comp.assessment}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Friend Comments */}
                {friendAnswers?.comments && friendAnswers.comments.trim() && (
                    <div className="border-2 border-blue-300 bg-blue-50 p-4 rounded mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <h4 className="text-blue-700 font-bold text-sm">友人からのコメント</h4>
                        </div>
                        <div className="bg-white p-3 rounded border border-blue-200">
                            <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                                {friendAnswers.comments}
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer Note */}
                <div className="border-t-2 border-blue-300 bg-blue-50 p-3 rounded text-center">
                    <p className="text-xs text-blue-700 font-bold mb-1">
                        ◆ 本診断書について ◆
                    </p>
                    <p className="text-xs text-gray-600">
                        本人による36問診断と、友人による10カテゴリ評価を統合した結果です。<br />
                        他者視点を取り入れることで、より客観的な自己理解が可能になります。
                    </p>
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
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors shadow-lg font-bold"
                >
                    <Download className="w-5 h-5" /> 診断書を保存
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
