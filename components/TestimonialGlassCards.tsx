'use client';

import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Mitchell",
        role: "Tesla Model Y Owner",
        content: "The mobile service was a lifesaver. They came to my office and replaced the windshield in under an hour. The glass quality looks identical to the original.",
        rating: 5
    },
    {
        name: "James Wilson",
        role: "Fleet Manager",
        content: "We use Seattle Auto Glass for our entire delivery fleet. Their response time is incredible, and the pricing is very transparent. Highly recommended.",
        rating: 5
    },
    {
        name: "Emily Chen",
        role: "BMW X5 Owner",
        content: "I was worried about the HUD and sensors, but their calibration was perfect. Everything works exactly as it did before the crack.",
        rating: 5
    }
];

export default function TestimonialGlassCards() {
    return (
        <section id="reviews" className="py-20 relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-slate-800">Trusted by Seattle Drivers</h2>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-current" />
                            ))}
                        </div>
                        <span className="text-xl font-bold text-slate-700">5.0/5 Average Rating</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="glass-card rounded-2xl p-8 relative hover:-translate-y-2 transition-transform duration-300"
                        >
                            <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-100 rotate-180" />

                            <div className="flex text-yellow-400 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-slate-600 mb-6 italic leading-relaxed relative z-10">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center text-white font-bold">
                                    {testimonial.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
