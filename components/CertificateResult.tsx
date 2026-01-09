"use client";

import { useFormContext } from "@/context/FormContext";
import React, { useMemo, useState, useEffect } from "react";
import { Download, RotateCcw, Star, Award, AlertTriangle, BookOpen, Target, Users, Copy, Check } from "lucide-react";
import { COMPREHENSIVE_QUESTIONS, CATEGORIES } from "@/data/questions";
import { saveDiagnosisResult, getMyId } from "@/lib/diagnosisDb";

export default function CertificateResult() {
    const { state, resetForm, setStep } = useFormContext();
    const { profile, answers } = state;
    const [myId, setMyId] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [saving, setSaving] = useState(false);

    // Helper to get answer value (normalize for analysis)
    const getAnswerValue = (id: string): number => {
        const answer = answers[id];
        if (typeof answer === 'number') return answer;

        // Convert choice answers to numerical scores
        const question = COMPREHENSIVE_QUESTIONS.find(q => q.id === id);
        if (!question || !question.options) return 3; // Default neutral

        const optionIndex = question.options.indexOf(answer);
        if (optionIndex === -1) return 4; // Default to middle value (4 out of 7)

        // Map to 1-7 scale based on option count
        const optionCount = question.options.length;
        return Math.round((optionIndex / (optionCount - 1)) * 6) + 1;
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

    // Generate titles based on scores (expanded with humor)
    const titles = useMemo(() => {
        const titleList: string[] = [];

        Object.entries(categoryAnalysis).forEach(([catId, data]) => {
            // High score titles (4.0+)
            if (data.score >= 4.0) {
                if (catId === 'honesty') titleList.push('誠実の鑑');
                if (catId === 'communication') titleList.push('コミュ力MAX');
                if (catId === 'love_style') titleList.push('愛情表現マスター');
                if (catId === 'loyalty') titleList.push('一途の申し子');
                if (catId === 'emotional') titleList.push('メンタル鋼鉄');
                if (catId === 'values') titleList.push('堅実派エリート');
                if (catId === 'life_skills') titleList.push('生活力の鬼');
                if (catId === 'sociability') titleList.push('社交界の星');
                if (catId === 'self_esteem') titleList.push('自信満々王');
                if (catId === 'flexibility') titleList.push('適応力MAX');
            }
            // Medium-high titles (3.5-3.9)
            else if (data.score >= 3.5) {
                if (catId === 'honesty') titleList.push('嘘つけない人');
                if (catId === 'communication') titleList.push('聞き上手');
                if (catId === 'love_style') titleList.push('愛情豊か');
                if (catId === 'loyalty') titleList.push('浮気しない派');
                if (catId === 'emotional') titleList.push('冷静沈着');
                if (catId === 'values') titleList.push('計画的人間');
                if (catId === 'life_skills') titleList.push('生活安定型');
                if (catId === 'sociability') titleList.push('人見知りしない');
                if (catId === 'self_esteem') titleList.push('自己肯定感良好');
                if (catId === 'flexibility') titleList.push('柔軟思考');
            }
            // Low score humorous titles (2.5以下)
            else if (data.score <= 2.5) {
                if (catId === 'honesty') titleList.push('嘘も方便派');
                if (catId === 'communication') titleList.push('マイペース会話');
                if (catId === 'love_style') titleList.push('クールな恋愛観');
                if (catId === 'loyalty') titleList.push('自由恋愛主義');
                if (catId === 'emotional') titleList.push('感情豊かな人');
                if (catId === 'values') titleList.push('今を楽しむ派');
                if (catId === 'life_skills') titleList.push('ミニマリスト');
                if (catId === 'sociability') titleList.push('選ばれし仲間派');
                if (catId === 'self_esteem') titleList.push('謙虚な心');
                if (catId === 'flexibility') titleList.push('安定志向');
            }
        });

        // Add special combo titles
        const avgScore = Object.values(categoryAnalysis).reduce((sum, c) => sum + c.score, 0) / CATEGORIES.length;
        if (avgScore >= 4.5) titleList.push('完璧超人');
        if (avgScore >= 4.0) titleList.push('優等生タイプ');
        if (avgScore <= 2.5) titleList.push('個性派');

        // Specific patterns
        if (categoryAnalysis.honesty?.score >= 4 && categoryAnalysis.loyalty?.score >= 4) {
            titleList.push('絶対的信頼');
        }
        if (categoryAnalysis.love_style?.score >= 4 && categoryAnalysis.communication?.score >= 4) {
            titleList.push('理想のパートナー');
        }
        if (categoryAnalysis.sociability?.score >= 4 && categoryAnalysis.communication?.score >= 4) {
            titleList.push('人気者');
        }
        if (categoryAnalysis.emotional?.score <= 2.5 && categoryAnalysis.self_esteem?.score >= 4) {
            titleList.push('繊細なナルシスト');
        }
        if (categoryAnalysis.life_skills?.score <= 2.5 && categoryAnalysis.flexibility?.score >= 4) {
            titleList.push('自由奔放');
        }

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

    // Generate hashtags based on personality
    const hashtags = useMemo(() => {
        const tags: string[] = [];
        const avgAll = Object.values(categoryAnalysis).reduce((sum, c) => sum + c.score, 0) / CATEGORIES.length;

        // Based on specific categories
        if (categoryAnalysis.honesty?.score <= 2.5) tags.push('#外ヅラ良すぎ');
        if (categoryAnalysis.communication?.score >= 4.5) tags.push('#レスポンス鬼早');
        if (categoryAnalysis.emotional?.score <= 2.5) tags.push('#メンヘラ予備軍');
        if (categoryAnalysis.loyalty?.score <= 2.5) tags.push('#浮気症注意');
        if (categoryAnalysis.values?.score <= 2.5) tags.push('#金遃10日で消える');
        if (categoryAnalysis.life_skills?.score <= 2.0) tags.push('#部屋カオス');
        if (categoryAnalysis.sociability?.score >= 4.5) tags.push('#パーティーアニマル');
        if (categoryAnalysis.self_esteem?.score >= 4.5) tags.push('#自撮り魔');
        if (categoryAnalysis.flexibility?.score <= 2.0) tags.push('#石頭');
        if (avgAll >= 4.5) tags.push('#完璧人間');
        if (avgAll <= 2.5) tags.push('#問題児');

        // Generic fallbacks
        if (tags.length === 0) {
            tags.push('#普通', '#無難', '#平均的');
        }

        return tags.slice(0, 3);
    }, [categoryAnalysis]);

    // Generate user manual (torisetsu)
    const userManual = useMemo(() => {
        const warnings: string[] = [];
        const strategies: string[] = [];
        const compatibility: string[] = [];

        // Warnings based on low scores
        if (categoryAnalysis.emotional?.score <= 2.5) {
            warnings.push('感情的になりやすいため、急な予定変更やサプライズは禁物です。');
        }
        if (categoryAnalysis.life_skills?.score <= 2.0) {
            warnings.push('生活力が低いため、同棲する場合はあなたが家事を負担する覚悟が必要です。');
        }
        if (categoryAnalysis.communication?.score <= 2.0) {
            warnings.push('コミュ力不足のため、“察して”は通用しません。明確に伝えましょう。');
        }

        // Strategies based on high scores
        if (categoryAnalysis.love_style?.score >= 4.0) {
            strategies.push('愛情表現豊かなため、素直に感謝を伝えると喜びます。');
        }
        if (categoryAnalysis.values?.score >= 4.0) {
            strategies.push('堅実派なので、将来計画や貯金の話で安心させると効果的です。');
        }
        if (categoryAnalysis.honesty?.score >= 4.5) {
            strategies.push('誠実さを評価されると喜びます。嘘や裏切りは絶対に避けましょう。');
        }

        // Compatibility warnings
        if (categoryAnalysis.flexibility?.score <= 2.0 && categoryAnalysis.values?.score >= 4.0) {
            compatibility.push('変化を好まないタイプとは混ぜるな危険。衝突必至です。');
        }
        if (categoryAnalysis.sociability?.score >= 4.5) {
            compatibility.push('インドア派や内向型とは生活リズムが合わずストレスになります。');
        }
        if (categoryAnalysis.emotional?.score <= 2.0) {
            compatibility.push('メンタル強めの人と組まないと振り回されます。');
        }

        // Fallbacks
        if (warnings.length === 0) warnings.push('特に大きな地雷はありませんが、油断は禁物です。');
        if (strategies.length === 0) strategies.push('普通に接することで良好な関係を築けます。');
        if (compatibility.length === 0) compatibility.push('特定の相性問題は確認されませんでした。');

        return { warnings, strategies, compatibility };
    }, [categoryAnalysis]);

    // Save diagnosis to database and get ID
    useEffect(() => {
        const saveAndGenerateId = async () => {
            // Check if already saved
            const existingId = getMyId();
            if (existingId) {
                setMyId(existingId);
                return;
            }

            setSaving(true);
            try {
                const id = await saveDiagnosisResult(
                    profile.name,
                    profile,
                    categoryAnalysis,
                    hashtags,
                    catchphrase
                );
                if (id) {
                    setMyId(id);
                }
            } catch (error) {
                console.error('Failed to save diagnosis:', error);
            } finally {
                setSaving(false);
            }
        };

        saveAndGenerateId();
    }, []); // Run once on mount

    const handleCopyId = () => {
        if (myId) {
            navigator.clipboard.writeText(myId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

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
                    <div className="inline-block bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 px-6 py-1 rounded-full text-sm font-bold text-yellow-800 border border-yellow-400/50 mb-2">
                        {catchphrase}
                    </div>
                    {/* Hashtags */}
                    <div className="flex justify-center gap-2 flex-wrap">
                        {hashtags.map((tag, i) => (
                            <span key={i} className="text-blue-600 text-xs font-medium">
                                {tag}
                            </span>
                        ))}
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

                {/* ID Display Section */}
                {myId && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg border-2 border-blue-400 mb-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="text-xs font-bold text-blue-600 mb-1">個体識別番号</div>
                                <div className="text-2xl md:text-3xl font-mono font-bold text-blue-900">
                                    {myId}
                                </div>
                                <div className="text-xs text-blue-600 mt-1">Personal Identification Number</div>
                            </div>
                            <button
                                onClick={handleCopyId}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-lg transition-colors">
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        コピー済み
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        IDをコピー
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="mt-4 text-sm text-blue-700 bg-white/60 p-3 rounded border border-blue-300">
                            💡 <strong>パートナーにこのIDを伝えて、関係性リスクを診断してください</strong>
                        </div>
                    </div>
                )}

                {/* Compatibility Check Button */}
                {myId && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg border-2 border-purple-300 mb-4">
                        <h3 className="text-lg font-bold text-purple-900 mb-3 text-center">
                            💑 パートナーとの相性を診断
                        </h3>
                        <p className="text-sm text-purple-700 mb-4 text-center">
                            パートナーのIDと照合して、関係性リスクを分析できます
                        </p>
                        <a
                            href="/cross-check"
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-3 rounded-lg transition-all shadow-md"
                        >
                            相性診断ページへ
                        </a>
                    </div>
                )}

                {saving && (
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-300 mb-4 text-center text-sm text-yellow-700">
                        IDを生成中...
                    </div>
                )}

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

                            const score = categoryAnalysis[cat.id]?.score || 3;
                            const roundedScore = Math.round(score);

                            return (
                                <div key={cat.id} className={`p-2 ${color.bg} rounded border-l-4 ${color.border}`}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`${color.text} font-bold`}>{cat.name}</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((starNum) => (
                                                <span key={starNum} className={starNum <= roundedScore ? 'text-yellow-500' : 'text-gray-300'}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
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

                {/* User Manual (Torisetsu) */}
                <div className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-purple-700 text-sm">取扱説明書（トリセツ）</h3>
                    </div>

                    <div className="space-y-3 text-xs">
                        {/* Warnings */}
                        <div className="bg-white p-3 rounded border border-red-200">
                            <div className="font-bold text-red-700 mb-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                【注意】地雷ポイント
                            </div>
                            <ul className="text-gray-700 space-y-1">
                                {userManual.warnings.map((w, i) => (
                                    <li key={i}>• {w}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Strategies */}
                        <div className="bg-white p-3 rounded border border-green-200">
                            <div className="font-bold text-green-700 mb-1 flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                【攻略】効果的なアプローチ
                            </div>
                            <ul className="text-gray-700 space-y-1">
                                {userManual.strategies.map((s, i) => (
                                    <li key={i}>• {s}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Compatibility */}
                        <div className="bg-white p-3 rounded border border-orange-200">
                            <div className="font-bold text-orange-700 mb-1 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                【相性】混ぜるな危険
                            </div>
                            <ul className="text-gray-700 space-y-1">
                                {userManual.compatibility.map((c, i) => (
                                    <li key={i}>• {c}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

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
