import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

const GATEWAY_SLIDES = [
  {
    id: 'reatha-phelan',
    kickerPrefix: 'CLASS BY ',
    kickerHighlight: 'REATHA C. PHELAN',
    instructor: '@reatha',
    titleLine1: 'Gateway to',
    titleLine2Prefix: 'artist ',
    titleLine2Accent: 'people.',
    image: '/src/assets/images/gateway_sunglasses_banner_1794472948136.jpg',
    bgAccent: '#EA580C',
    duration: '14 Lessons • 3h 45m',
    summary:
      'Master contemporary visual direction, vibrant color blocking, and commercial art curation with Reatha C. Phelan.',
  },
  {
    id: 'marcus-vance',
    kickerPrefix: 'CLASS BY ',
    kickerHighlight: 'MARCUS VANCE',
    instructor: '@marcus',
    titleLine1: 'Gateway to',
    titleLine2Prefix: 'artist ',
    titleLine2Accent: 'people.',
    image: '/public/assets/klickpin/gateway_banner.png',
    bgAccent: '#D9460F',
    duration: '11 Lessons • 2h 50m',
    summary:
      'Explore editorial portrait composition, bold pop-art contrast, and collector storytelling for digital & print galleries.',
  },
  {
    id: 'elena-rostova',
    kickerPrefix: 'CLASS BY ',
    kickerHighlight: 'ELENA ROSTOVA',
    instructor: '@elena',
    titleLine1: 'Gateway to',
    titleLine2Prefix: 'artist ',
    titleLine2Accent: 'people.',
    image: '/src/assets/images/featured_artist_orange_dress_1794472953183.jpg',
    bgAccent: '#C2410C',
    duration: '16 Lessons • 4h 15m',
    summary:
      'Build a signature monochrome-warm aesthetic and turn limited-edition studio releases into high-demand drops.',
  },
];

const PARTNER_BRANDS = [
  { id: 'remote', name: 'remote', style: 'tracking-tight font-bold text-[22px] sm:text-[26px] lowercase' },
  { id: 'miro', name: 'miro', style: 'tracking-tight font-extrabold text-[23px] sm:text-[27px] italic' },
  { id: 'bb', name: 'BB', style: 'tracking-tighter font-black text-[22px] sm:text-[25px] border-2 border-current px-2 py-0.5 rounded-md' },
  { id: 'databricks', name: 'databricks', style: 'tracking-tight font-bold text-[20px] sm:text-[23px]' },
  { id: 'linear', name: 'Linear', style: 'tracking-tight font-semibold text-[21px] sm:text-[24px]' },
  { id: 'circus', name: 'CIRCUS', style: 'tracking-[0.22em] font-bold text-[18px] sm:text-[21px]' },
  { id: 'mercury', name: 'MERCURY', style: 'tracking-[0.16em] font-semibold text-[19px] sm:text-[22px]' },
];

export const ShowcaseGatewaySection: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [reversePartnerMarquee, setReversePartnerMarquee] = useState(false);

  const activeSlide = GATEWAY_SLIDES[activeSlideIndex];

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + GATEWAY_SLIDES.length) % GATEWAY_SLIDES.length);
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % GATEWAY_SLIDES.length);
  };

  return (
    <section
      id="gateway-section"
      className="relative w-full bg-white pt-16 sm:pt-24 pb-24 px-6 sm:px-10 lg:px-[5vw] overflow-hidden"
    >
      <div className="w-full">
        {/* Top Left-Aligned Header ("CLASS BY REATHA C. PHELAN" / "Gateway to artist people.") matching sec_09.png */}
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12">
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] sm:text-[12px] xl:text-[0.85vw] font-bold tracking-[0.18em] uppercase"
            >
              <span className="text-[#141414]">{activeSlide.kickerPrefix}</span>
              <span className="text-[#EA580C]">{activeSlide.kickerHighlight}</span>
            </motion.div>

            <div className="relative mt-3 inline-flex flex-col items-start">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="text-[46px] sm:text-[66px] md:text-[5.8vw] font-semibold tracking-[-0.035em] leading-[0.98] text-[#141414]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="block">{activeSlide.titleLine1}</span>
                <span className="block">
                  {activeSlide.titleLine2Prefix}
                  <motion.span
                    initial={{ color: '#D4D4D8' }}
                    whileInView={{ color: '#A1A1AA' }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.75, delay: 0.15 }}
                  >
                    {activeSlide.titleLine2Accent}
                  </motion.span>
                </span>
              </motion.h2>

              {/* Floating Black Speech Bubble "@reatha" on the right of the headline */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: 14, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 8, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.18 }}
                className="hidden sm:flex absolute -right-28 md:-right-36 bottom-2 px-4 py-1.5 rounded-full bg-[#141414] text-white text-[13px] font-medium shadow-lg items-center justify-center"
              >
                <span>{activeSlide.instructor}</span>
                <span className="absolute -bottom-1.5 left-4 w-2.5 h-2.5 bg-[#141414] rotate-45" />
              </motion.div>
            </div>
          </div>

          {/* Right Accent Preview Stack peeking above the right edge of the banner (as seen in sec_09.png) */}
          <div className="hidden lg:flex items-end gap-4 pb-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.55 }}
              onClick={handlePrevSlide}
              className="w-28 xl:w-[8.5vw] h-32 xl:h-[9.5vw] rounded-[20px] overflow-hidden shadow-md border border-zinc-200 cursor-pointer hover:-translate-y-1 transition-transform"
            >
              <img
                src="/src/assets/images/card_modern_shorts_beige_1794470941113.jpg"
                alt="Curated preview 1"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              onClick={handleNextSlide}
              className="w-28 xl:w-[8.5vw] h-36 xl:h-[11vw] rounded-[20px] overflow-hidden shadow-md border border-zinc-200 cursor-pointer hover:-translate-y-1 transition-transform"
            >
              <img
                src="/src/assets/images/card_jogger_outfit_teal_1794470945448.jpg"
                alt="Curated preview 2"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Full-Width Burnt-Orange Rounded Showcase Banner (00:08 - 00:11, sec_09.png) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[420px] sm:h-[520px] lg:h-[47vw] max-h-[860px] rounded-[34px] overflow-hidden shadow-[0_28px_60px_-18px_rgba(234,88,12,0.32)]"
          style={{ backgroundColor: activeSlide.bgAccent }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeSlide.id}
              src={activeSlide.image}
              alt={`${activeSlide.kickerPrefix}${activeSlide.kickerHighlight}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: highContrastMode ? 'contrast(1.18) saturate(1.2)' : 'none',
              }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Subtle gradient vignette for control legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

          {/* Top-Left Vertical 2-Square Contrast Toggle Pill (matching sec_09.png) */}
          <button
            type="button"
            onClick={() => setHighContrastMode((prev) => !prev)}
            aria-label="Toggle studio contrast mode"
            title="Toggle Studio Contrast"
            className="absolute top-6 sm:top-8 left-6 sm:left-8 z-20 p-2 rounded-[18px] bg-white/30 backdrop-blur-md shadow-md flex flex-col gap-1.5 cursor-pointer hover:scale-105 transition-transform"
          >
            <span
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-[8px] transition-colors ${
                !highContrastMode ? 'bg-white shadow-xs' : 'bg-white/70'
              }`}
            />
            <span
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-[8px] transition-colors ${
                highContrastMode ? 'bg-[#EA580C]' : 'bg-[#141414]'
              }`}
            />
          </button>

          {/* Bottom-Left "Watch" White Pill Button */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-20">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsClassModalOpen(true)}
              className="px-7 py-3 rounded-full bg-white text-[#141414] text-[13.5px] sm:text-[14px] font-semibold tracking-tight shadow-lg flex items-center gap-2 cursor-pointer hover:bg-zinc-50"
            >
              <Play className="w-3.5 h-3.5 fill-[#141414]" />
              <span>Watch</span>
            </motion.button>
          </div>

          {/* Bottom-Right Circular "<" and ">" Navigation Buttons */}
          <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-20 flex items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handlePrevSlide}
              aria-label="Previous masterclass"
              className="w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#141414] shadow-md flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleNextSlide}
              aria-label="Next masterclass"
              className="w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#141414] shadow-md flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom "Trusted by the best." + Automatic Continuous Partner Logos Marquee (00:10 - 00:12, sec_11.png) */}
        <div className="mt-16 sm:mt-20 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-[30px] sm:text-[40px] lg:text-[2.9vw] font-semibold tracking-[-0.03em] text-[#141414] leading-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Trusted by the best.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mt-2 text-[13.5px] sm:text-[14.5px] xl:text-[1.02vw] text-[#71717A] max-w-[380px] xl:max-w-[26vw] leading-relaxed"
              >
                Our growth hackers are experts in the identifying and capitalizing on the most
              </motion.p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setReversePartnerMarquee(true)}
                aria-label="Scroll partners left"
                className="w-10 h-10 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-[#141414] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setReversePartnerMarquee(false)}
                aria-label="Scroll partners right"
                className="w-10 h-10 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-[#141414] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Automatic Continuous Infinite Partner Marquee */}
          <div className="mt-10 pt-9 border-t border-zinc-100 relative w-full overflow-hidden">
            {/* Subtle edge fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

            <div
              className={`flex items-center w-max ${
                reversePartnerMarquee
                  ? 'animate-partner-marquee-reverse'
                  : 'animate-partner-marquee'
              }`}
            >
              {[0, 1].map((dupIndex) => (
                <div
                  key={`partner-track-${dupIndex}`}
                  className="flex items-center gap-14 sm:gap-20 lg:gap-[6.5vw] pr-14 sm:pr-20 lg:pr-[6.5vw] text-[#141414]"
                >
                  {PARTNER_BRANDS.map((brand) => (
                    <div
                      key={`${dupIndex}-${brand.id}`}
                      className="opacity-85 hover:opacity-100 transition-opacity cursor-pointer select-none flex items-center gap-2.5 shrink-0"
                    >
                      {brand.id === 'mercury' && (
                        <span className="w-5 h-5 rounded-full border-2 border-current inline-block" />
                      )}
                      {brand.id === 'databricks' && (
                        <span className="w-4 h-4 rotate-45 border-2 border-current inline-block" />
                      )}
                      {brand.id === 'linear' && (
                        <span className="w-4 h-4 rounded-full bg-current inline-block opacity-80" />
                      )}
                      <span className={brand.style}>{brand.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Masterclass Video Preview Modal */}
      <AnimatePresence>
        {isClassModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsClassModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${activeSlide.kickerPrefix}${activeSlide.kickerHighlight}`}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[540px] bg-white rounded-3xl overflow-hidden shadow-2xl z-50"
            >
              <div className="relative h-64 bg-[#EA580C]">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.kickerHighlight}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  aria-label="Close class preview"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/75 text-white text-xs font-medium">
                  {activeSlide.duration}
                </div>
              </div>
              <div className="p-6">
                <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#EA580C]">
                  {activeSlide.kickerPrefix}
                  {activeSlide.kickerHighlight}
                </div>
                <h4
                  className="mt-1 text-2xl font-bold text-[#141414]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Gateway to Artist People ({activeSlide.instructor})
                </h4>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {activeSlide.summary}
                </p>
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsClassModalOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-[#141414] text-white text-xs font-semibold cursor-pointer hover:bg-zinc-800"
                  >
                    Continue Exploring
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
