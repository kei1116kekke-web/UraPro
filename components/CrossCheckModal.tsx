"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CrossCheckModalProps {
    myId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function CrossCheckModal({ myId, isOpen, onClose }: CrossCheckModalProps) {
    const [partnerIdInput, setPartnerIdInput] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (partnerIdInput.trim()) {
            router.push(`/cross-check?id1=${myId}&id2=${partnerIdInput.trim()}`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-purple-900 mb-4">
                    💑 パートナーとの相性診断
                </h2>

                <p className="text-sm text-gray-600 mb-6">
                    パートナーのIDを入力して、関係性リスクを分析しましょう
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            あなたのID
                        </label>
                        <div className="bg-gray-100 p-3 rounded-lg font-mono text-lg font-bold text-blue-600">
                            {myId}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            パートナーのID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={partnerIdInput}
                            onChange={(e) => setPartnerIdInput(e.target.value.toUpperCase())}
                            placeholder="UP-26-XXXX"
                            className="w-full p-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none font-mono text-lg text-gray-900"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md"
                    >
                        相性診断を開始
                    </button>
                </form>
            </div>
        </div>
    );
}
