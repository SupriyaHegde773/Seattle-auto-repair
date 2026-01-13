"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import GlassHeader from "@/components/GlassHeader";
import EmergencyAlert from "@/components/EmergencyAlert";
import GlassScrollCanvas from "@/components/GlassScrollCanvas";
import ServiceGlassOverlay from "@/components/ServiceGlassOverlay";
import GlassServiceGrid from "@/components/GlassServiceGrid";
import InsuranceGlassPanel from "@/components/InsuranceGlassPanel";
import TestimonialGlassCards from "@/components/TestimonialGlassCards";
import ContactGlassForm from "@/components/ContactGlassForm";
import GlassFooter from "@/components/GlassFooter";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ccfbf1] via-[#e0f2fe] to-[#f3e8ff] relative text-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-teal-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="absolute top-1/2 -left-40 w-[800px] h-[800px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 right-1/2 w-[800px] h-[800px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <GlassHeader />
      <EmergencyAlert />

      {/* Main Scroll Section */}
      <section ref={containerRef} className="h-[500vh] relative z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <GlassScrollCanvas
              scrollYProgress={scrollYProgress}
              totalFrames={240}
              imageFolderPath="/frames"
            />
          </div>
          <ServiceGlassOverlay scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* Post-Scroll Content with Glass Effects */}
      <div className="relative z-20 px-4 md:px-8 lg:px-16 py-20 -mt-40 bg-gradient-to-b from-transparent to-white">
        <GlassServiceGrid />
        <InsuranceGlassPanel />
        <TestimonialGlassCards />
        <ContactGlassForm />
        <GlassFooter />
      </div>
    </main>
  );
}
