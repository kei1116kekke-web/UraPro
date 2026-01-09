"use client";

import { X } from "lucide-react";

interface PolicyModalProps {
    type: 'terms' | 'privacy';
    onClose: () => void;
}

export default function PolicyModal({ type, onClose }: PolicyModalProps) {
    const isTerms = type === 'terms';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-tech-blue text-white p-4 md:p-6 flex justify-between items-center border-b-4 border-blue-700">
                    <div>
                        <h2 className="text-xl md:text-2xl font-serif font-bold">
                            {isTerms ? '利用規約' : 'プライバシーポリシー'}
                        </h2>
                        <p className="text-xs md:text-sm text-blue-100 mt-1">
                            {isTerms ? 'Terms of Service' : 'Privacy Policy'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                        aria-label="閉じる"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-120px)] text-sm md:text-base leading-relaxed">
                    {isTerms ? (
                        <div className="space-y-6">
                            <section>
                                <h3 className="font-bold text-tech-blue mb-3 text-lg">第1条（本サービスについて）</h3>
                                <p className="text-gray-700">
                                    本サービス「裏プロ（UraPro）」は、架空の行政機関「裏プロフィール発行局」が運営する<strong>エンターテインメント診断サービス</strong>です。診断結果は娯楽目的でのみご利用いただけます。
                                </p>
                            </section>

                            <section>
                                <h3 className="font-bold text-tech-blue mb-3 text-lg">第2条（診断結果の取り扱い）</h3>
                                <p className="text-gray-700 mb-2">
                                    診断結果は、心理学的根拠に基づいた分析を行っておりますが、<strong>実際の恋愛適性や性格を保証するものではありません</strong>。
                                </p>
                                <p className="text-gray-700">
                                    診断結果を基にした行動によって生じたいかなる損害についても、当局（架空）は一切の責任を負いません。
                                </p>
                            </section>

                            <section>
                                <h3 className="font-bold text-tech-blue mb-3 text-lg">第3条（禁止事項）</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>虚偽の情報を入力する行為</li>
                                    <li>診断結果を悪用し、他者を誹謗中傷する行為</li>
                                    <li>本サービスを実在の公的機関と誤認させる行為</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="font-bold text-tech-blue mb-3 text-lg">第4条（免責事項）</h3>
                                <p className="text-gray-700">
                                    本サービスは「現状有姿」で提供され、診断結果の正確性、完全性、有用性について一切保証いたしません。
                                </p>
                            </section>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                                <p className="text-sm text-yellow-800">
                                    <strong>重要:</strong> 本サービスはジョークサイトです。真剣にお悩みの方は、専門のカウンセラーにご相談ください。
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <section>
                                <h3 className="font-bold text-tech-blue mb-3 text-lg">1. 個人情報の収集について</h3>
                                <p className="text-gray-700">
                                    本サービスでは、診断結果の出力のみを目的として、以下の情報を一時的に取得します：
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2 ml-4">
                                    <li>氏名（ニックネーム可）</li>
                                    <li>年齢</li>
                                    <li>職業</li>
                                    <li>診断の回答データ</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="font-bold text-tech-blue mb-3 text-lg">2. データの保存について</h3>
                                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                                    <p className="text-gray-800 font-medium">
                                        入力された個人データ及び回答データは、診断結果の出力のみに使用され、<strong className="text-tech-blue">ブラウザを閉じた瞬間に電子の海へ廃棄されます</strong>。
                                    </p>
                                    <p className="text-gray-700 mt-2 text-sm">
                                        国家（架空）による監視は行われません。サーバーへのデータ送信も行いません。
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h3 className="font-bold text-tech-blue mb-3 text-lg">3. Cookieの使用</h3>
                                <p className="text-gray-700">
                                    本サービスは、診断の進行状態を一時的に保持するため、ブラウザのローカルストレージを使用する場合があります。個人を特定する情報は含まれません。
                                </p>
                            </section>

                            <section>
                                <h3 className="font-bold text-tech-blue mb-3 text-lg">4. 第三者への提供</h3>
                                <p className="text-gray-700">
                                    <strong>当局（架空）は、利用者の個人情報を第三者に提供、開示することは一切ありません。</strong>
                                </p>
                            </section>

                            <section>
                                <h3 className="font-bold text-tech-blue mb-3 text-lg">5. 安全管理措置</h3>
                                <p className="text-gray-700">
                                    本サービスはクライアントサイドで完結し、入力データはブラウザ内でのみ処理されます。外部サーバーへの送信は行われません。
                                </p>
                            </section>

                            <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-6">
                                <p className="text-sm text-green-800">
                                    <strong>安心してご利用ください:</strong> あなたのデータは完全にローカルで処理され、外部に送信されることはありません。
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-tech-blue hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg transition-colors"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
}
