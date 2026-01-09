"use client";

import { useFormContext } from "@/context/FormContext";
import { CATEGORIES } from "@/data/questions";
import React, { useState } from "react";
import clsx from "clsx";
import { UserCheck, MessageSquare } from "lucide-react";

export default function FriendAuditForm() {
    const { state, updateFriendAnswers, setStep } = useFormContext();
    const [ratings, setRatings] = useState<{ [category: string]: number }>({});
    const [comments, setComments] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFriendAnswers({ ratings, comments });
        setStep(5); // Go to gap analysis animation
    };

    const isComplete = CATEGORIES.every(cat => ratings[cat.id] !== undefined);

    // Friend-specific questions for each category
    const friendQuestions: { [key: string]: string } = {
        honesty: 'この人は約束を守りますか？',
        communication: 'この人は人の話を聞いていますか？',
        love_style: 'この人は連絡マメですか？',
        loyalty: 'この人は浮気しそうですか？（1=しない、5=しそう）',
        emotional: 'この人はすぐ感情的になりますか？',
        values: 'この人はお金の管理ができていますか？',
        life_skills: 'この人の部屋は片付いていますか？',
        sociability: 'この人は社交的ですか？',
        self_esteem: 'この人は自信がありそうですか？',
        flexibility: 'この人は変化に対応できそうですか？',
    };

    return (
        <div className="w-full max-w-3xl bg-gradient-to-br from-orange-50 to-red-50 p-6 md:p-8 rounded-xl shadow-lg border-2 border-orange-400">
            <div className="bg-orange-500 text-white p-4 rounded-lg mb-6 text-center">
                <UserCheck className="w-8 h-8 mx-auto mb-2" />
                <h2 className="text-2xl font-bold">友人監査フォーム</h2>
                <p className="text-sm mt-1">あなたから見た「{state.profile.name}さん」の実態を教えてください</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800 text-center font-medium">
                        ⚠️ 本人の回答は表示されません。あなたが感じる実態を正直に評価してください
                    </p>
                </div>

                {CATEGORIES.map((cat, index) => {
                    const currentVal = ratings[cat.id];

                    return (
                        <div key={cat.id} className="bg-white p-4 rounded-lg border border-orange-300">
                            <div className="flex items-start gap-3 mb-4">
                                <span className="bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800 mb-1">{cat.name}</h3>
                                    <p className="text-sm text-gray-600">{friendQuestions[cat.id]}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center gap-1 sm:gap-2">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => setRatings(prev => ({ ...prev, [cat.id]: val }))}
                                            className={clsx(
                                                "flex-1 py-3 rounded-md text-sm font-bold transition-all border-2",
                                                currentVal === val
                                                    ? "bg-orange-500 text-white border-orange-500 shadow-md transform scale-105"
                                                    : "bg-white text-gray-500 border-gray-200 hover:border-orange-400 hover:bg-orange-50"
                                            )}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 px-1">
                                    <span>違う</span>
                                    <span className="text-center">普通</span>
                                    <span>そう思う</span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Comments Section */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border-2 border-red-300">
                    <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-5 h-5 text-red-600" />
                        <h3 className="font-bold text-red-700">暴露コメント（任意）</h3>
                    </div>
                    <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full p-3 border-2 border-red-200 rounded-md focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none min-h-32"
                        placeholder="例: 「いつも30分遅刻してくるくせに時間守るとか言ってるw」「部屋めっちゃ汚いのに清潔感アピールしてて草」"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isComplete}
                    className={clsx(
                        "w-full py-4 text-white font-bold rounded-lg shadow-md transition-all text-lg",
                        isComplete
                            ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:-translate-y-1"
                            : "bg-gray-300 cursor-not-allowed"
                    )}
                >
                    監査結果を提出する
                </button>

                {!isComplete && (
                    <p className="text-center text-orange-600 text-sm">
                        全ての項目に回答してください
                    </p>
                )}
            </form>
        </div>
    );
}
