"use client";

import { useFormContext } from "@/context/FormContext";
import { COMPREHENSIVE_QUESTIONS } from "@/data/questions";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

const QUESTIONS_PER_PAGE = 6;

export default function DiagnosisForm() {
    const { updateAnswers, setStep } = useFormContext();
    const [localAnswers, setLocalAnswers] = useState<{ [key: string]: any }>({});
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(COMPREHENSIVE_QUESTIONS.length / QUESTIONS_PER_PAGE);
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    const currentQuestions = COMPREHENSIVE_QUESTIONS.slice(startIndex, endIndex);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleChange = (id: string, value: any) => {
        const newAnswers = { ...localAnswers, [id]: value };
        setLocalAnswers(newAnswers);
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
    const isAllComplete = COMPREHENSIVE_QUESTIONS.every(q => localAnswers[q.id] !== undefined);
    const answeredCount = Object.keys(localAnswers).length;



    return (
        <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-xl shadow-lg border-2 border-primary/20">
            <h2 className="text-2xl font-bold text-center text-primary mb-2">
                STEP 2. 総合診断
            </h2>
            <p className="text-center text-gray-500 text-sm mb-4">
                直感で正直にお答えください。回答の一貫性から建前と本音を分析します。
            </p>

            {/* Progress Bar - Sticky */}
            <div className="sticky top-0 z-10 bg-white p-4 -m-6 md:-m-8 mb-4 md:mb-6 rounded-t-xl border-b-2 border-primary/10 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-primary">進捗</span>
                    <span className="text-sm font-bold text-primary">{answeredCount} / {COMPREHENSIVE_QUESTIONS.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(answeredCount / COMPREHENSIVE_QUESTIONS.length) * 100}%` }}
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
                        <div key={q.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex items-start gap-3 mb-4">
                                <span className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">
                                    {questionNumber}
                                </span>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 leading-relaxed">{q.text}</p>
                                    <span className="text-xs text-gray-400 mt-1 inline-block">
                                        {q.categoryName}
                                    </span>
                                </div>
                            </div>

                            {/* Render based on question type */}
                            {q.type === 'scale' ? (
                                // 7-scale MBTI-style buttons
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center gap-1">
                                        {[1, 2, 3, 4, 5, 6, 7].map((val) => {
                                            // Gradient sizing: larger at edges, smaller in middle
                                            const sizes = {
                                                1: 'w-12 h-12',  // 強く同意しない
                                                2: 'w-10 h-10',  // 同意しない
                                                3: 'w-8 h-8',    // 少し同意しない
                                                4: 'w-7 h-7',    // 中立
                                                5: 'w-8 h-8',    // 少し同意
                                                6: 'w-10 h-10',  // 同意
                                                7: 'w-12 h-12',  // 強く同意
                                            };

                                            // Color coding: disagree (warm/gray) vs agree (cool/blue)
                                            const getColor = () => {
                                                if (currentVal === val) {
                                                    return val <= 3
                                                        ? 'bg-red-500 border-red-600'
                                                        : val === 4
                                                            ? 'bg-gray-500 border-gray-600'
                                                            : 'bg-blue-500 border-blue-600';
                                                }
                                                return val <= 3
                                                    ? 'bg-red-100 border-red-200 hover:border-red-400'
                                                    : val === 4
                                                        ? 'bg-gray-100 border-gray-200 hover:border-gray-400'
                                                        : 'bg-blue-100 border-blue-200 hover:border-blue-400';
                                            };

                                            return (
                                                <button
                                                    key={val}
                                                    type="button"
                                                    onClick={() => handleChange(q.id, val)}
                                                    className={clsx(
                                                        "rounded-full border-2 transition-all flex items-center justify-center",
                                                        sizes[val as keyof typeof sizes],
                                                        getColor(),
                                                        currentVal === val ? 'scale-110 shadow-lg' : 'hover:scale-105'
                                                    )}
                                                    aria-label={`レベル${val}`}
                                                >
                                                    {currentVal === val && (
                                                        <span className="text-white font-bold text-xs">{val}</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 px-1">
                                        <span className="text-red-600 font-medium">強く<br />反対</span>
                                        <span className="text-gray-500">中立</span>
                                        <span className="text-blue-600 font-medium">強く<br />同意</span>
                                    </div>
                                </div>
                            ) : (
                                // Choice-based (radio buttons)
                                <div className="space-y-2">
                                    {q.options?.map((option, optIndex) => (
                                        <button
                                            key={optIndex}
                                            type="button"
                                            onClick={() => handleChange(q.id, option)}
                                            className={clsx(
                                                "w-full p-3 rounded-md text-left text-sm font-medium transition-all border-2",
                                                currentVal === option
                                                    ? "bg-primary text-white border-primary shadow-md"
                                                    : "bg-white text-gray-700 border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={clsx(
                                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                                    currentVal === option ? "border-white" : "border-gray-300"
                                                )}>
                                                    {currentVal === option && (
                                                        <div className="w-3 h-3 rounded-full bg-white"></div>
                                                    )}
                                                </div>
                                                <span>{option}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
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
