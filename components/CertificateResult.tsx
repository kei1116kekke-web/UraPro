"use client";

import { useFormContext } from "@/context/FormContext";
import React, { useMemo } from "react";
import { AlertTriangle, Download, RotateCcw } from "lucide-react";

export default function CertificateResult() {
    const { state, resetForm, setStep } = useFormContext();
    const { profile, answers } = state;

    const getScore = (id: string) => answers[id] || 3;

    // Analysis Logic for Text Descriptions
    const analysis = useMemo(() => {
        // Calculate category scores (Just averaging for simple text generation logic)
        const socialScore = (getScore('q1') + getScore('q2')) / 2; // q2 is reversed for "honne" but let's just use raw for "Official Comment" style
        // Wait, the user wants "Official Comments" describing the RESULT.
        // Let's generate a comment for each category based on the score.

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
            love: getText(getScore('q5'), [ // Using q5 (Contact speed) as proxy for passion
                "情熱的かつ迅速な行動力を持ち、愛する対象に対して迷いなく突き進むエネルギーを有している。",
                "恋愛に対してバランスの取れたスタンスを維持し、相手に負担をかけない適度な距離感を保つ。",
                "慎重かつ思慮深い恋愛観を持ち、相手をじっくりと見極める冷静さを備えている。"
            ]),
            life: getText(getScore('q9'), [ // Money/Cleanliness
                "規律正しい生活習慣と卓越した自己管理能力を有し、模範的な市民生活を営んでいる。",
                "社会通念上許容される範囲内で、柔軟な生活スタイルを維持している。",
                "形式にとらわれない自由なライフスタイルを好み、創造的な混沌の中で生活する才能がある。"
            ]),
            value: getText(getScore('q15'), [ // Narcissism/Appearance
                "卓越した美意識と高い自己肯定感を兼ね備え、常に最高の自分を表現する努力を惜しまない。",
                "ＴＰＯをわきまえた適切な身だしなみを心がけ、社会人としての常識的な美意識を有している。",
                "外見よりも内面の実質を重視する実利的な価値観を持ち、飾らない素朴な魅力を有している。"
            ]),
        };
    }, [answers]);

    const { catchphrase, titles } = useMemo(() => {
        const phrases = [
            "時代を牽引する愛の絶対君主",
            "全人類がひれ伏す光の化身",
            "完全無欠のスーパーエリート",
            "100年に1人の逸材",
            "息をするだけで世界を救う聖人"
        ];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];

        const tList = [];
        if ((answers['q5'] || 0) >= 4) tList.push("光速の即レスマシーン");
        if ((answers['q9'] || 0) >= 4) tList.push("鉄壁の財務大臣");
        if ((answers['q11'] || 0) >= 4) tList.push("断捨離の神");
        if ((answers['q15'] || 0) >= 4) tList.push("鏡の国の住人");
        if ((answers['q3'] || 0) >= 4) tList.push("メンタル・チタン合金");

        if (tList.length === 0) tList.push("平凡なる市民", "無害な存在");

        return { catchphrase: phrase, titles: tList };
    }, [answers]);

    return (
        <div className="w-full max-w-4xl flex flex-col items-center gap-8 animate-in fade-in duration-700 pb-12">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border-4 border-primary/30 relative overflow-hidden w-full print:shadow-none print:border-2">
                {/* Watermark */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                    <div className="text-9xl font-serif font-black transform -rotate-12">URAPRO</div>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-double border-primary pb-4 mb-8">
                    <div className="text-center md:text-left w-full">
                        <div className="text-xs font-bold text-gray-500 mb-1 tracking-widest">OFFICIAL SELF-DECLARATION CERTIFICATE</div>
                        <h1 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-widest">
                            裏・公的自己申告証明書
                        </h1>
                    </div>
                    <div className="mt-4 md:mt-0 text-xs font-bold text-white bg-primary px-3 py-1 rounded shadow">
                        Type-A: 建前 (Surface)
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-8">
                    {/* Name & Catchphrase Section */}
                    <div className="text-center">
                        <div className="text-sm text-gray-500 font-serif mb-2">認証対象者 (CERTIFIED PERSON)</div>
                        <div className="text-5xl font-serif font-bold text-gray-900 mb-4 tracking-wider">
                            {profile.name}
                        </div>
                        <div className="inline-block bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 px-8 py-2 rounded-full text-sm md:text-base font-bold text-yellow-900 shadow-sm border border-yellow-400/50">
                            {catchphrase}
                        </div>
                    </div>

                    {/* Basic Data Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div>
                            <div className="text-xs text-gray-400 mb-1">年齢</div>
                            <div className="font-bold text-lg">{profile.age}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 mb-1">職業</div>
                            <div className="font-bold text-lg">{profile.job}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 mb-1">MBTI</div>
                            <div className="font-bold text-base leading-tight">{profile.mbti.split('(')[0]}<br /><span className="text-xs text-gray-500">({profile.mbti.split('(')[1] || ''}</span></div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 mb-1">LOVEタイプ</div>
                            <div className="font-bold text-base leading-tight">{profile.loveType.split('(')[0]}<br /><span className="text-xs text-gray-500">({profile.loveType.split('(')[1] || ''}</span></div>
                        </div>
                    </div>

                    {/* Official Comments (Replacement for Radar Chart) */}
                    <div className="space-y-4">
                        <h3 className="font-serif font-bold text-xl text-primary border-b border-primary/20 pb-2 flex items-center gap-2">
                            <span>❖</span> 公式評価コメント (OFFICIAL EVALUATION)
                        </h3>

                        <div className="space-y-3 text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                            <div className="flex gap-4 p-3 bg-blue-50/50 rounded hover:bg-blue-50 transition-colors">
                                <span className="text-primary font-bold min-w-[4rem]">社交性</span>
                                <p>{analysis.social}</p>
                            </div>
                            <div className="flex gap-4 p-3 bg-white rounded hover:bg-gray-50 transition-colors">
                                <span className="text-primary font-bold min-w-[4rem]">精神力</span>
                                <p>{analysis.mental}</p>
                            </div>
                            <div className="flex gap-4 p-3 bg-red-50/30 rounded hover:bg-red-50/50 transition-colors">
                                <span className="text-primary font-bold min-w-[4rem]">恋愛観</span>
                                <p>{analysis.love}</p>
                            </div>
                            <div className="flex gap-4 p-3 bg-white rounded hover:bg-gray-50 transition-colors">
                                <span className="text-primary font-bold min-w-[4rem]">生活力</span>
                                <p>{analysis.life}</p>
                            </div>
                            <div className="flex gap-4 p-3 bg-yellow-50/30 rounded hover:bg-yellow-50/50 transition-colors">
                                <span className="text-primary font-bold min-w-[4rem]">美意識</span>
                                <p>{analysis.value}</p>
                            </div>
                        </div>
                    </div>

                    {/* Titles */}
                    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-inner">
                        <h3 className="font-bold text-yellow-500 mb-4 text-sm tracking-widest border-b border-gray-700 pb-2">授与称号 (TITLES)</h3>
                        <div className="flex flex-wrap gap-2">
                            {titles.map((t, i) => (
                                <span key={i} className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 text-sm">
                                    ♛ {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer / Warning */}
                <div className="mt-8 border-2 border-red-500 bg-red-50 p-4 rounded text-center">
                    <div className="flex items-center justify-center gap-2 text-red-600 font-bold mb-2">
                        <AlertTriangle className="w-6 h-6" />
                        <span>WARNING: CONTRADICTION DETECTED</span>
                    </div>
                    <p className="text-sm text-red-700 font-bold">
                        ※本データは自己申告（建前）に基づいて作成されています。
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                        内部監視システムにより、回答内容と実態の間に<span className="underline font-black text-red-800">重大な乖離</span>が検知されました。<br />
                        直ちに友人による監査（クロスチェック）を受け、真実の姿を明らかにしてください。
                    </p>
                </div>
            </div>

            <div className="flex gap-4 print:hidden">
                <button
                    onClick={() => {
                        resetForm();
                        setStep(1);
                    }}
                    className="flex items-center gap-2 bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors font-bold"
                >
                    <RotateCcw className="w-5 h-5" /> 最初に戻る
                </button>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors shadow-lg font-bold"
                >
                    <Download className="w-5 h-5" /> 証明書を保存
                </button>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
        @media print {
            body { background: white; }
            .print\\:hidden { display: none; }
            .print\\:shadow-none { box-shadow: none; }
            .print\\:border-2 { border-width: 2px; }
        }
      `}</style>
        </div>
    );
}
