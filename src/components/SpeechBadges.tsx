import React from 'react';
import { motion } from 'motion/react';
import {
  smoothstep,
  lerp,
  getResponsiveScale,
  getHorizontalSpreadScale,
} from '../utils/choreography';

interface SpeechBadgesProps {
  introPhase: 'stack-enter' | 'stack-rise' | 'stack-shuffle' | 'ready';
  scrollProgress: number;
  viewportWidth?: number;
  viewportHeight?: number;
}

export const SpeechBadges: React.FC<SpeechBadgesProps> = ({
  introPhase,
  scrollProgress,
  viewportWidth = 1440,
  viewportHeight = 900,
}) => {
  const isHiddenInStack = introPhase !== 'ready';

  // Fade out when morphing into Showcase / Detail section
  const detailFade = 1 - smoothstep(0.45, 0.68, scrollProgress);
  const bestSellingShift = smoothstep(0.05, 0.35, scrollProgress);

  const scaleFactor = getResponsiveScale(viewportWidth, viewportHeight);
  const spreadScale = getHorizontalSpreadScale(viewportWidth, viewportHeight);

  const visibleOpacity = isHiddenInStack ? 0 : detailFade;
  const badgeScale = isHiddenInStack
    ? 0.65
    : lerp(1, 0.85, 1 - detailFade) *
      (viewportWidth <= 640
        ? 0.78
        : Math.max(0.82, Math.min(scaleFactor, 1.35)));

  // Anchor badges directly relative to the 6-Card Hero Fan center and clamp within viewport bounds on mobile
  const maxBadgeOffset = Math.max(105, viewportWidth * 0.32);
  const rawLeftX = -345 * spreadScale + lerp(0, 14, bestSellingShift);
  const rawRightX = 350 * spreadScale + lerp(0, 18, bestSellingShift);

  const leftAnchorX = Math.round(Math.max(-maxBadgeOffset, rawLeftX));
  const leftAnchorY = Math.round(
    (viewportWidth <= 640 ? -195 : -162) * scaleFactor +
      lerp(0, -16, bestSellingShift)
  );

  const rightAnchorX = Math.round(Math.min(maxBadgeOffset, rawRightX));
  const rightAnchorY = Math.round(
    (viewportWidth <= 640 ? -182 : -150) * scaleFactor +
      lerp(0, -24, bestSellingShift)
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 w-full h-full flex items-center justify-center z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* Left Teal Speech Bubble: "Get upto 30% OFF" */}
      <motion.div
        initial={false}
        animate={{
          opacity: visibleOpacity,
          scale: badgeScale,
          x: leftAnchorX,
          y: leftAnchorY,
          rotate: -12.5,
        }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 24,
        }}
        className="absolute"
      >
        <div className="relative px-5 py-2.5 rounded-full flex items-center justify-center shadow-[0_10px_25px_-6px_rgba(33,152,181,0.45)] bg-[#299EBC] text-white">
          <span className="text-[12.5px] sm:text-[13.5px] font-medium tracking-wide whitespace-nowrap leading-none">
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
          scale: badgeScale,
          x: rightAnchorX,
          y: rightAnchorY,
          rotate: 17.5,
        }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 24,
        }}
        className="absolute"
      >
        <div className="relative px-5 py-2.5 rounded-full flex items-center justify-center shadow-[0_10px_25px_-6px_rgba(235,147,34,0.45)] bg-[#EDA138] text-white">
          <span className="text-[12.5px] sm:text-[13.5px] font-medium tracking-wide whitespace-nowrap leading-none">
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
