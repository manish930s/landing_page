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
  Heart,
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

const BACKGROUND_GRID_TILES = [
  {
    type: 'image' as const,
    image: '/src/assets/images/card_summer_cloths_yellow_1794470938002.jpg',
    title: 'Solar Editorial',
  },
  {
    type: 'text' as const,
    kicker: '01 / ARCHIVE',
    title: 'Modern Art',
    subtitle: 'Curated contemporary canvases & mixed media editions.',
  },
  {
    type: 'image' as const,
    image: '/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg',
    title: 'Cobalt Eye',
  },
  {
    type: 'text' as const,
    kicker: '02 / SCULPT',
    title: '3D Sculpture',
    subtitle: 'Tactile ceramic, resin, and architectural objects.',
  },
  {
    type: 'text' as const,
    kicker: '03 / CULTURE',
    title: 'Pop Culture',
    subtitle: 'Bold graphic prints & neo-expressionist street works.',
  },
  {
    type: 'image' as const,
    image: '/src/assets/images/card_modern_shorts_beige_1794470941113.jpg',
    title: 'Studio Tactile',
  },
  {
    type: 'image' as const,
    image: '/src/assets/images/card_woolan_fashion_studio_1794470942757.jpg',
    title: 'Amber Light',
  },
  {
    type: 'text' as const,
    kicker: '04 / IDENTITY',
    title: 'Visual Identity',
    subtitle: 'Distinctive creator systems and limited monographs.',
  },
  {
    type: 'image' as const,
    image: '/src/assets/images/bento_popart_creator_1794472951684.jpg',
    title: 'Pop Gold',
  },
  {
    type: 'text' as const,
    kicker: '05 / CANVAS',
    title: 'Abstract Canvas',
    subtitle: 'Chromatic depth and large-scale gallery studies.',
  },
  {
    type: 'image' as const,
    image: '/src/assets/images/card_jogger_outfit_teal_1794470945448.jpg',
    title: 'Horizon Line',
  },
  {
    type: 'text' as const,
    kicker: '06 / EDITION',
    title: 'Digital Craft',
    subtitle: 'Verified collector editions with studio provenance.',
  },
];

export const StoryMarketplaceSection: React.FC = () => {
  const [pradaFanExpanded, setPradaFanExpanded] = useState(false);
  const [carouselShift, setCarouselShift] = useState(0);
  const [trishaLikes, setTrishaLikes] = useState(1240);
  const [isTrishaLiked, setIsTrishaLiked] = useState(true);

  const handleToggleLike = () => {
    setIsTrishaLiked((prev) => !prev);
    setTrishaLikes((prev) => (isTrishaLiked ? prev - 1 : prev + 1));
  };

  return (
    <>
      {/* ===================================================================
          SECTION 6: "Every piece of art tells a story" 2x2 BENTO GRID (00:24 - 00:27)
         =================================================================== */}
      <section
        id="story-bento-section"
        className="relative w-full bg-white py-24 px-4 sm:px-8 md:px-14"
      >
        <div className="max-w-[1220px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-14">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#71717A]"
            >
              YOUR STORY TELLING
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="mt-2.5 text-[38px] sm:text-[52px] md:text-[62px] font-semibold tracking-[-0.03em] leading-[1.05] text-[#141414]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Every piece of art
              <br />
              tells a story
            </motion.h2>
          </div>

          {/* 2x2 Editorial Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* -------------------------------------------------------------
                BENTO CARD 1 (Top-Left, 5 cols): "Connect, Create, Commerce" + PRADA Mini Fan
               ------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 rounded-[30px] bg-[#F6F6F7] p-7 sm:p-8 flex flex-col justify-between min-h-[430px] relative overflow-hidden border border-zinc-200/60"
            >
              {/* Top-Left Play Video Pill */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setPradaFanExpanded((prev) => !prev)}
                  className="px-4 py-1.5 rounded-full bg-white text-[#141414] text-[12px] font-semibold shadow-xs flex items-center gap-2 cursor-pointer hover:bg-zinc-50"
                >
                  <Play className="w-3 h-3 fill-[#141414]" />
                  <span>Play Video</span>
                </button>
              </div>

              {/* Center Interactive 3-Card Mini Fan ("PRADA" card on top + "@robin" blue bubble) */}
              <div
                onClick={() => setPradaFanExpanded((prev) => !prev)}
                className="relative my-6 h-44 flex items-center justify-center cursor-pointer"
              >
                {/* Left Fan Card */}
                <motion.div
                  animate={{
                    x: pradaFanExpanded ? -78 : -48,
                    rotate: pradaFanExpanded ? -16 : -10,
                  }}
                  className="absolute w-28 h-36 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-zinc-200"
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
                    x: pradaFanExpanded ? 78 : 48,
                    rotate: pradaFanExpanded ? 16 : 10,
                  }}
                  className="absolute w-28 h-36 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-zinc-200"
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
                  className="relative z-10 w-32 h-40 rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-[#18181B] flex flex-col justify-between p-3 text-white"
                >
                  <img
                    src="/src/assets/images/card_model_outfit_loft_1794470944858.jpg"
                    alt="PRADA Capsule"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="relative z-10 text-[11px] font-bold tracking-[0.22em] uppercase text-center bg-black/45 backdrop-blur-xs rounded-md py-0.5">
                    PRADA
                  </div>
                  <div className="relative z-10 text-[10px] text-zinc-200 font-medium text-center">
                    Milano Archive
                  </div>
                </motion.div>

                {/* Floating Blue "@robin" Bubble */}
                <div className="absolute right-[14%] top-2 z-20 px-3 py-1 rounded-full bg-[#2563EB] text-white text-[11px] font-semibold shadow-md rotate-6">
                  @robin
                </div>
              </div>

              {/* Bottom Copy & CTA */}
              <div>
                <h3
                  className="text-[22px] sm:text-[25px] font-semibold tracking-tight text-[#141414]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Connect, Create, Commerce
                </h3>
                <p className="mt-1.5 text-[13px] text-[#71717A] leading-relaxed">
                  Offering buyers a chance to own a piece of that narrative. These titles and descriptions can help set the tone
                </p>
                <button
                  type="button"
                  onClick={() => setPradaFanExpanded((prev) => !prev)}
                  className="mt-4 px-5 py-2 rounded-full border border-zinc-300 bg-white hover:border-zinc-500 text-[#141414] text-[12px] font-semibold cursor-pointer transition-colors"
                >
                  How it works?
                </button>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BENTO CARD 2 (Top-Right, 7 cols): "Where Art Breathes Commerce" + Cobalt Sculpture
               ------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="lg:col-span-7 rounded-[30px] bg-[#F6F6F7] p-7 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 min-h-[430px] border border-zinc-200/60 overflow-hidden"
            >
              <div className="w-full sm:w-[48%] flex flex-col justify-between h-full">
                <div className="w-10 h-10 rounded-full bg-blue-600/10 text-[#2563EB] flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <div className="my-auto py-4">
                  <h3
                    className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-[#141414] leading-tight"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Where Art Breathes Commerce
                  </h3>
                  <p className="mt-2.5 text-[13.5px] text-[#71717A] leading-relaxed">
                    Artistic spirit with commercial viability, providing a platform where creativity and commerce intersect seamlessly.
                  </p>
                </div>
                <button
                  type="button"
                  className="self-start px-5 py-2 rounded-full border border-zinc-300 bg-white hover:border-zinc-500 text-[#141414] text-[12px] font-semibold cursor-pointer transition-colors"
                >
                  Read more
                </button>
              </div>

              <div className="w-full sm:w-[52%] h-64 sm:h-full rounded-[24px] overflow-hidden shadow-lg bg-[#1D4ED8]">
                <img
                  src="/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg"
                  alt="Where Art Breathes Commerce Cobalt Sculpture"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BENTO CARD 3 (Bottom-Left, 7 cols): "Spin Your Art into Gold" + Pop-Art Creator Banner
               ------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="lg:col-span-7 rounded-[30px] bg-[#F6F6F7] p-7 sm:p-8 flex flex-col justify-between min-h-[420px] border border-zinc-200/60 overflow-hidden"
            >
              <div className="w-full h-56 sm:h-64 rounded-[22px] overflow-hidden shadow-md bg-[#FACC15]">
                <img
                  src="/src/assets/images/bento_popart_creator_1794472951684.jpg"
                  alt="Spin Your Art into Gold"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3
                    className="text-[24px] sm:text-[27px] font-semibold tracking-tight text-[#141414]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Spin Your Art into Gold
                  </h3>
                  <p className="mt-1 text-[13.5px] text-[#71717A] max-w-[420px] leading-relaxed">
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
                BENTO CARD 4 (Bottom-Right, 5 cols): Rising Dark Phone Monolith ("Personal Identity")
               ------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="lg:col-span-5 rounded-[30px] bg-[#F6F6F7] pt-7 px-7 sm:px-8 flex flex-col justify-between min-h-[420px] relative overflow-hidden border border-zinc-200/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#71717A]">
                  MOBILE STUDIO
                </span>
                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#141414]">
                  <Rocket className="w-4 h-4" />
                </div>
              </div>

              {/* Rising Sleek Matte-Black Smartphone Monolith */}
              <motion.div
                initial={{ y: 70 }}
                whileInView={{ y: 12 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-6 w-[230px] sm:w-[250px] h-[310px] rounded-t-[36px] bg-gradient-to-b from-[#27272A] via-[#18181B] to-[#09090B] p-3.5 shadow-[0_-18px_45px_rgba(0,0,0,0.22)] border-t border-x border-zinc-700/80 flex flex-col justify-between text-white"
              >
                {/* Dynamic Island Notch */}
                <div className="w-16 h-1.5 rounded-full bg-zinc-700 mx-auto mt-1" />

                <div className="my-auto px-3 text-center">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 mx-auto mb-3 flex items-center justify-center text-[#EEFF41] font-bold text-sm">
                    AF
                  </div>
                  <div
                    className="text-[19px] font-semibold tracking-tight leading-snug"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Personal
                    <br />
                    Identity
                  </div>
                  <p className="mt-2 text-[11px] text-zinc-400 leading-relaxed">
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
          SECTION 7: "Marketplace for Creativity" CAROUSEL & 4x3 GRID WITH RISING "Trisha Woodward" (00:28 - 00:34)
         =================================================================== */}
      <section
        id="marketplace-creativity-section"
        className="relative w-full bg-white py-24 px-4 sm:px-8 md:px-14 overflow-hidden"
      >
        <div className="max-w-[1220px] mx-auto">
          {/* Part 7A: Header + Purple "Explore All" Button + 4 Horizontal Cards */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#71717A]">
                GET MORE CLOSER
              </span>
              <h2
                className="mt-2 text-[36px] sm:text-[48px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.04] text-[#141414]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Marketplace
                <br />
                for Creativity
              </h2>
              <div className="mt-5 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setCarouselShift((prev) => (prev === 0 ? 1 : 0))}
                  aria-label="Previous marketplace items"
                  className="w-9 h-9 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-[#141414] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCarouselShift((prev) => (prev === 0 ? 1 : 0))}
                  aria-label="Next marketplace items"
                  className="w-9 h-9 rounded-full border border-zinc-200 hover:border-zinc-400 flex items-center justify-center text-[#141414] cursor-pointer"
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
              className="self-start sm:self-end px-6 py-2.5 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-[12.5px] font-semibold tracking-wide shadow-md cursor-pointer"
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
                <div className="relative h-64 rounded-[24px] overflow-hidden bg-zinc-100 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#141414] text-[10.5px] font-semibold">
                    {item.tag}
                  </span>
                </div>
                <div className="mt-3.5 flex items-center justify-between px-1">
                  <div>
                    <h3
                      className="text-[17px] font-semibold text-[#141414]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-[#71717A]">{item.subtitle}</p>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-zinc-200 group-hover:bg-[#141414] group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Part 7B: Floating 5-Icon Dock + 4x3 Background Grid + Central Featured Artist "Trisha Woodward" (00:31 - 00:34) */}
          <div className="mt-24 relative">
            {/* Floating 5-Icon Dock Bar that parts around the rising centerpiece */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10">
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

            {/* 4x3 Background Grid of 12 Square Cards + Central Elevated "Trisha Woodward" Card */}
            <div className="relative">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {BACKGROUND_GRID_TILES.map((tile, idx) => (
                  <motion.div
                    key={`bg-tile-${idx}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: (idx % 4) * 0.05 }}
                    className="h-48 sm:h-56 rounded-[24px] overflow-hidden border border-zinc-200/80 bg-[#FAFAFA] shadow-2xs"
                  >
                    {tile.type === 'image' ? (
                      <img
                        src={tile.image}
                        alt={tile.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full p-5 flex flex-col justify-between bg-white">
                        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#71717A]">
                          {tile.kicker}
                        </span>
                        <div>
                          <h4
                            className="text-[19px] font-semibold text-[#141414]"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          >
                            {tile.title}
                          </h4>
                          <p className="mt-1 text-[12px] text-[#71717A] leading-relaxed">
                            {tile.subtitle}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Central Elevated Burnt-Orange Portrait Card: "Trisha Woodward" / "1,040 artworks" (00:32 - 00:34) */}
              <div className="mt-8 lg:mt-0 lg:pointer-events-none lg:absolute lg:inset-0 flex items-center justify-center z-20">
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.88 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ type: 'spring', stiffness: 210, damping: 24 }}
                  className="pointer-events-auto relative w-full max-w-[350px] sm:max-w-[380px] rounded-[32px] bg-white p-3.5 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.32)] border border-zinc-100"
                >
                  {/* Floating Orange "@artist" Speech Bubble on the Left */}
                  <div className="absolute -left-5 top-14 z-30 px-4 py-1.5 rounded-full bg-[#EA580C] text-white text-[12px] font-semibold shadow-lg -rotate-6">
                    @artist
                  </div>

                  {/* Portrait Image */}
                  <div className="relative h-[380px] sm:h-[410px] rounded-[24px] overflow-hidden bg-[#EA580C]">
                    <img
                      src="/src/assets/images/featured_artist_orange_dress_1794472953183.jpg"
                      alt="Trisha Woodward"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

                    {/* Artist Name & Artwork Count Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[10.5px] uppercase tracking-[0.16em] text-orange-200 font-semibold">
                          FEATURED CREATOR
                        </span>
                        <h3
                          className="text-[24px] font-bold leading-tight"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          Trisha Woodward
                        </h3>
                        <p className="text-[12.5px] text-zinc-200">
                          1,040 artworks
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleToggleLike}
                        aria-label="Like Trisha Woodward"
                        className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95 ${
                          isTrishaLiked
                            ? 'bg-[#E11D48] text-white'
                            : 'bg-white text-[#141414]'
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isTrishaLiked ? 'fill-white' : ''
                          }`}
                        />
                        <span>{(trishaLikes / 1000).toFixed(1)}K</span>
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
