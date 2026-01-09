"use client";

import { useFormContext } from "@/context/FormContext";
import { CATEGORIES } from "@/data/questions";
import { FRIEND_QUESTIONS, IMPRESSION_TAGS } from "@/data/friendQuestions";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { UserCheck, MessageSquare, Sparkles } from "lucide-react";
import ImpressionTags from "./ImpressionTags";

export default function FriendAuditForm() {
    const { state, updateFriendAnswers, setStep } = useFormContext();
    const [specificAnswers, setSpecificAnswers] = useState<{ [key: string]: number }>({});
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [comments, setComments] = useState("");
    const [episode, setEpisode] = useState("");

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert specific answers to category ratings (average)
        const categoryRatings: { [key: string]: number } = {};
        CATEGORIES.forEach(cat => {
            categoryRatings[cat.id] = 3; // Default middle value
        });

        updateFriendAnswers({
            ratings: categoryRatings,
            specificAnswers,
            tags: selectedTags,
            comments,
            episode
        });
        setStep(5); // Go to payment gate
    };

    const isComplete = FRIEND_QUESTIONS.every(q => specificAnswers[q.id] !== undefined);
    const progress = Math.round((Object.keys(specificAnswers).length / FRIEND_QUESTIONS.length) * 100);

    return (
        <div className="w-full max-w-4xl bg-gradient-to-br from-orange-50 to-red-50 p-6 md:p-8 rounded-xl shadow-lg border-2 border-orange-400">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-lg mb-6 text-center">
                <UserCheck className="w-10 h-10 mx-auto mb-3" />
                <h2 className="text-3xl font-bold mb-2">他者評価フォーム</h2>
                <p className="text-sm">あなたから見た「{state.profile.name}さん」の実態を教えてください</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Progress */}
                <div className="bg-white p-4 rounded-lg border-2 border-orange-300">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-orange-600">回答進捗</span>
                        <span className="text-sm font-bold text-orange-600">
                            {Object.keys(specificAnswers).length} / {FRIEND_QUESTIONS.length}
                        </span>
                    </div>
                    <div className="w-full bg-orange-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 text-center font-medium">
                        ⚠️ 本人の回答は表示されません。あなたが感じる実態を正直に評価してください
                    </p>
                </div>

                {/* Specific Questions (7-point scale) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-orange-600" />
                        <h3 className="font-bold text-orange-700 text-lg">具体的な質問（12問）</h3>
                    </div>

                    {FRIEND_QUESTIONS.map((q, index) => {
                        const currentVal = specificAnswers[q.id];

                        return (
                            <div key={q.id} className="bg-white p-4 rounded-lg border border-orange-300 shadow-sm">
                                <div className="flex items-start gap-3 mb-4">
                                    <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 font-bold">
                                        {index + 1}
                                    </span>
                                    <p className="font-medium text-gray-800 flex-1 leading-relaxed">{q.text}</p>
                                </div>

                                {/* Dropdown Selection with custom options */}
                                <div className="mt-3">
                                    <select
                                        value={currentVal !== undefined ? String(currentVal) : ''}
                                        onChange={(e) => setSpecificAnswers(prev => ({ ...prev, [q.id]: Number(e.target.value) }))}
                                        className="w-full p-3 border-2 border-orange-300 rounded-lg bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-700 font-medium"
                                    >
                                        <option value="" disabled>選択してください</option>
                                        {q.options?.map((option, idx) => (
                                            <option key={idx} value={idx + 1}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Impression Tags */}
                <ImpressionTags
                    tags={IMPRESSION_TAGS}
                    selectedTags={selectedTags}
                    onTagsChange={setSelectedTags}
                />

                {/* Episode Input */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg border-2 border-blue-300">
                    <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-blue-700">具体的なエピソード（任意）</h3>
                    </div>
                    <textarea
                        value={episode}
                        onChange={(e) => setEpisode(e.target.value)}
                        className="w-full p-3 border-2 border-blue-200 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none min-h-24 mb-3"
                        placeholder="この人を象徴するエピソードがあれば教えてください（例: 「飲み会で必ず1時間遅刻してくる」「デートプランは全部こっち任せ」）"
                    />
                </div>

                {/* Comments Section (Expose) */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-lg border-2 border-red-300">
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
                        "w-full py-5 text-white font-bold rounded-lg shadow-md transition-all text-lg",
                        isComplete
                            ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:-translate-y-1"
                            : "bg-gray-300 cursor-not-allowed"
                    )}
                >
                    他者評価を提出する
                </button>

                {!isComplete && (
                    <p className="text-center text-orange-600 text-sm font-medium">
                        全ての質問（12問）に回答してください
                    </p>
                )}
            </form>
        </div>
    );
}
