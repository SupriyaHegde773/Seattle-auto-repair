'use client';

import { Shield, Wrench, Car, Zap, CheckCircle, Smartphone } from 'lucide-react';

const services = [
    {
        title: "Windshield Chip Repair",
        desc: "Fast, invisible repairs for stone chips. Prevents spreading and restores structural integrity.",
        features: ["Stops Spreading", "30 Min Service", "Lifetime Warranty"],
        icon: Shield
    },
    {
        title: "Windshield Replacement",
        desc: "Complete replacement for severe damage using OEM quality glass and certified technicians.",
        features: ["OEM Quality Glass", "Certified Techs", "Safety Verified"],
        icon: Wrench
    },
    {
        title: "Mobile Service",
        desc: "We come to you in Queen Anne and greater Seattle. Home or office service available.",
        features: ["We Come to You", "No Extra Fee", "Fully Equipped"],
        icon: Car
    },
    {
        title: "Insurance Claims",
        desc: "We work with all major insurance providers to handle the paperwork and billing for you.",
        features: ["Direct Billing", "All Providers", "Hassle Free"],
        icon: Zap
    },
    {
        title: "DIY vs Pro Advice",
        desc: "Honest advice on when a DIY kit might work vs when you need a professional repair.",
        features: ["Expert Consultation", "Safety First", "Cost Analysis"],
        icon: Smartphone
    },
    {
        title: "Free Estimates",
        desc: "Get a hassle-free over-the-phone estimate for your repair or replacement needs.",
        features: ["Instant Quote", "Transparent Pricing", "No Hidden Fees"],
        icon: CheckCircle
    }
];

export default function GlassServiceGrid() {
    return (
        <section id="services" className="py-20 relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-slate-800">Premium Auto Glass Services</h2>
                    <p className="text-lg text-slate-600">
                        Combining expert craftsmanship with modern technology to keep you safe on the road.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 group"
                        >
                            <div className="relative w-20 h-20 mb-6">
                                <div className="w-full h-full rounded-full overflow-hidden border border-blue-400/80 shadow-lg group-hover:scale-110 transition-transform">
                                    <img
                                        src="/images/chipped-glass.png"
                                        alt="Service Image"
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity scale-125"
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <service.icon className="w-10 h-10 text-blue-700 drop-shadow-md group-hover:scale-110 transition-transform" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-slate-800">{service.title}</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {service.desc}
                            </p>

                            <ul className="space-y-2">
                                {service.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center text-sm text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
