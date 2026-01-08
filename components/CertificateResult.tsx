"use client";

import { useFormContext } from "@/context/FormContext";
import React, { useMemo } from "react";
import { Download, RotateCcw, Star, Award, AlertTriangle } from "lucide-react";
import { COMPREHENSIVE_QUESTIONS, CATEGORIES } from "@/data/questions";

export default function CertificateResult() {
    const { state, resetForm, setStep } = useFormContext();
    const { profile, answers } = state;

    // Helper to get answer value (normalize for analysis)
    const getAnswerValue = (id: string): number => {
        const answer = answers[id];
        if (typeof answer === 'number') return answer;

        // Convert choice answers to numerical scores
        const question = COMPREHENSIVE_QUESTIONS.find(q => q.id === id);
        if (!question || !question.options) return 3; // Default neutral

        const optionIndex = question.options.indexOf(answer);
        if (optionIndex === -1) return 3;

        // Map to 1-5 scale based on option count
        const optionCount = question.options.length;
        return Math.round((optionIndex / (optionCount - 1)) * 4) + 1;
    };

    // Contradiction detection using 3-layer validation
    const contradictionAnalysis = useMemo(() => {
        const contradictions: string[] = [];
        let contradictionScore = 0;

        // Check honesty group
        const q1Val = getAnswerValue('q1'); // Direct: 小さな嘘でも罪悪感
        const q2Ans = answers['q2']; // Behavioral: 約束を破った回数
        if (q1Val >= 4 && (q2Ans === '3-5回' || q2Ans === '6回以上')) {
            contradictions.push('誠実さに関する回答に矛盾が検出されました');
            contradictionScore += 2;
        }

        // Check communication
        const q5Val = getAnswerValue('q5'); // Direct: 最後まで聞ける
        const q7Ans = answers['q7']; // Behavioral: 話す割合
        if (q5Val >= 4 && (q7Ans === '7:3で話す方' || q7Ans === 'ほぼ話す')) {
            contradictions.push('コミュニケーションスタイルに矛盾が見られます');
            contradictionScore += 1;
        }

        // Check love style
        const q10Val = getAnswerValue('q10'); // Direct: 返信6時間で不安
        const q11Ans = answers['q11']; // Behavioral: 連絡で喧嘩
        if (q10Val <= 2 && (q11Ans === 'よくある' || q11Ans === 'たまにある')) {
            contradictions.push('恋愛スタイルの回答に一貫性が欠けています');
            contradictionScore += 1;
        }

        // Check loyalty
        const q14Val = getAnswerValue('q14'); // Direct: 目移りしない
        const q15Ans = answers['q15']; // Behavioral: 他の異性が気になる
        if (q14Val >= 4 && (q15Ans === '結構気になる' || q15Ans === 'かなり気になる')) {
            contradictions.push('一途さの自己評価と実態に乖離があります');
            contradictionScore += 2;
        }

        // Check emotional stability
        const q17Val = getAnswerValue('q17'); // Direct: 冷静でいられる
        const q19Ans = answers['q19']; // Behavioral: 感情的になった回数
        if (q17Val >= 4 && (q19Ans === '何度もある' || q19Ans === '数回ある')) {
            contradictions.push('情緒安定性の認識にズレがあります');
            contradictionScore += 1;
        }

        return { contradictions, score: contradictionScore };
    }, [answers]);

    // Category-based analysis
    const categoryAnalysis = useMemo(() => {
        const analyses: Record<string, { score: number; text: string }> = {};

        CATEGORIES.forEach(cat => {
            const categoryQuestions = COMPREHENSIVE_QUESTIONS.filter(q => q.category === cat.id);
            const scores = categoryQuestions.map(q => getAnswerValue(q.id));
            const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;

            // Generate contextual text based on category and score
            let text = '';

            if (cat.id === 'honesty') {
                if (avgScore >= 4) text = '約束を守り、嘘を嫌う高い誠実性を持つ。信頼できるパートナーとなる資質がある。';
                else if (avgScore >= 3) text = '一般的な誠実性を有している。状況に応じた柔軟な対応ができる。';
                else text = '実利的な判断を優先する傾向。正直さと方便のバランスを重視する。';
            } else if (cat.id === 'communication') {
                if (avgScore >= 4) text = '優れた共感力と傾聴力を持ち、円滑なコミュニケーションが可能。';
                else if (avgScore >= 3) text = 'バランスの取れたコミュニケーションスタイル。相手に応じた対話ができる。';
                else text = '自己主張が強い傾向。会話をリードする能力がある。';
            } else if (cat.id === 'love_style') {
                if (avgScore >= 4) text = '愛情表現が豊かで、パートナーとの密な関係を望む。連絡頻度が高い傾向。';
                else if (avgScore >= 3) text = '適度な距離感を保ちつつ愛情を表現できる。バランス型の恋愛観。';
                else text = '独立性を重視し、自由な関係性を好む。干渉を嫌う傾向がある。';
            } else if (cat.id === 'loyalty') {
                if (avgScore >= 4) text = '一途で浮気のリスクが極めて低い。パートナーへの献身性が高い。';
                else if (avgScore >= 3) text = '一般的な忠誠心を持つ。状況次第で揺らぐ可能性はある。';
                else text = '多様な可能性を探る自由な精神性。固定観念にとらわれない柔軟性がある。';
            } else if (cat.id === 'emotional') {
                if (avgScore >= 4) text = '感情コントロールに優れ、ストレス耐性が高い。冷静な判断ができる。';
                else if (avgScore >= 3) text = '一般的な情緒安定性。状況に応じて感情的になることもある。';
                else text = '感受性が豊かで繊細。環境変化に敏感に反応する傾向がある。';
            } else if (cat.id === 'values') {
                if (avgScore >= 4) text = '計画的で堅実な金銭感覚。将来設計がしっかりしている。';
                else if (avgScore >= 3) text = 'バランスの取れた価値観。楽しむべき時は楽しめる柔軟性がある。';
                else text = '今を楽しむことを重視。即興的な判断を好む傾向がある。';
            } else if (cat.id === 'life_skills') {
                if (avgScore >= 4) text = '整理整頓され、自己管理能力が高い。生活力に優れている。';
                else if (avgScore >= 3) text = '最低限の生活力は備えている。必要に応じて対応できる。';
                else text = '自由な生活スタイルを好む。形式にとらわれない独自の秩序がある。';
            } else if (cat.id === 'sociability') {
                if (avgScore >= 4) text = '社交的で初対面でも打ち解けやすい。人脈構築が得意。';
                else if (avgScore >= 3) text = '適度な社交性を持つ。状況に応じて対応できる。';
                else text = '少人数や一対一を好む内向型。深い関係性を重視する。';
            } else if (cat.id === 'self_esteem') {
                if (avgScore >= 4) text = '高い自己肯定感と美意識を持つ。自己表現を大切にする。';
                else if (avgScore >= 3) text = '適度な自信を持つ。TPOに応じた自己管理ができる。';
                else text = '内面重視の価値観。外見より実質を重んじる傾向。';
            } else if (cat.id === 'flexibility') {
                if (avgScore >= 4) text = '変化への適応力が高い。新しい挑戦を楽しめる成長志向。';
                else if (avgScore >= 3) text = '必要に応じて適応できる柔軟性。安定と変化のバランス型。';
                else text = '安定を好む慎重派。変化よりルーティンを重視する傾向。';
            }

            analyses[cat.id] = { score: avgScore, text };
        });

        return analyses;
    }, [answers]);

    // Generate titles based on high scores
    const titles = useMemo(() => {
        const titleList: string[] = [];

        Object.entries(categoryAnalysis).forEach(([catId, data]) => {
            if (data.score >= 4.5) {
                if (catId === 'honesty') titleList.push('誠実の鑑');
                if (catId === 'communication') titleList.push('コミュ力MAX');
                if (catId === 'love_style') titleList.push('愛情表現マスター');
                if (catId === 'loyalty') titleList.push('一途の申し子');
                if (catId === 'emotional') titleList.push('メンタル鋼鉄');
                if (catId === 'values') titleList.push('堅実派エリート');
                if (catId === 'life_skills') titleList.push('生活力の鬼');
                if (catId === 'sociability') titleList.push('社交界の星');
                if (catId === 'self_esteem') titleList.push('自信満々');
                if (catId === 'flexibility') titleList.push('適応力MAX');
            }
        });

        return titleList.length > 0 ? titleList : ['バランス型市民'];
    }, [categoryAnalysis]);

    // Catchphrase
    const catchphrase = useMemo(() => {
        const avgAll = Object.values(categoryAnalysis).reduce((sum, c) => sum + c.score, 0) / CATEGORIES.length;
        if (avgAll >= 4.5) return '完璧超人・社会の鑑';
        if (avgAll >= 4.0) return '信頼できる理想のパートナー';
        if (avgAll >= 3.5) return 'バランス感覚に優れた好人物';
        if (avgAll >= 3.0) return '等身大の魅力を持つ普通の人';
        return '自由奔放な個性派';
    }, [categoryAnalysis]);

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-in fade-in duration-700 pb-8">
            {/* Certificate Card */}
            <div
                id="certificate"
                className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border-4 border-primary/30 relative overflow-hidden w-full print:shadow-none print:border-2 print:p-6"
                style={{ maxWidth: '850px' }}
            >
                {/* Watermark */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
                    <div className="text-9xl font-serif font-black transform -rotate-12">URAPRO</div>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b-4 border-double border-primary pb-3 mb-4">
                    <div className="text-center md:text-left">
                        <div className="text-xs font-bold text-gray-400 tracking-widest">RELATIONSHIP COMPATIBILITY ASSESSMENT</div>
                        <h1 className="text-2xl md:text-3xl font-serif font-black text-primary">
                            恋愛適性診断書
                        </h1>
                    </div>
                    <div className="mt-2 md:mt-0 flex gap-2">
                        {contradictionAnalysis.score > 0 && (
                            <span className="text-xs font-bold text-white bg-red-500 px-3 py-1 rounded flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                矛盾検出
                            </span>
                        )}
                    </div>
                </div>

                {/* Name & Catchphrase */}
                <div className="text-center mb-4">
                    <div className="text-xs text-gray-400 mb-1">認証対象者</div>
                    <div className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2">
                        {profile.name}
                    </div>
                    <div className="inline-block bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 px-6 py-1 rounded-full text-sm font-bold text-yellow-800 border border-yellow-400/50">
                        {catchphrase}
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

                {/* Titles */}
                {titles.length > 0 && (
                    <div className="bg-gray-900 text-white p-3 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-yellow-500 text-sm">授与称号</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {titles.map((t, i) => (
                                <span key={i} className="bg-gray-800 text-white px-2 py-1 rounded text-xs border border-gray-600">
                                    ♛ {t}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* 10-Category Analysis */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-primary" />
                        <h3 className="font-bold text-primary text-sm">10カテゴリ総合評価</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {CATEGORIES.map((cat, idx) => {
                            // Color coding for each category
                            const colors = [
                                { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700' },     // honesty
                                { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700' },   // communication
                                { bg: 'bg-pink-50', border: 'border-pink-400', text: 'text-pink-700' },      // love_style
                                { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700' },         // loyalty
                                { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-700' }, // emotional
                                { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700' }, // values
                                { bg: 'bg-teal-50', border: 'border-teal-400', text: 'text-teal-700' },      // life_skills
                                { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-700' }, // sociability
                                { bg: 'bg-indigo-50', border: 'border-indigo-400', text: 'text-indigo-700' }, // self_esteem
                                { bg: 'bg-cyan-50', border: 'border-cyan-400', text: 'text-cyan-700' },      // flexibility
                            ];
                            const color = colors[idx] || colors[0];

                            return (
                                <div key={cat.id} className={`p-2 ${color.bg} rounded border-l-4 ${color.border}`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`${color.text} font-bold`}>{cat.name}</span>
                                        <span className="text-gray-400">
                                            {'★'.repeat(Math.round(categoryAnalysis[cat.id]?.score || 3))}
                                        </span>
                                    </div>
                                    <span className="text-gray-700">{categoryAnalysis[cat.id]?.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Contradiction Warning */}
                {contradictionAnalysis.contradictions.length > 0 && (
                    <div className="border-2 border-red-300 bg-red-50 p-3 rounded mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <p className="text-xs text-red-600 font-bold">
                                ◆ 矛盾検出レポート ◆
                            </p>
                        </div>
                        <ul className="text-xs text-red-700 space-y-1">
                            {contradictionAnalysis.contradictions.map((c, i) => (
                                <li key={i}>• {c}</li>
                            ))}
                        </ul>
                        <p className="text-xs text-red-600 mt-2">
                            ※ 自己評価と行動実態に矛盾が見られます。友人による他者評価を推奨します。
                        </p>
                    </div>
                )}

                {/* Footer Note */}
                <div className="border-t-2 border-primary/20 bg-primary/5 p-3 rounded text-center">
                    <p className="text-xs text-primary font-bold mb-1">
                        ◆ 本証明書について ◆
                    </p>
                    <p className="text-xs text-gray-600">
                        36問の総合診断により、10カテゴリで性格を分析しました。<br />
                        3層検証により建前と本音の乖離を検出しています。
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 print:hidden">
                <button
                    onClick={() => {
                        resetForm();
                        setStep(1);
                    }}
                    className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-bold"
                >
                    <RotateCcw className="w-5 h-5" /> 最初から
                </button>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors shadow-lg font-bold"
                >
                    <Download className="w-5 h-5" /> 証明書を保存
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
            .print\\:shadow-none { box-shadow: none !important; }
            .print\\:border-2 { border-width: 2px !important; }
            .print\\:p-6 { padding: 1.5rem !important; }
            #certificate {
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
