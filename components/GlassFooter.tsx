'use client';

import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function GlassFooter() {
    return (
        <footer className="relative z-10 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="glass-panel rounded-3xl p-12 mb-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Brand */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                                    S
                                </div>
                                <span className="text-xl font-bold text-slate-800">
                                    Seattle Auto Glass LLC
                                </span>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Queen Anne's Windshield Chip Repair Specialists.
                                Fast, invisible, and guaranteed repairs serving Seattle with pride.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold text-slate-800 mb-6">Quick Links</h4>
                            <ul className="space-y-4">
                                {['Services', 'Process', 'Insurance', 'Reviews', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a href={`#${item.toLowerCase()}`} className="text-slate-600 hover:text-blue-600 transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-bold text-slate-800 mb-6">Contact Us</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start space-x-3 text-slate-600">
                                    <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <a href="tel:425-931-4095" className="hover:text-blue-600">(425) 931-4095</a>
                                </li>
                                <li className="flex items-start space-x-3 text-slate-600">
                                    <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <a href="mailto:info@seattleautoglassllc.com" className="hover:text-blue-600">info@seattleautoglassllc.com</a>
                                </li>
                                <li className="flex items-start space-x-3 text-slate-600">
                                    <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <span>Queen Anne, Seattle, WA</span>
                                </li>
                            </ul>
                        </div>

                        {/* Hours */}
                        <div>
                            <h4 className="font-bold text-slate-800 mb-6">Hours</h4>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex justify-between">
                                    <span>Mon - Fri</span>
                                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Saturday</span>
                                    <span className="font-medium">9:00 AM - 4:00 PM</span>
                                </li>
                                <li className="flex justify-between text-red-500 font-bold">
                                    <span>Emergency</span>
                                    <span>24/7 Available</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} Seattle Auto Glass LLC. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="text-slate-400 hover:text-blue-500 transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
