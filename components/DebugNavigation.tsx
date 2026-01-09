"use client";

import { useFormContext } from "@/context/FormContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function DebugNavigation() {
    const { state, setStep } = useFormContext();
    const searchParams = useSearchParams();
    const isDebug = searchParams.get('debug') === 'true';

    if (!isDebug) return null;

    const canGoPrev = state.step > 0;
    const canGoNext = state.step < 6;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex gap-2 bg-black/80 p-3 rounded-lg shadow-xl">
            <button
                onClick={() => canGoPrev && setStep(state.step - 1)}
                disabled={!canGoPrev}
                className={`flex items-center gap-1 px-4 py-2 rounded font-bold transition-all ${canGoPrev
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
            >
                <ChevronLeft className="w-5 h-5" />
                前へ
            </button>

            <div className="flex items-center px-3 text-white font-mono text-sm">
                Step {state.step}
            </div>

            <button
                onClick={() => canGoNext && setStep(state.step + 1)}
                disabled={!canGoNext}
                className={`flex items-center gap-1 px-4 py-2 rounded font-bold transition-all ${canGoNext
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
            >
                次へ
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
