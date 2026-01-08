"use client";

import { useFormContext } from "@/context/FormContext";
import { DIAGNOSIS_QUESTIONS } from "@/data/constants";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

export default function DiagnosisForm() {
    const { updateAnswers, setStep } = useFormContext();
    const [localAnswers, setLocalAnswers] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (id: string, value: number) => {
        setLocalAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateAnswers(localAnswers);
        setStep(3);
    };

    const isComplete = DIAGNOSIS_QUESTIONS.every(q => localAnswers[q.id] !== undefined);

    return (
        <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-primary/20">
            <h2 className="text-2xl font-bold text-center text-primary mb-2">
                STEP 2. クロスチェック自己診断
            </h2>
            <p className="text-center text-gray-500 text-sm mb-8">
                あまり考え込まず、直感でお答えください。
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
                {DIAGNOSIS_QUESTIONS.map((q, index) => {
                    const currentVal = localAnswers[q.id];

                    return (
                        <div key={q.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                    Q{index + 1}
                                </span>
                                <p className="font-medium text-gray-800">{q.text}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center gap-1 sm:gap-2">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => handleChange(q.id, val)}
                                            className={clsx(
                                                "flex-1 py-3 rounded-md text-sm font-bold transition-all border-2",
                                                currentVal === val
                                                    ? "bg-primary text-white border-primary shadow-md transform scale-105"
                                                    : "bg-white text-gray-500 border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                                            )}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 px-1">
                                    <span>違う</span>
                                    <span className="text-center">どちらでも<br className="sm:hidden" />ない</span>
                                    <span>そう思う</span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={!isComplete}
                        className={clsx(
                            "w-full py-4 text-white font-bold rounded-lg shadow-md transition-all",
                            isComplete
                                ? "bg-primary hover:bg-primary-dark transform hover:-translate-y-1"
                                : "bg-gray-300 cursor-not-allowed"
                        )}
                    >
                        診断結果を発行する
                    </button>
                    {!isComplete && (
                        <p className="text-center text-red-500 text-sm mt-2">
                            すべての質問に回答してください
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
