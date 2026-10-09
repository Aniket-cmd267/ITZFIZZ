import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Road } from './Road';
import { MetricCard } from './MetricCard';
import { METRIC_CARDS } from '../data/metricCards';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  isAccessibleMode?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isAccessibleMode = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const headlineContainerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const trackEl = trackRef.current;
    const roadEl = roadRef.current;
    const carEl = carRef.current;
    const trailEl = trailRef.current;
    const headlineEl = headlineContainerRef.current;

    if (!sectionEl || !trackEl || !roadEl || !carEl || !trailEl || !headlineEl) return;

    if (isAccessibleMode) {
      trailEl.style.width = '100%';
      letterRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
      cardRefs.current.forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }
      });
      const endX = Math.max(100, (roadEl.clientWidth || window.innerWidth) - 140);
      gsap.set(carEl, { x: endX });
      return;
    }

    const ctx = gsap.context(() => {
      let letterOffsets: number[] = [];
      let endX = 1000;
      let roadWidth = 1440;

      const measure = () => {
        roadWidth = roadEl.clientWidth || window.innerWidth;
        endX = Math.max(100, roadWidth - 140);

        const roadRect = roadEl.getBoundingClientRect();
        const roadLeft = roadRect.left;
        letterOffsets = letterRefs.current.map((letter) => {
          if (!letter) return 0;
          const rect = letter.getBoundingClientRect();
          return rect.left - roadLeft;
        });
      };

      measure();

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const p = scrollTl.progress();
          const currentX = p * endX;
          const carFrontX = currentX + 220;

          gsap.set(carEl, { x: currentX });

          if (p <= 0.005) {
            trailEl.style.width = '0px';
          } else if (p >= 0.95) {
            trailEl.style.width = `${roadWidth}px`;
          } else {
            trailEl.style.width = `${Math.min(roadWidth, Math.max(0, currentX + 180))}px`;
          }

          letterRefs.current.forEach((letter, i) => {
            if (!letter) return;
            const letterX = letterOffsets[i];
            if (p >= 0.94 || (p > 0.005 && carFrontX >= letterX)) {
              letter.style.opacity = '1';
            } else {
              letter.style.opacity = '0';
            }
          });
        },
      });

      scrollTl.to({}, { duration: 1 });

      if (cardRefs.current[0]) {
        scrollTl.fromTo(
          cardRefs.current[0],
          { opacity: 0, y: 30, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: 'power1.out', duration: 0.08 },
          0.12
        );
      }

      if (cardRefs.current[1]) {
        scrollTl.fromTo(
          cardRefs.current[1],
          { opacity: 0, y: -30, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: 'power1.out', duration: 0.08 },
          0.36
        );
      }

      if (cardRefs.current[2]) {
        scrollTl.fromTo(
          cardRefs.current[2],
          { opacity: 0, y: 30, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: 'power1.out', duration: 0.08 },
          0.60
        );
      }

      if (cardRefs.current[3]) {
        scrollTl.fromTo(
          cardRefs.current[3],
          { opacity: 0, y: -30, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: 'power1.out', duration: 0.08 },
          0.84
        );
      }

      if (!carEl.complete) {
        carEl.onload = () => {
          measure();
          ScrollTrigger.refresh();
        };
      }

      const handleResize = () => {
        measure();
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, [isAccessibleMode]);

  return (
    <section
      ref={sectionRef}
      id="hero-experience"
      className="relative w-full h-[320vh] bg-[#121212] select-none"
    >
      <div
        ref={trackRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#d1d1d1]"
      >
        {METRIC_CARDS.map((card, index) => (
          <MetricCard
            key={card.id}
            card={card}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            isAccessibleMode={isAccessibleMode}
          />
        ))}

        <Road
          roadRef={roadRef}
          carRef={carRef}
          trailRef={trailRef}
          headlineContainerRef={headlineContainerRef}
          letterRefs={letterRefs}
          isAccessibleMode={isAccessibleMode}
        />
      </div>
    </section>
  );
};
