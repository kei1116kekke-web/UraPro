"use client";

import { useFormContext } from "@/context/FormContext";
import { DIAGNOSIS_QUESTIONS } from "@/data/constants";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

const QUESTIONS_PER_PAGE = 4;

export default function DiagnosisForm() {
    const { updateAnswers, setStep } = useFormContext();
    const [localAnswers, setLocalAnswers] = useState<{ [key: string]: number }>({});
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(DIAGNOSIS_QUESTIONS.length / QUESTIONS_PER_PAGE);
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    const currentQuestions = DIAGNOSIS_QUESTIONS.slice(startIndex, endIndex);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleChange = (id: string, value: number) => {
        setLocalAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateAnswers(localAnswers);
        setStep(3);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const isCurrentPageComplete = currentQuestions.every(q => localAnswers[q.id] !== undefined);
    const isAllComplete = DIAGNOSIS_QUESTIONS.every(q => localAnswers[q.id] !== undefined);
    const answeredCount = Object.keys(localAnswers).length;

    return (
        <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-primary/20">
            <h2 className="text-2xl font-bold text-center text-primary mb-2">
                STEP 2. クロスチェック自己診断
            </h2>
            <p className="text-center text-gray-500 text-sm mb-4">
                あまり考え込まず、直感でお答えください。
            </p>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-primary">進捗</span>
                    <span className="text-sm font-bold text-primary">{answeredCount} / {DIAGNOSIS_QUESTIONS.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(answeredCount / DIAGNOSIS_QUESTIONS.length) * 100}%` }}
                    />
                </div>
                <div className="flex justify-center gap-2 mt-3">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentPage(i)}
                            className={clsx(
                                "w-8 h-8 rounded-full text-sm font-bold transition-all",
                                currentPage === i
                                    ? "bg-primary text-white shadow-md scale-110"
                                    : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                            )}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {currentQuestions.map((q, index) => {
                    const currentVal = localAnswers[q.id];
                    const questionNumber = startIndex + index + 1;

                    return (
                        <div key={q.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-start gap-3 mb-4">
                                <span className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">
                                    Q{questionNumber}
                                </span>
                                <p className="font-medium text-gray-800 leading-relaxed">{q.text}</p>
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

                {/* Navigation */}
                <div className="flex gap-4 pt-4">
                    {currentPage > 0 && (
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="flex-1 py-4 text-primary font-bold rounded-lg border-2 border-primary hover:bg-primary/5 transition-all"
                        >
                            ← 前へ
                        </button>
                    )}

                    {currentPage < totalPages - 1 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!isCurrentPageComplete}
                            className={clsx(
                                "flex-1 py-4 font-bold rounded-lg transition-all",
                                isCurrentPageComplete
                                    ? "bg-primary text-white hover:bg-primary-dark shadow-md"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            )}
                        >
                            次へ →
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={!isAllComplete}
                            className={clsx(
                                "flex-1 py-4 text-white font-bold rounded-lg shadow-md transition-all",
                                isAllComplete
                                    ? "bg-primary hover:bg-primary-dark transform hover:-translate-y-1"
                                    : "bg-gray-300 cursor-not-allowed"
                            )}
                        >
                            診断結果を発行する
                        </button>
                    )}
                </div>

                {!isCurrentPageComplete && (
                    <p className="text-center text-amber-600 text-sm">
                        このページの全ての質問に回答してください
                    </p>
                )}
            </form>
        </div>
    );
}
