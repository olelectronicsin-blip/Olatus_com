import React, { useEffect, useMemo, useRef, useState } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from '@react-spring/web';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type ProductSlide = {
  src: string;
  title: string;
  description: string;
  href?: string;
};

type ProductCarouselProps = {
  items?: ProductSlide[];
  autoPlay?: boolean;
  intervalMs?: number;
  height?: number | string;
  offsetRadius?: number;
};

const DEFAULT_SLIDES: ProductSlide[] = [
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    title: 'Embedded Systems',
    description: 'High‑performance firmware and hardware integration.'
  },
  {
    src: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop',
    title: 'PCB Design',
    description: 'Production‑ready boards with precision routing.'
  },
  {
    src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
    title: 'AI Vision',
    description: 'On‑device intelligence for smart products.'
  },
  {
    src: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    title: 'IoT Solutions',
    description: 'Secure, scalable connectivity at the edge.'
  }
];

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  items = DEFAULT_SLIDES,
  autoPlay = true,
  intervalMs = 3000,
  height = 420,
  offsetRadius = 2,
}) => {
  const [goToSlide, setGoToSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pause autoplay for 8 seconds
  const pauseAutoplay = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  type CarouselSlide = { key: number | string; content: React.ReactNode; onClick?: () => void };
  const slides: CarouselSlide[] = useMemo(() => (
    items.map((item, idx) => ({
      key: idx,
      content: (
        <div className="group relative w-full h-full select-none">
          <a href={item.href || '#'} className="block w-full h-full">
            <div className="relative w-full h-full overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/40 to-slate-900/20 shadow-[0_10px_40px_rgba(34,211,238,0.15)] transition-transform duration-500 will-change-transform group-hover:scale-[1.03]">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
                draggable={false}
                loading="lazy"
              />
              {/* Overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent">
                <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow-sm">{item.title}</h3>
                <p className="text-cyan-200/90 text-sm md:text-base mt-1 max-w-[32ch]">{item.description}</p>
              </div>
              {/* Soft glow ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-cyan-400/20" aria-hidden="true" />
            </div>
          </a>
          {/* Reflection */}
          <div className="absolute -bottom-16 left-0 right-0 h-16 opacity-35 scale-y-[-1] overflow-hidden rounded-b-2xl" style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}>
            <img src={item.src} alt="" className="w-full h-full object-cover" draggable={false} loading="lazy" />
          </div>
        </div>
      ),
      onClick: () => setGoToSlide(idx),
    }))
  ), [items]);

  // Autoplay with pause support
  useEffect(() => {
    if (!autoPlay || items.length <= 1 || isPaused) return;
    const id = setInterval(() => {
      setGoToSlide((s) => (s + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, items.length, isPaused]);

  // Swipe handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    if (startX == null) return;
    const endX = e.changedTouches[0]?.clientX ?? startX;
    const dx = endX - startX;
    const threshold = 40; // px
    if (Math.abs(dx) > threshold) {
      if (dx < 0) {
        setGoToSlide((s) => (s + 1) % items.length);
      } else {
        setGoToSlide((s) => (s - 1 + items.length) % items.length);
      }
    }
    touchStartX.current = null;
  };

  const prev = () => {
    pauseAutoplay();
    setGoToSlide((s) => (s - 1 + items.length) % items.length);
  };
  const next = () => {
    pauseAutoplay();
    setGoToSlide((s) => (s + 1) % items.length);
  };

  // Ensure offsetRadius never exceeds what the slides can support
  const effectiveOffset = Math.max(1, Math.min(offsetRadius, Math.floor((items.length - 1) / 2)));

  // Custom offset function to make sure both left (previous) and right (next)
  // slides are clearly visible with consistent spacing and 3D rotation.
  const offsetFn = useMemo(() => {
    const h = typeof height === 'number' ? height : 420;
    const GAP = Math.max(160, Math.min(320, Number(h) * 0.60)); // px separation between cards
    const ROT = 26; // deg rotation for side slides
    const YSHIFT = -Math.max(100, Math.min(200, Number(h) * 0.50)); // raise cards more so arrows align perfectly with center
    return (offsetFromCenter: number) => {
      const abs = Math.abs(offsetFromCenter);
      const scale = 1 - Math.min(0.12, abs * 0.08);
      const translate = offsetFromCenter * GAP; // positive => right, negative => left
      return {
        left: '50%',
        transform: `translateX(-50%) translateY(${YSHIFT}px) translateX(${translate}px) rotateY(${-offsetFromCenter * ROT}deg) scale(${scale})`,
        opacity: 1 - Math.min(0.45, abs * 0.22),
      };
    };
  }, [height]);

  return (
    <div
      className="relative mx-auto overflow-visible"
      style={{ height, perspective: '1200px' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={() => {
        // Optional: resume immediately on mouse leave, or let the 8s timer finish
      }}
    >
      <div className="relative h-full">
        <Carousel
          slides={slides}
          goToSlide={goToSlide}
          offsetRadius={effectiveOffset}
          showNavigation={false}
          animationConfig={config.gentle}
          offsetFn={offsetFn}
        />
      </div>

      {/* Custom arrows */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="p-2 rounded-full bg-slate-900/60 border border-cyan-400/30 text-cyan-200 hover:bg-slate-900/80 hover:scale-105 transition shadow-[0_4px_20px_rgba(34,211,238,0.25)]"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <button
          aria-label="Next slide"
          onClick={next}
          className="p-2 rounded-full bg-slate-900/60 border border-cyan-400/30 text-cyan-200 hover:bg-slate-900/80 hover:scale-105 transition shadow-[0_4px_20px_rgba(34,211,238,0.25)]"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setGoToSlide(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${goToSlide === i ? 'w-6 bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.8)]' : 'w-2.5 bg-cyan-400/40 hover:bg-cyan-400/60'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
