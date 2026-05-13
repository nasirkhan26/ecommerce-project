"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    src: "/showcase-img.jpg",
    label: "New Collection 2026",
    title: "Discover Your\nPerfect Style",
    sub: "Premium products curated just for you. Free shipping on orders over $50.",
    cta: { label: "Shop Now", href: "/shop" },
  },
  {
    src: "/showcase-img.jpg",
    label: "Limited Edition Deals",
    title: "Style That\nSpeaks Louder",
    sub: "Explore hand-picked items crafted with quality and elegance in mind.",
    cta: { label: "Explore Deals", href: "/shop" },
  },
  {
    src: "/showcase-img.jpg",
    label: "Exclusive Offers",
    title: "Elevate Your\nEveryday Look",
    sub: "Up to 40% off on selected items. Grab yours before it's gone.",
    cta: { label: "View Offers", href: "/shop" },
  },
];

const INTERVAL = 3000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setAnimating(false), 600);
    },
    [animating]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="relative w-full h-[90vh] overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.label}
            fill
            priority={i === 0}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Slide content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 gap-5">
            <p className="uppercase tracking-[0.35em] text-sm font-medium opacity-75 transition-all duration-500">
              {slide.label}
            </p>
            <h2
              className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg whitespace-pre-line"
              style={{ transition: "opacity 0.5s ease" }}
            >
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl max-w-xl opacity-85">{slide.sub}</p>
            <div className="flex gap-4 mt-2">
              <Link
                href={slide.cta.href}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transition-all"
              >
                {slide.cta.label}
              </Link>
              <Link
                href="/about"
                className="border border-white text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-white hover:text-black transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-11 h-11 rounded-full flex items-center justify-center transition-all"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-11 h-11 rounded-full flex items-center justify-center transition-all"
      >
        ›
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "28px" : "10px",
              height: "10px",
              backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>

      {/* ── Progress bar ── */}
      {!paused && (
        <div
          key={current}
          className="absolute bottom-0 left-0 h-[3px] bg-white z-10"
          style={{
            animation: `slideProgress ${INTERVAL}ms linear forwards`,
          }}
        />
      )}

      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
