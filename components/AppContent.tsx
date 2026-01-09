"use client";

import { useFormContext } from "@/context/FormContext";
import HomePage from "@/components/HomePage";
import ProfileForm from "@/components/ProfileForm";
import DiagnosisForm from "@/components/DiagnosisForm";
import CertificateResult from "@/components/CertificateResult";
import HandoffScreen from "@/components/HandoffScreen";
import FriendAuditForm from "@/components/FriendAuditForm";
import GapAnalysisAnimation from "@/components/GapAnalysisAnimation";
import CertificateTypeB from "@/components/CertificateTypeB";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useState, useEffect } from "react";

function StepContent() {
    const { state } = useFormContext();
    const [isLoadingTypeA, setIsLoadingTypeA] = useState(false);
    const [showTypeA, setShowTypeA] = useState(false);
    const [isLoadingTypeB, setIsLoadingTypeB] = useState(false);
    const [showTypeB, setShowTypeB] = useState(false);

    // Handle Type-A loading animation (Step 3)
    useEffect(() => {
        if (state.step === 3 && !showTypeA) {
            setIsLoadingTypeA(true);
        }
    }, [state.step, showTypeA]);

    const handleTypeALoadingComplete = () => {
        setIsLoadingTypeA(false);
        setShowTypeA(true);
    };

    // Handle Type-B loading animation (Step 5)
    useEffect(() => {
        if (state.step === 5 && !showTypeB) {
            setIsLoadingTypeB(true);
        }
    }, [state.step, showTypeB]);

    const handleTypeBLoadingComplete = () => {
        setIsLoadingTypeB(false);
        setShowTypeB(true);
    };

    // Reset states when going back
    useEffect(() => {
        if (state.step <= 1) {
            setShowTypeA(false);
            setIsLoadingTypeA(false);
            setShowTypeB(false);
            setIsLoadingTypeB(false);
        }
        if (state.step <= 3) {
            setShowTypeB(false);
            setIsLoadingTypeB(false);
        }
    }, [state.step]);

    // Step 3: Type-A with loading
    if (state.step === 3) {
        if (isLoadingTypeA) {
            return <LoadingAnimation onComplete={handleTypeALoadingComplete} />;
        }
        if (showTypeA) {
            return (
                <div className="w-full flex flex-col items-center gap-6">
                    <CertificateResult />
                    <HandoffScreen />
                </div>
            );
        }
    }

    // Step 5: Gap analysis with loading
    if (state.step === 5) {
        if (isLoadingTypeB) {
            return <GapAnalysisAnimation onComplete={handleTypeBLoadingComplete} />;
        }
        if (showTypeB) {
            return <CertificateTypeB />;
        }
    }

    // Regular steps
    switch (state.step) {
        case 0:
            return <HomePage />;
        case 1:
            return <ProfileForm />;
        case 2:
            return <DiagnosisForm />;
        case 4:
            return <FriendAuditForm />;
        case 6:
            return <CertificateTypeB />;
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
