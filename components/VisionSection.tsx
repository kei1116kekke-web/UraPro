"use client";

import { useFormContext } from "@/context/FormContext";
import Image from "next/image";

export default function VisionSection() {
    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left: Message */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-tech-blue">
                            UraProの理念：<br />脱・加工社会
                        </h2>

                        <div className="space-y-4 text-dark-gray leading-relaxed">
                            <p>
                                マッチングアプリの普及で、出会いは簡単になりました。しかし、同時に『加工』も簡単になりました。
                            </p>
                            <p>
                                身長、年収、そして性格までもが盛られる時代。
                            </p>
                            <p>
                                私たちは考えました。<strong>『最初から互いのダメな部分（裏）を知っていれば、もっと恋愛は楽になるのではないか』</strong>と。
                            </p>
                            <p>
                                UraProは、あなたを批判するためのものではありません。あなたの愛すべき欠点を証明し、それを許容してくれる<strong className="text-tech-blue">『真のパートナー』</strong>と巡り合うための、公的なパスポートなのです。
                            </p>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src="/vision-couple.jpg"
                            alt="飾らない日常の男女"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
