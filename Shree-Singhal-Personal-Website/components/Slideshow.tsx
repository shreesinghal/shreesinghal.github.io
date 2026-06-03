'use client';

import { useEffect, useRef, useState } from 'react';

export type SlideshowImage = {
  src: string;
  alt: string;
  caption?: string;
};

const isVideo = (src: string) => /\.(mp4|webm|mov|ogv)$/i.test(src);

export default function Slideshow({
  images,
  autoAdvanceMs = 6000,
}: {
  images: SlideshowImage[];
  autoAdvanceMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Pause any video that is no longer the active slide.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [index]);

  useEffect(() => {
    if (paused || images.length <= 1 || !autoAdvanceMs) return;
    // Don't auto-advance away from a video — let the viewer watch it.
    if (isVideo(images[index].src)) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      autoAdvanceMs,
    );
    return () => clearInterval(t);
  }, [paused, autoAdvanceMs, images, index]);

  if (images.length === 0) return null;
  const current = images[index];

  const go = (next: number) =>
    setIndex(((next % images.length) + images.length) % images.length);

  return (
    <div
      className="relative mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-accent-soft/40 ring-1 ring-rule">
        {images.map((item, i) => {
          const activeClass = i === index ? 'opacity-100' : 'opacity-0 pointer-events-none';
          if (isVideo(item.src)) {
            return (
              <video
                key={i}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={item.src}
                controls
                preload="metadata"
                playsInline
                aria-label={item.alt}
                aria-hidden={i !== index}
                onEnded={() => i === index && go(index + 1)}
                className={`absolute inset-0 h-full w-full bg-black object-contain transition-opacity duration-700 ${activeClass}`}
              />
            );
          }
          return (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src={item.src}
              alt={item.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              aria-hidden={i !== index}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeClass}`}
            />
          );
        })}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-bg/80 px-3 py-1.5 text-base text-ink shadow-sm ring-1 ring-rule transition-colors hover:bg-bg hover:text-accent"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-bg/80 px-3 py-1.5 text-base text-ink shadow-sm ring-1 ring-rule transition-colors hover:bg-bg hover:text-accent"
            >
              <span aria-hidden="true">→</span>
            </button>
          </>
        )}
      </div>

      {current.caption && (
        <p className="mt-3 text-center font-serif text-sm italic text-ink-muted">
          {current.caption}
        </p>
      )}

      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? 'bg-accent' : 'bg-rule hover:bg-ink-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
