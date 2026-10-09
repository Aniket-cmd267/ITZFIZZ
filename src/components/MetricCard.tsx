import React, { forwardRef } from 'react';
import { MetricCardData } from '../types';

interface MetricCardProps {
  card: MetricCardData;
  className?: string;
  isAccessibleMode?: boolean;
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ card, className = '', isAccessibleMode = false }, ref) => {
    return (
      <div
        ref={ref}
        id={card.id}
        style={{
          backgroundColor: card.bgColor,
          color: card.textColor,
          opacity: isAccessibleMode ? 1 : 0,
          ...card.positionDesktop,
        }}
        className={`absolute z-20 flex flex-col justify-center items-start rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-7 shadow-lg pointer-events-auto select-none will-change-[transform,opacity] ${className}`}
      >
        <span className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[58px] leading-none tracking-tight font-sans">
          {card.number}
        </span>
        <span className="text-xs sm:text-sm md:text-base font-medium mt-1.5 md:mt-2 max-w-[200px] leading-snug">
          {card.label}
        </span>
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';
