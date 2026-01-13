import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

export interface GlassScrollCanvasProps {
  /** Scroll progress value from framer-motion's useScroll (0 to 1) */
  scrollYProgress: MotionValue<number>;
  /** Total number of frames in the animation. Defaults to 240 */
  totalFrames?: number;
  /** Public folder path where frame images are stored. Defaults to '/images/glass-repair-site/arw2' */
  imageFolderPath?: string; // Defaults to '/frames'
  /** Prefix for the frame filename. Defaults to "ezgif-frame-" */
  framePrefix?: string;
  /** Image file extension (without leading dot). Defaults to 'jpg' */
  frameFileFormat?: string;
}

/**
 * GlassScrollCanvas – renders a scroll‑driven frame‑by‑frame animation on a high‑DPI canvas.
 *
 * The component preloads all frames on mount, maps the scroll progress (0‑1) to a frame
 * index, and draws the appropriate image onto a canvas that scales for devicePixelRatio.
 * It displays a simple loading indicator until all images are ready.
 */
export default function GlassScrollCanvas({
  scrollYProgress,
  totalFrames = 240,
  imageFolderPath = "/frames",
  framePrefix = "ezgif-frame-",
  frameFileFormat = "jpg",
}: GlassScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Preload images – stored in a ref for fast access and to avoid re‑creating the array on each render
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Build the list of image URLs once (memoised on totalFrames, folder, format)
  const imageUrls = useMemo(() => {
    const urls: string[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const paddedIndex = i.toString().padStart(3, "0");
      urls.push(
        `${imageFolderPath}/${framePrefix}${paddedIndex}.${frameFileFormat}`
      );
    }
    return urls;
  }, [totalFrames, imageFolderPath, framePrefix, frameFileFormat]);

  // Load all images
  useEffect(() => {
    console.log("Preloading images:", imageUrls.length);
    let cancelled = false;
    const loaded: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;
    imageUrls.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded[idx] = img;
        loadedCount++;
        if (loadedCount % 50 === 0)
          console.log(`Loaded ${loadedCount}/${totalFrames} frames`);
        if (loadedCount === totalFrames && !cancelled) {
          console.log("All frames loaded successfully");
          imagesRef.current = loaded;
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (!cancelled) {
          console.error("Failed to load frame:", src);
          setLoadError(`Failed to load frame ${idx + 1}: ${src}`);
        }
      };
    });
    return () => {
      cancelled = true;
    };
  }, [imageUrls, totalFrames]);

  // Resize handling – keep canvas size in sync with its displayed size and device pixel ratio
  // Use useLayoutEffect to prevent flicker and ensure size is ready before paint
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Only update if dimensions actually changed to avoid clearing canvas unnecessarily
      if (
        canvas.width !== rect.width * dpr ||
        canvas.height !== rect.height * dpr
      ) {
        console.log(
          "Resizing canvas to:",
          rect.width,
          rect.height,
          "DPR:",
          dpr
        );
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
          // If we have loaded images, re-render current frame
          if (isLoaded) {
            // We don't have easy access to 'latest' scroll pos here, but we can default to 0 or last known
            // For now just letting the next scroll event or initial render handle it
          }
        }
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);
    window.addEventListener("resize", updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [isLoaded]); // Added isLoaded dep to ensure we can re-render if needed

  // Render a specific frame onto the canvas
  const renderFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = imagesRef.current[frameIdx];

      if (!canvas || !ctx) {
        console.warn("Canvas or Context missing during render");
        return;
      }

      if (!img) {
        console.warn(`Image at index ${frameIdx} missing`);
        return;
      }

      if (!img.complete || img.naturalWidth === 0) {
        console.warn(`Image ${frameIdx} not fully loaded during render call`);
        return;
      }

      // Clear canvas (logical coords)
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Compute cover‑style scaling while preserving aspect ratio
      const hRatio = dimensions.width / img.width;
      const vRatio = dimensions.height / img.height;
      const scale = Math.max(hRatio, vRatio);

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const offsetX = (dimensions.width - drawWidth) / 2;
      const offsetY = (dimensions.height - drawHeight) / 2;

      // console.log(`Drawing frame ${frameIdx}:`, { drawWidth, drawHeight, offsetX, offsetY });
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [dimensions]
  );

  // Listen to scroll progress and schedule a frame render via requestAnimationFrame
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded || !dimensions.width) return;
    const frameIdx = Math.min(
      totalFrames - 1,
      Math.floor(latest * totalFrames)
    );
    requestAnimationFrame(() => renderFrame(frameIdx));
  });

  // Initial render once images are loaded and canvas size is known
  useEffect(() => {
    if (isLoaded && dimensions.width && dimensions.height) {
      console.log("Initial render of frame 0");
      requestAnimationFrame(() => renderFrame(0));
    }
  }, [isLoaded, dimensions, renderFrame]);

  // Loading / error UI
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900 text-white p-10 text-center">
        <p className="text-xl font-bold text-red-400 mb-4">
          Error Loading Animation
        </p>
        <code className="text-sm bg-black/50 p-4 rounded-lg break-all">
          {loadError}
        </code>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-slate-900 text-white p-10 text-center">
        <p className="text-2xl font-bold animate-pulse mb-4">
          Loading Experience...
        </p>
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite]" />
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ display: "block", background: "black" }}
    />
  );
}
