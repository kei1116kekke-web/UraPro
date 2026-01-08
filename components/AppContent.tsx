"use client";

import { useFormContext } from "@/context/FormContext";
import HomePage from "@/components/HomePage";
import ProfileForm from "@/components/ProfileForm";
import DiagnosisForm from "@/components/DiagnosisForm";
import CertificateResult from "@/components/CertificateResult";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useState, useEffect } from "react";

function StepContent() {
    const { state } = useFormContext();
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (state.step === 3 && !showResult) {
            setIsLoading(true);
        }
    }, [state.step, showResult]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
        setShowResult(true);
    };

    // Reset when going back to step 0 or 1
    useEffect(() => {
        if (state.step <= 1) {
            setShowResult(false);
            setIsLoading(false);
        }
    }, [state.step]);

    if (state.step === 3) {
        if (isLoading) {
            return <LoadingAnimation onComplete={handleLoadingComplete} />;
        }
        if (showResult) {
            return <CertificateResult />;
        }
    }

    switch (state.step) {
        case 0:
            return <HomePage />;
        case 1:
            return <ProfileForm />;
        case 2:
            return <DiagnosisForm />;
        default:
            return <HomePage />;
    }
}

export default function AppContent() {
    return (
        <div className="w-full flex items-center justify-center py-8">
            <StepContent />
        </div>
    );
}
