"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormState, ProfileData, DiagnosisAnswers } from '@/types';

interface FormContextType {
    state: FormState;
    setStep: (step: number) => void;
    updateProfile: (data: Partial<ProfileData>) => void;
    updateAnswers: (newAnswers: DiagnosisAnswers) => void;
    resetForm: () => void;
}

const defaultProfile: ProfileData = {
    name: '',
    age: '',
    job: '',
    mbti: '',
    loveType: '',
    hobbies: [],
    bio: '',
};

const defaultState: FormState = {
    step: 0,
    profile: defaultProfile,
    answers: {},
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<FormState>(defaultState);

    const setStep = (step: number) => {
        setState((prev) => ({ ...prev, step }));
    };

    const updateProfile = (data: Partial<ProfileData>) => {
        setState((prev) => ({
            ...prev,
            profile: { ...prev.profile, ...data },
        }));
    };

    const updateAnswers = (newAnswers: DiagnosisAnswers) => {
        setState((prev) => ({
            ...prev,
            answers: { ...prev.answers, ...newAnswers },
        }));
    };

    const resetForm = () => {
        setState(defaultState);
    };

    return (
        <FormContext.Provider value={{ state, setStep, updateProfile, updateAnswers, resetForm }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
