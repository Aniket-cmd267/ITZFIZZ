import React, { forwardRef } from 'react';

interface HeadlineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  letterRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  isAccessibleMode?: boolean;
}

const HEADLINE_TEXT = 'WELCOME ITZFIZZ';

export const Headline = forwardRef<HTMLDivElement, HeadlineProps>(
  ({ containerRef, letterRefs, isAccessibleMode = false }, _) => {
    const characters = HEADLINE_TEXT.split('');

    return (
      <div
        ref={containerRef}
        className="absolute left-[3%] sm:left-[5%] top-1/2 -translate-y-1/2 z-5 flex items-center select-none pointer-events-none whitespace-nowrap"
        aria-label="WELCOME ITZFIZZ"
      >
        <h1 className="flex items-center text-[clamp(2.5rem,7.5vw,8rem)] font-black tracking-[0.08em] uppercase text-[#111111] leading-none">
          {characters.map((char, index) => {
            if (char === ' ') {
              return (
                <span
                  key={`space-${index}`}
                  ref={(el) => {
                    letterRefs.current[index] = el;
                  }}
                  className="inline-block w-[0.35em] select-none"
                  aria-hidden="true"
                >
                  &nbsp;
                </span>
              );
            }

            return (
              <span
                key={`char-${index}`}
                ref={(el) => {
                  letterRefs.current[index] = el;
                }}
                className={`inline-block will-change-[opacity,transform] ${
                  isAccessibleMode ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  color: '#111111',
                  transform: 'translateZ(0)',
                }}
              >
                {char}
              </span>
            );
          })}
        </h1>
      </div>
    );
  }
);

Headline.displayName = 'Headline';
