"use client";

import { useState } from "react";
import clsx from "clsx";
import { Tag } from "lucide-react";

interface ImpressionTag {
    id: string;
    label: string;
    category: 'positive' | 'negative';
}

interface ImpressionTagsProps {
    tags: ImpressionTag[];
    selectedTags: string[];
    onTagsChange: (tags: string[]) => void;
}

export default function ImpressionTags({ tags, selectedTags, onTagsChange }: ImpressionTagsProps) {
    const toggleTag = (tagId: string) => {
        if (selectedTags.includes(tagId)) {
            onTagsChange(selectedTags.filter(id => id !== tagId));
        } else {
            // Limit to 6 tags
            if (selectedTags.length < 6) {
                onTagsChange([...selectedTags, tagId]);
            }
        }
    };

    const positiveTags = tags.filter(t => t.category === 'positive');
    const negativeTags = tags.filter(t => t.category === 'negative');

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg border-2 border-purple-300">
            <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-purple-700">印象タグ選択（最大6つ）</h3>
            </div>

            <p className="text-sm text-purple-600 mb-4">
                この人の特徴を表すタグを選んでください（複数選択可）
            </p>

            {/* Negative Tags */}
            <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-600 mb-2">⚠️ 注意点・弱点</h4>
                <div className="flex flex-wrap gap-2">
                    {negativeTags.map(tag => {
                        const isSelected = selectedTags.includes(tag.id);
                        return (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => toggleTag(tag.id)}
                                className={clsx(
                                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2",
                                    isSelected
                                        ? "bg-red-500 text-white border-red-600 shadow-md"
                                        : selectedTags.length >= 6
                                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                            : "bg-white text-red-600 border-red-300 hover:bg-red-50"
                                )}
                                disabled={!isSelected && selectedTags.length >= 5}
                            >
                                {tag.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Positive Tags */}
            <div>
                <h4 className="text-xs font-bold text-gray-600 mb-2">✨ 良い点・強み</h4>
                <div className="flex flex-wrap gap-2">
                    {positiveTags.map(tag => {
                        const isSelected = selectedTags.includes(tag.id);
                        return (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => toggleTag(tag.id)}
                                className={clsx(
                                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2",
                                    isSelected
                                        ? "bg-blue-500 text-white border-blue-600 shadow-md"
                                        : selectedTags.length >= 5
                                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                            : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                                )}
                                disabled={!isSelected && selectedTags.length >= 6}
                            >
                                {tag.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-3 text-xs text-purple-600 text-center">
                選択中: {selectedTags.length} / 6
            </div>
        </div>
    );
}
