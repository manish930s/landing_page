import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

const GATEWAY_SLIDES = [
  {
    id: 'reatha-phelan',
    kicker: 'CLASS BY REATHA C. PHELAN',
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
    kicker: 'CLASS BY MARCUS VANCE',
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
    kicker: 'CLASS BY ELENA ROSTOVA',
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
  { id: 'mercury', name: 'MERCURY', style: 'tracking-[0.14em] font-semibold text-[18px]' },
  { id: 'remote', name: 'remote', style: 'tracking-tight font-bold text-[21px] lowercase' },
  { id: 'miro', name: 'miro', style: 'tracking-tight font-extrabold text-[22px] italic' },
  { id: 'bb', name: 'BB', style: 'tracking-tighter font-black text-[24px] border-2 border-current px-1.5 py-0.5 rounded' },
  { id: 'databricks', name: 'databricks', style: 'tracking-tight font-bold text-[19px]' },
  { id: 'linear', name: 'Linear', style: 'tracking-tight font-semibold text-[20px]' },
  { id: 'circus', name: 'CIRCUS', style: 'tracking-[0.2em] font-bold text-[17px]' },
];

export const ShowcaseGatewaySection: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [partnerOffset, setPartnerOffset] = useState(0);

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
      className="relative w-full bg-white pt-20 pb-24 px-4 sm:px-8 md:px-14 overflow-hidden"
    >
      <div className="max-w-[1220px] mx-auto">
        {/* Top Centered Header ("CLASS BY REATHA C. PHELAN" / "Gateway to artist people.") */}
        <div className="relative flex flex-col items-center text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#71717A]"
          >
            {activeSlide.kicker}
          </motion.span>

          <div className="relative mt-3 inline-flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-[44px] sm:text-[62px] md:text-[74px] font-semibold tracking-[-0.03em] leading-[1.02] text-[#141414]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="block">{activeSlide.titleLine1}</span>
              <span className="block">
                {activeSlide.titleLine2Prefix}
                <motion.span
                  initial={{ color: '#D4D4D8' }}
                  whileInView={{ color: '#141414' }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.75, delay: 0.15 }}
                >
                  {activeSlide.titleLine2Accent}
                </motion.span>
              </span>
            </motion.h2>

            {/* Floating Black Speech Bubble "@reatha" on the right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: 18, x: 24 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 9, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.18 }}
              className="hidden sm:flex absolute -right-28 md:-right-36 bottom-2 px-4 py-1.5 rounded-full bg-[#141414] text-white text-[13px] font-medium shadow-lg items-center justify-center"
            >
              <span>{activeSlide.instructor}</span>
              <span className="absolute -bottom-1.5 left-4 w-2.5 h-2.5 bg-[#141414] rotate-45" />
            </motion.div>
          </div>
        </div>

        {/* Full-Width Burnt-Orange Rounded Showcase Banner (00:08 - 00:11) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-[32px] overflow-hidden shadow-[0_28px_60px_-18px_rgba(234,88,12,0.32)]"
          style={{ backgroundColor: activeSlide.bgAccent }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeSlide.id}
              src={activeSlide.image}
              alt={activeSlide.kicker}
              initial={{ opacity: 0, scale: 1.05 }}
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

          {/* Top-Left Vertical 2-Square Contrast Toggle Pill */}
          <button
            type="button"
            onClick={() => setHighContrastMode((prev) => !prev)}
            aria-label="Toggle studio contrast mode"
            title="Toggle Studio Contrast"
            className="absolute top-6 left-6 z-20 p-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-md flex flex-col gap-1 cursor-pointer hover:scale-105 transition-transform"
          >
            <span
              className={`w-4 h-4 rounded-[5px] transition-colors ${
                !highContrastMode ? 'bg-white border border-zinc-300' : 'bg-zinc-200'
              }`}
            />
            <span
              className={`w-4 h-4 rounded-[5px] transition-colors ${
                highContrastMode ? 'bg-[#EA580C]' : 'bg-[#141414]'
              }`}
            />
          </button>

          {/* Bottom-Left "Watch" White Pill Button */}
          <div className="absolute bottom-6 left-6 z-20">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsClassModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-white text-[#141414] text-[13px] font-semibold tracking-tight shadow-lg flex items-center gap-2 cursor-pointer hover:bg-zinc-50"
            >
              <Play className="w-3.5 h-3.5 fill-[#141414]" />
              <span>Watch</span>
            </motion.button>
          </div>

          {/* Bottom-Right Circular "<" and ">" Navigation Buttons */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2.5">
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handlePrevSlide}
              aria-label="Previous masterclass"
              className="w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#141414] shadow-md flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleNextSlide}
              aria-label="Next masterclass"
              className="w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#141414] shadow-md flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom "Trusted by the best." + Partner Logos Strip (00:10 - 00:12) */}
        <div className="mt-16 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-[28px] sm:text-[34px] font-semibold tracking-tight text-[#141414]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Trusted by the best.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mt-1.5 text-[13.5px] text-[#71717A] max-w-[360px] leading-relaxed"
              >
                Our growth hackers are experts in the identifying and capitalizing on the most
              </motion.p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPartnerOffset((prev) => (prev === 0 ? 1 : 0))}
                aria-label="Scroll partners left"
                className="w-9 h-9 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-[#141414] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPartnerOffset((prev) => (prev === 0 ? 1 : 0))}
                aria-label="Scroll partners right"
                className="w-9 h-9 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-[#141414] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 7 Partner Logos Row */}
          <motion.div
            animate={{ x: partnerOffset ? -24 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            className="mt-10 pt-8 border-t border-zinc-100 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center text-zinc-400"
          >
            {PARTNER_BRANDS.map((brand, idx) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="hover:text-[#141414] transition-colors cursor-pointer select-none flex items-center gap-2"
              >
                {brand.id === 'mercury' && (
                  <span className="w-4 h-4 rounded-full border-2 border-current inline-block" />
                )}
                {brand.id === 'databricks' && (
                  <span className="w-3.5 h-3.5 rotate-45 border-2 border-current inline-block" />
                )}
                <span className={brand.style}>{brand.name}</span>
              </motion.div>
            ))}
          </motion.div>
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
              aria-label={activeSlide.kicker}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[540px] bg-white rounded-3xl overflow-hidden shadow-2xl z-50"
            >
              <div className="relative h-64 bg-[#EA580C]">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.kicker}
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
                  {activeSlide.kicker}
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
