"use client";

import { useState, useEffect } from "react";

interface LoadingAnimationProps {
    onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
    const [progress, setProgress] = useState(0);
    const [currentText, setCurrentText] = useState("データを解析中...");

    const texts = [
        "データを解析中...",
        "回答の一貫性をチェック中...",
        "建前レベルを測定中...",
        "本音との乖離を計算中...",
        "証明書を生成中...",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        const textIndex = Math.min(Math.floor(progress / 20), texts.length - 1);
        setCurrentText(texts[textIndex]);
    }, [progress]);

    return (
        <div className="w-full max-w-lg bg-white p-12 rounded-xl shadow-2xl border-2 border-primary/20 text-center">
            {/* Certificate Icon Animation */}
            <div className="relative w-32 h-40 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg border-2 border-gray-300 shadow-lg animate-pulse">
                    <div className="absolute top-4 left-4 right-4 space-y-2">
                        <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                    </div>
                </div>
                {/* Stamp effect */}
                <div
                    className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center transform rotate-12 transition-all duration-500"
                    style={{ opacity: progress > 80 ? 1 : 0, transform: `rotate(${progress > 80 ? -12 : 45}deg) scale(${progress > 80 ? 1 : 0.5})` }}
                >
                    <span className="text-red-600 font-bold text-xs">認証</span>
                </div>
            </div>

            {/* Progress Text */}
            <h2 className="text-xl font-bold text-primary mb-4">
                証明書を発行しています
            </h2>
            <p className="text-gray-600 mb-6 h-6 transition-all">
                {currentText}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-4">
                <div
                    className="bg-gradient-to-r from-primary to-blue-400 h-full rounded-full transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-2xl font-bold text-primary">{progress}%</p>
        </div>
    );
}
