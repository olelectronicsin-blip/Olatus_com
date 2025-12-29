import React, { useEffect, useMemo, useState } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { config } from '@react-spring/web';

export type CarouselItem = {
  src: string;
  alt?: string;
  href?: string;
};

type ImageCarousel3DProps = {
  items?: CarouselItem[];
  autoPlay?: boolean;
  intervalMs?: number;
  width?: number | string;
  height?: number | string;
  offsetRadius?: number; // number of visible cards left/right
};

const DEFAULT_ITEMS: CarouselItem[] = [
  { src: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop', alt: 'PCB Design', href: '#' },
  { src: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop', alt: 'Embedded Systems', href: '#' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop', alt: 'IoT Solutions', href: '#' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop', alt: 'Robotics', href: '#' },
  { src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop', alt: 'AI Vision', href: '#' },
];

const ImageCarousel3D: React.FC<ImageCarousel3DProps> = ({
  items = DEFAULT_ITEMS,
  autoPlay = true,
  intervalMs = 2500,
  width = '100%',
  height = 420,
  offsetRadius = 2,
}) => {
  const [goToSlide, setGoToSlide] = useState(0);

  // Map items to slides expected by the library
  type CarouselSlide = { key: string | number; content: React.ReactNode; onClick?: () => void };
  const slides: CarouselSlide[] = useMemo(() => (
    items.map((item, idx) => ({
      key: idx,
      content: (
        <div className="w-full h-full select-none">
          <a href={item.href || '#'}>
            <img
              src={item.src}
              alt={item.alt || `Slide ${idx + 1}`}
              className="w-full h-full object-cover rounded-xl shadow-[0_10px_40px_rgba(34,211,238,0.25)] border border-cyan-500/30"
              draggable={false}
              loading="lazy"
            />
          </a>
        </div>
      ),
      onClick: () => setGoToSlide(idx),
    }))
  ), [items]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const id = setInterval(() => {
      setGoToSlide((s) => (s + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, items.length]);

  return (
    <div
      className="relative"
      style={{
        width,
        height,
        perspective: '1200px',
      }}
    >
      <Carousel
        slides={slides}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={true}
        animationConfig={config.gentle}
      />

      {/* Navigation */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setGoToSlide(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${goToSlide === i ? 'w-6 bg-cyan-400' : 'w-2.5 bg-cyan-400/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel3D;
