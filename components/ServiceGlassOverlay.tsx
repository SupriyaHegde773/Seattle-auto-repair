"use client";

import { MotionValue, useTransform, motion } from "framer-motion";

interface ServiceGlassOverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function ServiceGlassOverlay({
  scrollYProgress,
}: ServiceGlassOverlayProps) {
  // Opacity transforms for different sections

  // Hero: Visible 0-20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);

  // Services: Visible 20-45%
  const opacity2 = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.4, 0.45],
    [0, 1, 1, 0]
  );

  // Process: Visible 45-75%
  const opacity3 = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.7, 0.75],
    [0, 1, 1, 0]
  );

  // Emergency: Visible 75-100%
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);

  // Remove Y transforms to prevent layout issues
  const y1 = 0;
  const y2 = 0;
  const y3 = 0;
  const y4 = 0;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="container mx-auto px-4 h-full relative">
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute top-1/2 left-0 -translate-y-1/2 w-full md:w-2/3 px-6 md:pl-20 pointer-events-auto"
        >
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-12 bg-blue-500"></div>
                <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">
                  Seattle&apos;s Finest
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter drop-shadow-2xl">
                QUEEN ANNE&apos;S <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">
                  WINDSHIELD
                </span>{" "}
                <br />
                SPECIALISTS
              </h1>

              <p className="text-xl md:text-2xl text-slate-200 font-light max-w-xl border-l-4 border-blue-500/50 pl-6 mt-8 backdrop-blur-sm">
                Fast. Invisible. Guaranteed. <br />
                <span className="text-white font-semibold">
                  Serving Seattle with Pride.
                </span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
