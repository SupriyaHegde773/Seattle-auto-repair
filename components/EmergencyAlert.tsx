'use client';

import { Phone } from 'lucide-react';

export default function EmergencyAlert() {
    return (
        <div className="fixed top-24 left-0 right-0 z-40 pointer-events-none">
            <div className="container mx-auto px-4 flex justify-center">
                <div className="glass-panel pointer-events-auto rounded-full px-4 py-2 flex items-center justify-center space-x-3 animate-fade-in-down">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">
                        24/7 Emergency Service
                    </span>
                    <div className="h-4 w-px bg-slate-300" />
                    <a
                        href="tel:425-931-4095"
                        className="flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                    >
                        <Phone className="w-3 h-3 mr-1.5" />
                        (425) 931-4095
                    </a>
                </div>
            </div>
        </div>
    );
}
