import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Paintbrush,
  PenTool,
  Wand2,
  Palette,
  Sparkles,
} from 'lucide-react';

const MARKETPLACE_COLLECTIONS = [
  {
    id: 'artnesia-gap',
    title: 'Artnesia Gap',
    subtitle: '240 Curated Works',
    image: '/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg',
    tag: 'Exhibition',
  },
  {
    id: 'immortalize-works',
    title: 'Immortalize Works',
    subtitle: '185 Curated Works',
    image: '/src/assets/images/card_winter_cloths_orange_1794470939362.jpg',
    tag: 'Digital Print',
  },
  {
    id: 'creativity-class',
    title: 'Creativity Class',
    subtitle: '310 Curated Works',
    image: '/src/assets/images/gateway_sunglasses_banner_1794472948136.jpg',
    tag: 'Masterclass',
  },
  {
    id: 'celebrates-party',
    title: 'Celebrates Party',
    subtitle: '164 Curated Works',
    image: '/src/assets/images/bento_popart_creator_1794472951684.jpg',
    tag: 'Collector Drop',
  },
];

// 5-Column Staggered Portrait Artwork Grid matching sec_33.png (15 vibrant artworks)
const STAGGERED_GALLERY_TILES = [
  {
    image: '/src/assets/images/card_summer_cloths_yellow_1794470938002.jpg',
    title: 'Solar Editorial',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg',
    title: 'Cobalt Eye',
    colOffset: 'lg:mt-10',
  },
  {
    image: '/src/assets/images/card_winter_cloths_orange_1794470939362.jpg',
    title: 'Studio Portrait',
    colOffset: 'lg:-mt-6',
  },
  {
    image: '/src/assets/images/bento_popart_creator_1794472951684.jpg',
    title: 'Pop Gold',
    colOffset: 'lg:mt-8',
  },
  {
    image: '/src/assets/images/card_jogger_outfit_teal_1794470945448.jpg',
    title: 'Teal Horizon',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/card_modern_shorts_beige_1794470941113.jpg',
    title: 'Minimal Form',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/card_woolan_fashion_studio_1794470942757.jpg',
    title: 'Amber Studio',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/gateway_sunglasses_banner_1794472948136.jpg',
    title: 'Reatha Series',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/card_model_outfit_loft_1794470944858.jpg',
    title: 'Monochrome Loft',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/featured_artist_orange_dress_1794472953183.jpg',
    title: 'Crimson Study',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/bento_popart_creator_1794472951684.jpg',
    title: 'Chromatic Wave',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/card_summer_cloths_yellow_1794470938002.jpg',
    title: 'Urban Archive',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg',
    title: 'Sculpted Blue',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/card_jogger_outfit_teal_1794470945448.jpg',
    title: 'Emerald Edition',
    colOffset: 'lg:mt-0',
  },
  {
    image: '/src/assets/images/card_winter_cloths_orange_1794470939362.jpg',
    title: 'Warm Contrast',
    colOffset: 'lg:mt-0',
  },
];

export const StoryMarketplaceSection: React.FC = () => {
  const [pradaFanExpanded, setPradaFanExpanded] = useState(false);
  const [carouselShift, setCarouselShift] = useState(0);
  const [isFollowingTrisha, setIsFollowingTrisha] = useState(false);

  return (
    <>
      {/* ===================================================================
          SECTION 6: "Every piece of art tells a story" 2x2 BENTO GRID (00:24 - 00:27, sec_26.png)
         =================================================================== */}
      <section
        id="story-bento-section"
        className="relative w-full bg-white py-24 px-6 sm:px-10 lg:px-[5vw]"
      >
        <div className="w-full">
          {/* Section Header matching sec_26.png */}
          <div className="flex flex-col items-center text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-[11px] sm:text-[12px] xl:text-[0.85vw] font-bold tracking-[0.2em] uppercase"
            >
              <span className="text-[#141414]">YOUR STORY </span>
              <span className="text-[#2563EB]">TELLING</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="mt-2.5 text-[40px] sm:text-[56px] md:text-[4.6vw] font-semibold tracking-[-0.03em] leading-[1.03] text-[#141414]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Every piece of art
              <br />
              <span>tells </span>
              <span className="text-[#A1A1AA]">a story</span>
            </motion.h2>
          </div>

          {/* 2x2 Symmetrical Editorial Bento Grid matching sec_26.png */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            {/* -------------------------------------------------------------
                BENTO CARD 1 (Top-Left): "Connect, Create, Commerce" + PRADA Mini Fan
               ------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="rounded-[32px] bg-[#F6F6F7] p-7 sm:p-9 flex flex-col justify-between min-h-[450px] lg:min-h-[30vw] relative overflow-hidden border border-zinc-200/60"
            >
              {/* Top-Left Play Video Pill */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPradaFanExpanded((prev) => !prev)}
                  className="px-4 py-2 rounded-full bg-white text-[#141414] text-[12px] font-semibold shadow-xs flex items-center gap-2 cursor-pointer hover:bg-zinc-50 border border-zinc-200/80"
                >
                  <Play className="w-3 h-3 fill-[#141414]" />
                  <span>Play Video</span>
                </button>
              </div>

              {/* Center Interactive 3-Card Mini Fan ("PRADA" card on top + "@robin" blue bubble) */}
              <div
                onClick={() => setPradaFanExpanded((prev) => !prev)}
                className="relative my-6 h-48 sm:h-52 flex items-center justify-center cursor-pointer"
              >
                {/* Left Fan Card */}
                <motion.div
                  animate={{
                    x: pradaFanExpanded ? -86 : -54,
                    rotate: pradaFanExpanded ? -16 : -10,
                  }}
                  className="absolute w-32 h-40 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-zinc-200"
                >
                  <img
                    src="/src/assets/images/card_summer_cloths_yellow_1794470938002.jpg"
                    alt="Gallery study"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Right Fan Card */}
                <motion.div
                  animate={{
                    x: pradaFanExpanded ? 86 : 54,
                    rotate: pradaFanExpanded ? 16 : 10,
                  }}
                  className="absolute w-32 h-40 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-zinc-200"
                >
                  <img
                    src="/src/assets/images/card_jogger_outfit_teal_1794470945448.jpg"
                    alt="Abstract edition"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Center Top Card ("PRADA" Editorial Monochrome Card) */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 w-36 h-44 rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-[#18181B] flex flex-col justify-between p-3.5 text-white"
                >
                  <img
                    src="/src/assets/images/card_model_outfit_loft_1794470944858.jpg"
                    alt="PRADA Capsule"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="relative z-10 text-[12px] font-bold tracking-[0.22em] uppercase text-center bg-black/45 backdrop-blur-xs rounded-md py-0.5">
                    PRADA
                  </div>
                  <div className="relative z-10 text-[10px] text-zinc-200 font-medium text-center">
                    Milano Archive
                  </div>
                </motion.div>

                {/* Floating Blue "@robin" Bubble */}
                <div className="absolute right-[18%] top-2 z-20 px-3.5 py-1 rounded-full bg-[#2563EB] text-white text-[11.5px] font-semibold shadow-md rotate-6">
                  @robin
                </div>
              </div>

              {/* Bottom Copy & Right CTA matching sec_26.png */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3
                    className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-[#141414]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Connect, Create, Commerce
                  </h3>
                  <p className="mt-1.5 text-[13px] sm:text-[13.5px] text-[#71717A] max-w-[360px] leading-relaxed">
                    Offering buyers a chance to own a piece of that narrative. These titles and descriptions can help set the tone
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPradaFanExpanded((prev) => !prev)}
                  className="self-start sm:self-end px-5 py-2.5 rounded-full border border-zinc-300 bg-white hover:border-zinc-500 text-[#141414] text-[12px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                >
                  How it works?
                </button>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BENTO CARD 2 (Top-Right): "Where Art Breathes Commerce" + Top Cobalt Sculpture (sec_26.png)
               ------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="rounded-[32px] bg-[#F6F6F7] p-7 sm:p-9 flex flex-col justify-between min-h-[450px] lg:min-h-[30vw] border border-zinc-200/60 overflow-hidden"
            >
              {/* Top Full-Width Cobalt Sculpture Banner matching sec_26.png */}
              <div className="w-full h-60 sm:h-68 lg:h-[18.5vw] rounded-[24px] overflow-hidden shadow-md bg-[#1D4ED8]">
                <img
                  src="/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg"
                  alt="Where Art Breathes Commerce Cobalt Sculpture"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3
                    className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-[#141414]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Where Art Breathes Commerce
                  </h3>
                  <p className="mt-1.5 text-[13px] sm:text-[13.5px] text-[#71717A] max-w-[380px] leading-relaxed">
                    Artistic spirit with commercial viability, providing a platform where creativity and commerce
                  </p>
                </div>
                <button
                  type="button"
                  className="self-start sm:self-end px-5 py-2.5 rounded-full border border-zinc-300 bg-white hover:border-zinc-500 text-[#141414] text-[12px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                >
                  Read more
                </button>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BENTO CARD 3 (Bottom-Left): "Spin Your Art into Gold" + Pop-Art Creator Banner
               ------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="rounded-[32px] bg-[#F6F6F7] p-7 sm:p-9 flex flex-col justify-between min-h-[450px] lg:min-h-[30vw] border border-zinc-200/60 overflow-hidden"
            >
              <div className="w-full h-60 sm:h-68 lg:h-[18.5vw] rounded-[24px] overflow-hidden shadow-md bg-[#FACC15]">
                <img
                  src="/src/assets/images/bento_popart_creator_1794472951684.jpg"
                  alt="Spin Your Art into Gold"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3
                    className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-[#141414]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Spin Your Art into Gold
                  </h3>
                  <p className="mt-1.5 text-[13px] sm:text-[13.5px] text-[#71717A] max-w-[380px] leading-relaxed">
                    Unleash your artistic potential, where innovation and creativity converge, empowering artists
                  </p>
                </div>

                <button
                  type="button"
                  className="self-start sm:self-end px-5 py-2.5 rounded-full border border-zinc-300 bg-white hover:border-zinc-500 text-[#141414] text-[12px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                >
                  Join us now
                </button>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BENTO CARD 4 (Bottom-Right): Rising Dark Phone Monolith ("Personal Identity")
               ------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="rounded-[32px] bg-[#F6F6F7] pt-7 px-7 sm:px-9 flex flex-col justify-between min-h-[450px] lg:min-h-[30vw] relative overflow-hidden border border-zinc-200/60"
            >
              <div className="flex items-center justify-end">
                <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-zinc-200/70 flex items-center justify-center text-[#141414]">
                  <Rocket className="w-4 h-4" />
                </div>
              </div>

              {/* Rising Sleek Matte-Black Smartphone Monolith matching sec_26.png */}
              <motion.div
                initial={{ y: 70 }}
                whileInView={{ y: 12 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-6 w-[250px] sm:w-[280px] h-[330px] rounded-t-[38px] bg-gradient-to-b from-[#27272A] via-[#18181B] to-[#09090B] p-4 shadow-[0_-18px_45px_rgba(0,0,0,0.22)] border-t border-x border-zinc-700/80 flex flex-col justify-between text-white"
              >
                {/* Dynamic Island Notch */}
                <div className="w-16 h-1.5 rounded-full bg-zinc-700 mx-auto mt-1" />

                <div className="my-auto px-3 text-center">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 mx-auto mb-3 flex items-center justify-center text-[#EEFF41] font-bold text-sm">
                    AF
                  </div>
                  <div
                    className="text-[20px] font-semibold tracking-tight leading-snug"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Personal
                    <br />
                    Identity
                  </div>
                  <p className="mt-2 text-[11.5px] text-zinc-400 leading-relaxed">
                    Verified creator profile, instant drops, and collector royalties.
                  </p>
                </div>

                <div className="px-3 pb-4">
                  <div className="w-full py-2 rounded-full bg-white/10 text-center text-[11px] font-medium text-zinc-200">
                    artfusion.studio/id
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 7: "Marketplace for Creativity" CAROUSEL & 5-COLUMN ARTWORK GRID WITH RISING "Trisha Woodward" (00:28 - 00:34, sec_29.png & sec_33.png)
         =================================================================== */}
      <section
        id="marketplace-creativity-section"
        className="relative w-full bg-white py-24 px-6 sm:px-10 lg:px-[5vw] overflow-hidden"
      >
        <div className="w-full">
          {/* Part 7A: Header + Purple "Explore All" Button + 4 Horizontal Cards (sec_29.png) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[11px] sm:text-[12px] xl:text-[0.85vw] font-bold tracking-[0.2em] uppercase">
                <span className="text-[#141414]">GET MORE </span>
                <span className="text-[#9333EA]">CLOSER</span>
              </div>
              <h2
                className="mt-2.5 text-[40px] sm:text-[54px] md:text-[4.4vw] font-semibold tracking-[-0.03em] leading-[1.02] text-[#141414]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Marketplace
                <br />
                <span>for </span>
                <span className="text-[#A1A1AA]">Creativity</span>
              </h2>
              <div className="mt-6 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCarouselShift((prev) => (prev === 0 ? 1 : 0))}
                  aria-label="Previous marketplace items"
                  className="w-10 h-10 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-[#141414] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCarouselShift((prev) => (prev === 0 ? 1 : 0))}
                  aria-label="Next marketplace items"
                  className="w-10 h-10 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-[#141414] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCarouselShift((prev) => (prev === 0 ? 1 : 0))}
              className="self-start sm:self-end px-7 py-3 rounded-full bg-[#A855F7] hover:bg-[#9333EA] text-white text-[13px] font-semibold tracking-wide shadow-md cursor-pointer"
            >
              Explore All
            </motion.button>
          </div>

          {/* 4-Card Horizontal Showcase Row ("Artnesia Gap", "Immortalize Works", "Creativity Class", "Celebrates Party") */}
          <motion.div
            animate={{ x: carouselShift ? -18 : 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {MARKETPLACE_COLLECTIONS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group cursor-pointer"
              >
                <div className="relative h-72 sm:h-80 lg:h-[22vw] rounded-[26px] overflow-hidden bg-zinc-100 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#141414] text-[11px] font-semibold">
                    {item.tag}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between px-1">
                  <div>
                    <h3
                      className="text-[18px] font-semibold text-[#141414]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[12.5px] text-[#71717A]">{item.subtitle}</p>
                  </div>
                  <span className="w-9 h-9 rounded-full border border-zinc-200 group-hover:bg-[#141414] group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Part 7B: Floating 5-Icon Dock + 5-Column Staggered Artwork Grid + Central Featured Artist "Trisha Woodward" (00:31 - 00:34, sec_33.png) */}
          <div className="mt-28 relative">
            {/* Floating 5-Icon Dock Bar */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 mb-12">
              {[Paintbrush, PenTool, Wand2, Palette, Sparkles].map((Icon, idx) => (
                <motion.div
                  key={`dock-icon-${idx}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: idx < 2 ? -14 : idx > 2 ? 14 : 0,
                  }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: idx * 0.05 }}
                  className="w-12 h-12 rounded-2xl border border-zinc-200 bg-white shadow-sm flex items-center justify-center text-[#141414]"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              ))}
            </div>

            {/* 5-Column Staggered Portrait Artwork Grid + Central Elevated "Trisha Woodward" Card (matching sec_33.png) */}
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                {STAGGERED_GALLERY_TILES.map((tile, idx) => (
                  <motion.div
                    key={`bg-tile-${idx}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.12 }}
                    transition={{ duration: 0.45, delay: (idx % 5) * 0.04 }}
                    className={`h-52 sm:h-60 lg:h-[17vw] rounded-[24px] overflow-hidden border border-zinc-200/60 bg-zinc-100 shadow-xs ${tile.colOffset}`}
                  >
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Central Elevated Burnt-Orange Portrait Card: "Trisha Woodward" / "1,040 artworks" (00:32 - 00:34, sec_33.png) */}
              <div className="mt-8 lg:mt-0 lg:pointer-events-none lg:absolute lg:inset-0 flex items-center justify-center z-20">
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.88 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ type: 'spring', stiffness: 210, damping: 24 }}
                  className="pointer-events-auto relative w-full max-w-[380px] sm:max-w-[430px] lg:max-w-[30vw] rounded-[32px] overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,0,0,0.38)] border-4 border-white bg-[#EA580C]"
                >
                  {/* Floating Orange "@artist" Speech Bubble on the Left */}
                  <div className="absolute left-5 top-6 z-30 px-4 py-1.5 rounded-full bg-[#EA580C] text-white text-[12px] font-semibold shadow-lg -rotate-6 border border-white/30">
                    @artist
                  </div>

                  {/* Portrait Image */}
                  <div className="relative h-[400px] sm:h-[440px] lg:h-[31vw] max-h-[540px] w-full overflow-hidden bg-[#EA580C]">
                    <img
                      src="/src/assets/images/featured_artist_orange_dress_1794472953183.jpg"
                      alt="Trisha Woodward"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                    {/* Artist Name & Artwork Count Overlay matching sec_33.png */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                      <div>
                        <p className="text-[12.5px] text-zinc-200 font-medium">
                          1,040 artworks
                        </p>
                        <h3
                          className="mt-0.5 text-[26px] sm:text-[30px] font-semibold leading-tight"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          Trisha Woodward
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsFollowingTrisha((prev) => !prev)}
                        className={`px-5 py-2 rounded-full text-[12.5px] font-semibold shadow-md cursor-pointer transition-transform active:scale-95 ${
                          isFollowingTrisha
                            ? 'bg-[#141414] text-white'
                            : 'bg-white text-[#141414] hover:bg-zinc-100'
                        }`}
                      >
                        {isFollowingTrisha ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
