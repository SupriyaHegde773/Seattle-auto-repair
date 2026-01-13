'use client';

import { Check } from 'lucide-react';

export default function InsuranceGlassPanel() {
    return (
        <section className="py-20 relative z-10">
            <div className="container mx-auto px-4">
                <div className="glass-panel rounded-3xl p-8 md:p-16 overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
                                Insurance Accepted & Preferred
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                We work with all major insurance providers to make your claim process seamless.
                                In many cases, your windshield replacement could cost you $0 out of pocket.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    "We handle all paperwork for you",
                                    "Direct billing to insurance companies",
                                    "Preferred provider for major carriers",
                                    "Verification of coverage before work begins"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="glass-button text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                                Verify My Coverage
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {['State Farm', 'Geico', 'Allstate', 'Progressive', 'Farmers', 'Liberty Mutual'].map((insurer, idx) => (
                                <div
                                    key={idx}
                                    className="glass-card rounded-xl p-6 flex items-center justify-center h-24 hover:bg-white/40 transition-colors"
                                >
                                    <span className="text-slate-500 font-bold text-lg">{insurer}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
