"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, BarChart, Shield, Zap } from "lucide-react";

interface GapAnalysisAnimationProps {
    onComplete: () => void;
}

export default function GapAnalysisAnimation({ onComplete }: GapAnalysisAnimationProps) {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState(0);
    const [gapDetected, setGapDetected] = useState(false);

    useEffect(() => {
        // Stage 0: Initial analysis (0-30%)
        const timer1 = setTimeout(() => setProgress(30), 500);
        const timer2 = setTimeout(() => setStage(1), 1000);

        // Stage 1: Building comparison (30-60%)
        const timer3 = setTimeout(() => setProgress(60), 1500);
        const timer4 = setTimeout(() => setStage(2), 2000);

        // Stage 2: Gap detection (60-90%)
        const timer5 = setTimeout(() => setProgress(90), 2500);
        const timer6 = setTimeout(() => {
            setStage(3);
            setGapDetected(true);
        }, 3000);

        // Stage 3: Complete (90-100%)
        const timer7 = setTimeout(() => setProgress(100), 3500);
        const timer8 = setTimeout(() => onComplete(), 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            clearTimeout(timer7);
            clearTimeout(timer8);
        };
    }, [onComplete]);

    return (
        <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900 via-red-900 to-black p-8 md:p-12 rounded-2xl shadow-2xl border-4 border-red-500 relative overflow-hidden">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#ff0000 1px, transparent 1px), linear-gradient(90deg, #ff0000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }} />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-red-500 p-4 rounded-full mb-4 animate-pulse">
                        <Shield className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">
                        システム判定中...
                    </h1>
                    <p className="text-red-300 text-sm">
                        建前と本音の乖離を分析しています
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden border-2 border-red-500">
                        <div
                            className="bg-gradient-to-r from-red-500 to-yellow-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end px-2"
                            style={{ width: `${progress}%` }}
                        >
                            <span className="text-white text-xs font-bold">{progress}%</span>
                        </div>
                    </div>
                </div>

                {/* Stages */}
                <div className="space-y-4 mb-8">
                    <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${stage >= 0 ? 'bg-green-900/50 text-green-300' : 'bg-gray-800/50 text-gray-500'}`}>
                        <BarChart className="w-5 h-5" />
                        <span className="font-medium">建前データ分析完了</span>
                        {stage >= 0 && <span className="ml-auto text-green-400">✓</span>}
                    </div>

                    <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${stage >= 1 ? 'bg-green-900/50 text-green-300' : 'bg-gray-800/50 text-gray-500'}`}>
                        <BarChart className="w-5 h-5" />
                        <span className="font-medium">本音データ分析完了</span>
                        {stage >= 1 && <span className="ml-auto text-green-400">✓</span>}
                    </div>

                    <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${stage >= 2 ? 'bg-yellow-900/50 text-yellow-300 animate-pulse' : 'bg-gray-800/50 text-gray-500'}`}>
                        <Zap className="w-5 h-5" />
                        <span className="font-medium">ギャップ検出中...</span>
                        {stage >= 2 && <span className="ml-auto text-yellow-400">●●●</span>}
                    </div>
                </div>

                {/* Gap Alert */}
                {gapDetected && (
                    <div className="bg-red-500 border-4 border-yellow-400 rounded-lg p-6 animate-in fade-in duration-500">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <AlertTriangle className="w-8 h-8 text-yellow-300 animate-bounce" />
                            <h2 className="text-2xl font-black text-white">警告</h2>
                            <AlertTriangle className="w-8 h-8 text-yellow-300 animate-bounce" />
                        </div>

                        <p className="text-white text-center font-bold text-lg mb-3">
                            重大なギャップが検出されました！
                        </p>

                        <div className="bg-black/30 rounded p-3 mb-3">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-yellow-300 text-sm font-bold">矛盾度</span>
                                <span className="text-yellow-300 text-sm font-bold">HIGH</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-4">
                                <div className="bg-gradient-to-r from-yellow-400 to-red-600 h-full rounded-full animate-pulse" style={{ width: '85%' }} />
                            </div>
                        </div>

                        <p className="text-yellow-100 text-center text-sm">
                            裏証明書を発行します...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
