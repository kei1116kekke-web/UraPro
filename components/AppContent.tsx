"use client";

import { useFormContext } from "@/context/FormContext";
import ProfileForm from "@/components/ProfileForm";
import DiagnosisForm from "@/components/DiagnosisForm";
import CertificateResult from "@/components/CertificateResult";

function StepContent() {
    const { state } = useFormContext();

    switch (state.step) {
        case 1:
            return <ProfileForm />;
        case 2:
            return <DiagnosisForm />;
        case 3:
            return <CertificateResult />;
        default:
            return <ProfileForm />;
    }
}

export default function AppContent() {
    return (
        <div className="w-full flex items-center justify-center">
            <StepContent />
        </div>
    );
}
