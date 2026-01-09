"use client";

import { QRCodeCanvas } from "qrcode.react";
import { Share2 } from "lucide-react";

interface SNSShareButtonProps {
    myId: string;
    userName: string;
    mainTitle?: string;
}

export default function SNSShareButton({ myId, userName, mainTitle }: SNSShareButtonProps) {
    const handleGenerateSNSImage = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Instagram Story size (9:16)
        canvas.width = 1080;
        canvas.height = 1920;

        // Background - Classified File Design
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // RED STRIPES (Classified)
        ctx.fillStyle = '#dc2626';
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(0, i * 60, canvas.width, 40);
            ctx.fillRect(0, canvas.height - (i + 1) * 60, canvas.width, 40);
        }

        // TOP SECRET Watermark
        ctx.save();
        ctx.globalAlpha = 0.05;
        ctx.font = 'bold 200px serif';
        ctx.fillStyle = '#ff0000';
        ctx.textAlign = 'center';
        ctx.fillText('TOP SECRET', canvas.width / 2, 400);
        ctx.fillText('極秘', canvas.width / 2, 1500);
        ctx.restore();

        // Title
        ctx.font = 'bold 80px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('裏プロフィール証明書', canvas.width / 2, 380);

        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#ef4444';
        ctx.fillText('CLASSIFIED PERSONALITY REPORT', canvas.width / 2, 450);

        // Border
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 8;
        ctx.strokeRect(80, 520, canvas.width - 160, 900);

        // Name
        ctx.font = 'bold 90px serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(userName, canvas.width / 2, 680);

        // ID
        ctx.font = 'bold 60px monospace';
        ctx.fillStyle = '#10b981';
        ctx.fillText(`ID: ${myId}`, canvas.width / 2, 800);

        // Main Title (if exists)
        if (mainTitle) {
            ctx.font = 'bold 55px sans-serif';
            ctx.fillStyle = '#fbbf24';
            ctx.fillText(`称号: ${mainTitle}`, canvas.width / 2, 920);
        }

        // QR Code
        const qrContainer = document.createElement('div');
        qrContainer.style.position = 'absolute';
        qrContainer.style.left = '-9999px';
        document.body.appendChild(qrContainer);

        const qrSize = 280;
        const qrCanvas = document.createElement('canvas');
        const qrCtx = qrCanvas.getContext('2d');

        // Create QR code using canvas directly
        await new Promise<void>((resolve) => {
            const QRCode = require('qrcode');
            QRCode.toCanvas(qrCanvas, 'https://urapro.pages.dev', {
                width: qrSize,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            }, () => {
                ctx.drawImage(qrCanvas, (canvas.width - qrSize) / 2, 1000);
                document.body.removeChild(qrContainer);
                resolve();
            });
        });

        // QR Code Label
        ctx.font = '35px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('診断はこちらから', canvas.width / 2, 1350);
        ctx.fillText('urapro.pages.dev', canvas.width / 2, 1400);

        // Footer
        ctx.font = '32px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('あなたの真の性格を暴露', canvas.width / 2, 1650);
        ctx.font = 'bold 40px sans-serif';
        ctx.fillStyle = '#ef4444';
        ctx.fillText('完全無料 | 5分で完了', canvas.width / 2, 1720);

        // Download
        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `裏プロ証明書_SNSシェア_${userName}.png`;
                link.click();
                URL.revokeObjectURL(url);
            }
        }, 'image/png');
    };

    return (
        <button
            onClick={handleGenerateSNSImage}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-lg"
        >
            <Share2 className="w-5 h-5" />
            SNSシェア用画像
        </button>
    );
}
