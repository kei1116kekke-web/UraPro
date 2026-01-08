"use client";

import { useFormContext } from "@/context/FormContext";
import React, { useMemo } from "react";
import { Download, RotateCcw, Star, Award } from "lucide-react";

export default function CertificateResult() {
    const { state, resetForm, setStep } = useFormContext();
    const { profile, answers } = state;

    const getScore = (id: string) => answers[id] || 3;

    // Analysis Logic for Text Descriptions
    const analysis = useMemo(() => {
        const getText = (score: number, items: string[]) => {
            if (score >= 4) return items[0];
            if (score <= 2) return items[2];
            return items[1];
        };

        return {
            social: getText(getScore('q1'), [
                "誰とでも即座に打ち解ける圧倒的なコミュニケーション能力を有しており、組織の潤滑油として極めて優秀である。",
                "状況に応じて適切な距離感を保ち、無難な対人関係を構築する能力を有している。",
                "孤高を愛する精神性を持ち、独自の内的世界を構築することに長けている。"
            ]),
            mental: getText(getScore('q3'), [
                "鋼のような精神力を持ち、緊急事態においても冷静沈着な判断を下すことが可能である。",
                "一般的なストレス耐性を有しており、日常業務において支障をきたすことはない。",
                "感受性が極めて豊かであり、微細な環境の変化を敏感に察知する繊細な心を持っている。"
            ]),
            love: getText(getScore('q5'), [
                "情熱的かつ迅速な行動力を持ち、愛する対象に対して迷いなく突き進むエネルギーを有している。",
                "恋愛に対してバランスの取れたスタンスを維持し、相手に負担をかけない適度な距離感を保つ。",
                "慎重かつ思慮深い恋愛観を持ち、相手をじっくりと見極める冷静さを備えている。"
            ]),
            loyalty: getText(getScore('q7'), [
                "一途さにおいて類を見ないほどの信頼性を有し、パートナーに絶対的な安心感を与える存在である。",
                "適度な自由と献身のバランスを保ち、健全な関係性を構築する能力がある。",
                "多様な可能性を探求する自由な精神を持ち、固定観念にとらわれない柔軟性を有している。"
            ]),
            life: getText(getScore('q9'), [
                "規律正しい生活習慣と卓越した自己管理能力を有し、模範的な市民生活を営んでいる。",
                "社会通念上許容される範囲内で、柔軟な生活スタイルを維持している。",
                "形式にとらわれない自由なライフスタイルを好み、創造的な混沌の中で生活する才能がある。"
            ]),
            cleanliness: getText(getScore('q11'), [
                "整理整頓を完璧に実践し、常にゲストを迎え入れられる状態を維持している。",
                "必要に応じて整理を行い、実用的なレベルで生活空間を管理している。",
                "所有物に対する独自の管理システムを構築し、他者には理解しがたい秩序を維持している。"
            ]),
            value: getText(getScore('q15'), [
                "卓越した美意識と高い自己肯定感を兼ね備え、常に最高の自分を表現する努力を惜しまない。",
                "ＴＰＯをわきまえた適切な身だしなみを心がけ、社会人としての常識的な美意識を有している。",
                "外見よりも内面の実質を重視する実利的な価値観を持ち、飾らない素朴な魅力を有している。"
            ]),
        };
    }, [answers]);

    const { catchphrase, titles, overallGrade } = useMemo(() => {
        const phrases = [
            "時代を牽引する愛の絶対君主",
            "全人類がひれ伏す光の化身",
            "完全無欠のスーパーエリート",
            "100年に1人の逸材",
            "息をするだけで世界を救う聖人"
        ];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];

        const tList = [];
        if ((answers['q1'] || 0) >= 4) tList.push("初対面キラー");
        if ((answers['q3'] || 0) >= 4) tList.push("メンタル・チタン合金");
        if ((answers['q5'] || 0) >= 4) tList.push("光速の即レスマシーン");
        if ((answers['q7'] || 0) >= 4) tList.push("一途の鑑");
        if ((answers['q9'] || 0) >= 4) tList.push("鉄壁の財務大臣");
        if ((answers['q11'] || 0) >= 4) tList.push("断捨離マスター");
        if ((answers['q15'] || 0) >= 4) tList.push("鏡の国の住人");
        if ((answers['q13'] || 0) >= 4) tList.push("紳士の鏡");

        if (tList.length === 0) tList.push("無害なる市民");

        // Calculate overall grade
        const totalScore = Object.values(answers).reduce((sum, val) => sum + (val || 0), 0);
        const avgScore = totalScore / Object.keys(answers).length;
        let grade = "C";
        if (avgScore >= 4.5) grade = "S";
        else if (avgScore >= 4.0) grade = "A";
        else if (avgScore >= 3.0) grade = "B";

        return { catchphrase: phrase, titles: tList, overallGrade: grade };
    }, [answers]);

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-in fade-in duration-700 pb-8">
            {/* Certificate Card - Single Page Optimized */}
            <div
                id="certificate"
                className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border-4 border-primary/30 relative overflow-hidden w-full print:shadow-none print:border-2 print:p-6"
                style={{ maxWidth: '800px' }}
            >
                {/* Watermark */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
                    <div className="text-9xl font-serif font-black transform -rotate-12">URAPRO</div>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b-4 border-double border-primary pb-3 mb-4">
                    <div className="text-center md:text-left">
                        <div className="text-xs font-bold text-gray-400 tracking-widest">OFFICIAL SELF-DECLARATION CERTIFICATE</div>
                        <h1 className="text-2xl md:text-3xl font-serif font-black text-primary">
                            裏・公的自己申告証明書
                        </h1>
                    </div>
                    <div className="mt-2 md:mt-0">
                        <span className="text-xs font-bold text-white bg-primary px-3 py-1 rounded">Type-A: 建前</span>
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

                {/* Basic Data Grid - Compact */}
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

                {/* Titles - Compact */}
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

                {/* Official Evaluation Comments - Compact Grid */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-primary" />
                        <h3 className="font-bold text-primary text-sm">公式評価コメント</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-blue-50/50 rounded border-l-4 border-primary">
                            <span className="text-primary font-bold">社交性: </span>
                            <span className="text-gray-700">{analysis.social}</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded border-l-4 border-gray-400">
                            <span className="text-primary font-bold">精神力: </span>
                            <span className="text-gray-700">{analysis.mental}</span>
                        </div>
                        <div className="p-2 bg-red-50/30 rounded border-l-4 border-red-400">
                            <span className="text-primary font-bold">恋愛観: </span>
                            <span className="text-gray-700">{analysis.love}</span>
                        </div>
                        <div className="p-2 bg-pink-50/30 rounded border-l-4 border-pink-400">
                            <span className="text-primary font-bold">一途さ: </span>
                            <span className="text-gray-700">{analysis.loyalty}</span>
                        </div>
                        <div className="p-2 bg-green-50/30 rounded border-l-4 border-green-400">
                            <span className="text-primary font-bold">金銭管理: </span>
                            <span className="text-gray-700">{analysis.life}</span>
                        </div>
                        <div className="p-2 bg-yellow-50/30 rounded border-l-4 border-yellow-400">
                            <span className="text-primary font-bold">整理整頓: </span>
                            <span className="text-gray-700">{analysis.cleanliness}</span>
                        </div>
                        <div className="p-2 bg-purple-50/30 rounded border-l-4 border-purple-400 md:col-span-2">
                            <span className="text-primary font-bold">美意識: </span>
                            <span className="text-gray-700">{analysis.value}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Note - Changed from WARNING to NOTICE */}
                <div className="border-t-2 border-primary/20 bg-primary/5 p-3 rounded text-center">
                    <p className="text-xs text-primary font-bold mb-1">
                        ◆ 本証明書について ◆
                    </p>
                    <p className="text-xs text-gray-600">
                        本データは対象者の自己申告（建前）に基づいて作成されています。<br />
                        真の姿を知るためには、友人・知人によるクロスチェック診断の受診を推奨いたします。
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
              margin: 10mm;
            }
        }
      `}</style>
        </div>
    );
}
