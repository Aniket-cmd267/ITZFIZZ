import React from 'react';
import { Headline } from './Headline';

interface RoadProps {
  roadRef: React.RefObject<HTMLDivElement | null>;
  carRef: React.RefObject<HTMLImageElement | null>;
  trailRef: React.RefObject<HTMLDivElement | null>;
  headlineContainerRef: React.RefObject<HTMLDivElement | null>;
  letterRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  isAccessibleMode?: boolean;
}

export const Road: React.FC<RoadProps> = ({
  roadRef,
  carRef,
  trailRef,
  headlineContainerRef,
  letterRefs,
  isAccessibleMode = false,
}) => {
  return (
    <div
      ref={roadRef}
      className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] bg-[#1e1e1e] overflow-hidden shadow-2xl border-y border-neutral-700/50"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/20 via-white/20 to-red-500/20 z-1 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/20 via-white/20 to-red-500/20 z-1 pointer-events-none" />

      <div
        ref={trailRef}
        className="absolute top-0 left-0 h-full bg-[#45db7d] z-[2] will-change-[width] pointer-events-none"
        style={{
          width: isAccessibleMode ? '100%' : '0px',
        }}
      />

      <Headline
        containerRef={headlineContainerRef}
        letterRefs={letterRefs}
        isAccessibleMode={isAccessibleMode}
      />

      <img
        ref={carRef}
        src="/assets/car.png"
        alt="Top-view McLaren 720S sports car"
        className="absolute top-0 left-0 h-full w-auto object-contain z-[10] select-none pointer-events-none will-change-transform filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
};
