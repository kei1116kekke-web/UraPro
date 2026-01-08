"use client";

import { useFormContext } from "@/context/FormContext";
import { MBTI_TYPES, LOVE_TYPES } from "@/data/constants";
import { User, Heart, Briefcase, Hash } from "lucide-react";
import React from "react";

// Generate age options: 非公開, 0-100
const AGE_OPTIONS = ["非公開", ...Array.from({ length: 101 }, (_, i) => `${i}歳`)];

export default function ProfileForm() {
    const { state, updateProfile, setStep } = useFormContext();
    const { profile } = state;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    return (
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border-2 border-primary/20">
            <h2 className="text-2xl font-bold text-center text-primary mb-8 border-b pb-4">
                STEP 1. 基本事項入力
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name - REQUIRED */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 flex items-center gap-1">
                            <User className="w-4 h-4" /> 氏名 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={profile.name}
                            onChange={(e) => updateProfile({ name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="山田 太郎"
                        />
                    </div>

                    {/* Age - Dropdown, Optional */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 flex items-center gap-1">
                            <Hash className="w-4 h-4" /> 年齢
                        </label>
                        <select
                            value={profile.age}
                            onChange={(e) => updateProfile({ age: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                        >
                            <option value="">選択してください</option>
                            {AGE_OPTIONS.map((age) => (
                                <option key={age} value={age}>{age}</option>
                            ))}
                        </select>
                    </div>

                    {/* Job - Optional */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 flex items-center gap-1">
                            <Briefcase className="w-4 h-4" /> 職業 (自称可)
                        </label>
                        <input
                            type="text"
                            value={profile.job}
                            onChange={(e) => updateProfile({ job: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="株式会社〇〇 係長"
                        />
                    </div>

                    {/* MBTI - Optional */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">MBTI</label>
                        <select
                            value={profile.mbti}
                            onChange={(e) => updateProfile({ mbti: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white font-sans"
                        >
                            <option value="">選択してください</option>
                            {MBTI_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    {/* Love Type - Optional */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700 flex items-center gap-1">
                            <Heart className="w-4 h-4" /> LOVEタイプ
                        </label>
                        <select
                            value={profile.loveType}
                            onChange={(e) => updateProfile({ loveType: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white font-sans"
                        >
                            <option value="">選択してください</option>
                            {LOVE_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        <a
                            href="https://16test.uranaino.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary underline block text-right hover:text-primary-dark"
                        >
                            タイプ名を確認する
                        </a>
                    </div>
                </div>

                {/* Hobbies - Optional */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">趣味・特技</label>
                    <input
                        type="text"
                        value={profile.hobbies.join(', ')}
                        onChange={(e) => updateProfile({ hobbies: e.target.value.split(/,\s*/).filter(Boolean) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        placeholder="サウナ, カフェ巡り (カンマ区切り)"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-8 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md transform active:scale-[0.99]"
                >
                    次へ進む (自己診断へ)
                </button>
            </form>
        </div>
    );
}
