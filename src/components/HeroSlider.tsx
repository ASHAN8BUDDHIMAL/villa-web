'use client'

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  autoScroll: boolean;
  scrollInterval: number;
};

const FALLBACK = "https://placehold.co/1920x1080/2a2018/9a7a4a?text=Villa+Galle";

export default function HeroSlider({ images, autoScroll, scrollInterval }: Props) {
  const slides = images.length > 0 ? images : [FALLBACK];
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx(i => (i - 1 + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % slides.length), [slides.length]);

  useEffect(() => {
    if (!autoScroll || slides.length < 2) return;
    const t = setInterval(next, scrollInterval * 1000);
    return () => clearInterval(t);
  }, [autoScroll, scrollInterval, next, slides.length]);

  return (
    <div className="absolute inset-0 bg-stone-900 overflow-hidden">
      {slides.map((src, i) => (
        <div
          key={src + i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={`Hero slide ${i + 1}`}
            fill
            sizes="100vw"
            className={`object-cover transition-transform duration-[8000ms] ease-out ${i === idx ? "scale-110" : "scale-100"}`}
            priority={i === 0}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-all duration-500 text-xl backdrop-blur-sm"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-all duration-500 text-xl backdrop-blur-sm"
          >
            ›
          </button>
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-500 rounded-full ${i === idx ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
