'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface GlassRepairCanvasProps {
    scrollYProgress: MotionValue<number>;
}

export default function GlassRepairCanvas({ scrollYProgress }: GlassRepairCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imageCount = 150;

            const promises = Array.from({ length: imageCount }, (_, i) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `/images/glass-sequence/${i + 1}.jpg`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        // Fallback or skip
                        resolve();
                    }
                });
            });

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Draw frame based on scroll
    useEffect(() => {
        if (!isLoaded || images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = (progress: number) => {
            // Map 0-1 progress to 0-(totalFrames-1)
            const frameIndex = Math.min(
                images.length - 1,
                Math.max(0, Math.floor(progress * (images.length - 1)))
            );

            const img = images[frameIndex];
            if (!img) return;

            // Maintain aspect ratio cover
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Subscribe to scroll changes
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            requestAnimationFrame(() => render(latest));
        });

        // Initial render
        render(scrollYProgress.get());

        return () => unsubscribe();
    }, [isLoaded, images, scrollYProgress]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Trigger re-render if needed by forcing update or relying on scroll event
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
        />
    );
}
