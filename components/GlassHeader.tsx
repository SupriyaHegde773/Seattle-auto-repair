'use client';

import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function GlassHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled ? 'py-4' : 'py-6'
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div
                    className={clsx(
                        'glass-panel rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300',
                        isScrolled ? 'bg-white/20 backdrop-blur-xl' : 'bg-white/10 backdrop-blur-lg'
                    )}
                >
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                            S
                        </div>
                        <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent hidden sm:block">
                            Seattle Auto Glass LLC
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {['Services', 'Process', 'Reviews', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={(e) => {
                                    if (item === 'Process') {
                                        e.preventDefault();
                                        // Scroll to ~70% of the scrollable distance (Phase 3 center)
                                        // Total height 3.5vh, scrollable 2.5vh. 0.7 * 2.5 = 1.75vh
                                        window.scrollTo({ top: window.innerHeight * 1.75, behavior: 'smooth' });
                                    }
                                }}
                                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                            </a>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="tel:425-931-4095"
                            className="glass-button hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full text-white text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
                        >
                            <Phone className="w-4 h-4" />
                            <span>(425) 931-4095</span>
                        </a>

                        <button
                            className="md:hidden p-2 text-slate-700 hover:bg-white/20 rounded-full transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 p-4 md:hidden"
                    >
                        <div className="glass-panel rounded-2xl p-4 flex flex-col space-y-4 mx-4">
                            {['Services', 'Process', 'Reviews', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-lg font-medium text-slate-700 py-2 px-4 hover:bg-white/20 rounded-xl transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                            <a
                                href="tel:425-931-4095"
                                className="glass-button flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-white font-semibold"
                            >
                                <Phone className="w-5 h-5" />
                                <span>Call Now</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
