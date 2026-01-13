"use client";

import { Send } from "lucide-react";

export default function ContactGlassForm() {
  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              Get a Free Quote
            </h2>
            <p className="text-slate-600">
              Fill out the form below and well get back to you within 15
              minutes.
            </p>
          </div>

          <form className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Vehicle Year, Make, Model
              </label>
              <input
                type="text"
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. 2020 Tesla Model 3"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Service Needed
              </label>
              <select className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                <option>Windshield Replacement</option>
                <option>Chip Repair</option>
                <option>Side/Back Glass</option>
                <option>Calibration Only</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Additional Details
              </label>
              <textarea
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32 resize-none"
                placeholder="Tell us about the damage..."
              />
            </div>
            <div className="md:col-span-2">
              <button className="w-full glass-button text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform">
                <span>Request Free Quote</span>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
