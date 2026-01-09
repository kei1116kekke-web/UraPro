"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ProcessingScreenProps {
    questionNumber: 12 | 24;
    onComplete: () => void;
}

export default function ProcessingScreen({ questionNumber, onComplete }: ProcessingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Progress animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 40);

        // Auto-complete after 2 seconds
        const timer = setTimeout(() => {
            onComplete();
        }, 2000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timer);
        };
    }, [onComplete]);

    const getMessage = () => {
        if (questionNumber === 12) {
            return {
                emoji: "📊",
                title: "基本性格データを照合中...",
                subtitle: "矛盾回答をスキャンしています"
            };
        }
        return {
            emoji: "🔍",
            title: "過去のトラウマ傾向・地雷ポイントを特定中...",
            subtitle: "もう少しで完了します"
        };
    };

    const message = getMessage();

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center z-50 animate-in fade-in">
            <div className="text-center px-6 max-w-md">
                {/* Spinner */}
                <div className="mb-8 flex justify-center">
                    <Loader2 className="w-16 h-16 text-white animate-spin" />
                </div>

                {/* Emoji */}
                <div className="text-6xl mb-6 animate-pulse">
                    {message.emoji}
                </div>

                {/* Messages */}
                <h2 className="text-2xl font-bold text-white mb-3 animate-in slide-in-from-bottom-4 duration-500">
                    {message.title}
                </h2>
                <p className="text-blue-200 text-lg mb-8 animate-in slide-in-from-bottom-4 duration-700">
                    {message.subtitle}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-blue-800/30 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-blue-400 h-full rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Progress Text */}
                <p className="text-blue-300 text-sm mt-3">
                    {progress}%
                </p>
            </div>
        </div>
    );
}
