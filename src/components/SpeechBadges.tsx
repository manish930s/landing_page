import React from 'react';
import { motion } from 'motion/react';
import { smoothstep, lerp } from '../utils/choreography';

interface SpeechBadgesProps {
  introPhase: 'stack-enter' | 'stack-rise' | 'stack-shuffle' | 'ready';
  scrollProgress: number;
}

export const SpeechBadges: React.FC<SpeechBadgesProps> = ({
  introPhase,
  scrollProgress,
}) => {
  const isHiddenInStack = introPhase !== 'ready';

  // Fade out when morphing into Product Detail section (scrollProgress > 0.62)
  const detailFade = 1 - smoothstep(0.60, 0.72, scrollProgress);
  const bestSellingShift = smoothstep(0.05, 0.35, scrollProgress);

  const visibleOpacity = isHiddenInStack ? 0 : detailFade;
  const scaleVal = isHiddenInStack ? 0.65 : lerp(1, 0.85, 1 - detailFade);

  // Subtle positional interpolation between Hero Fan and Best Selling Row
  const leftBadgeX = lerp(0, 10, bestSellingShift);
  const leftBadgeY = lerp(0, -14, bestSellingShift);

  const rightBadgeX = lerp(0, 18, bestSellingShift);
  const rightBadgeY = lerp(0, -26, bestSellingShift);

  return (
    <div
      className="pointer-events-none absolute inset-0 max-w-[1440px] mx-auto z-30"
      aria-hidden="true"
    >
      {/* Left Teal Speech Bubble: "Get upto 30% OFF" */}
      <motion.div
        initial={false}
        animate={{
          opacity: visibleOpacity,
          scale: scaleVal,
          x: leftBadgeX,
          y: leftBadgeY,
          rotate: -12.5,
        }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 24,
        }}
        className="absolute left-[8%] sm:left-[12%] lg:left-[13.5%] top-[28.5%] sm:top-[29.5%]"
      >
        <div className="relative px-5 py-2.5 rounded-full flex items-center justify-center shadow-[0_10px_25px_-6px_rgba(33,152,181,0.45)] bg-[#299EBC] text-white">
          <span className="text-[12.5px] font-medium tracking-wide whitespace-nowrap leading-none">
            Get upto 30% OFF
          </span>
          <span
            className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px]"
            style={{ borderTopColor: '#299EBC' }}
          />
        </div>
      </motion.div>

      {/* Right Orange Speech Bubble: "Best Product" */}
      <motion.div
        initial={false}
        animate={{
          opacity: visibleOpacity,
          scale: scaleVal,
          x: rightBadgeX,
          y: rightBadgeY,
          rotate: 17.5,
        }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 24,
        }}
        className="absolute right-[8%] sm:right-[11%] lg:right-[12.5%] top-[29.5%] sm:top-[30.5%]"
      >
        <div className="relative px-5 py-2.5 rounded-full flex items-center justify-center shadow-[0_10px_25px_-6px_rgba(235,147,34,0.45)] bg-[#EDA138] text-white">
          <span className="text-[12.5px] font-medium tracking-wide whitespace-nowrap leading-none">
            Best Product
          </span>
          <span
            className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px]"
            style={{ borderTopColor: '#EDA138' }}
          />
        </div>
      </motion.div>
    </div>
  );
};
