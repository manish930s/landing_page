import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Eye,
  Paintbrush,
  PenTool,
  Palette,
  XCircle,
  Layers,
  Shapes,
  Wand2,
  Plus,
} from 'lucide-react';
import { clamp, lerp, smoothstep } from '../utils/choreography';

interface VisionCardItem {
  id: string;
  title: string;
  artist: string;
  image: string;
  businessImage: string;
  accent: string;
}

const VISION_CARDS: VisionCardItem[] = [
  {
    id: 'vc-1',
    title: 'Solaris Editorial',
    artist: '@alician',
    image: '/src/assets/images/gateway_sunglasses_banner_1794472948136.jpg',
    businessImage: '/src/assets/images/card_summer_cloths_yellow_1794470938002.jpg',
    accent: '#EA580C',
  },
  {
    id: 'vc-2',
    title: 'Cobalt Vision',
    artist: '@howard',
    image: '/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg',
    businessImage: '/src/assets/images/card_winter_cloths_orange_1794470939362.jpg',
    accent: '#2563EB',
  },
  {
    id: 'vc-3',
    title: 'Pop Culture Gold',
    artist: '@robin',
    image: '/src/assets/images/bento_popart_creator_1794472951684.jpg',
    businessImage: '/src/assets/images/card_modern_shorts_beige_1794470941113.jpg',
    accent: '#FACC15',
  },
  {
    id: 'vc-4',
    title: 'Monochrome Dress',
    artist: '@allyson',
    image: '/src/assets/images/featured_artist_orange_dress_1794472953183.jpg',
    businessImage: '/src/assets/images/card_woolan_fashion_studio_1794470942757.jpg',
    accent: '#EA580C',
  },
  {
    id: 'vc-5',
    title: 'Teal Studio',
    artist: '@andrea',
    image: '/src/assets/images/card_jogger_outfit_teal_1794470945448.jpg',
    businessImage: '/src/assets/images/card_model_outfit_loft_1794470944858.jpg',
    accent: '#0D9488',
  },
  {
    id: 'vc-6',
    title: 'Urban Archive',
    artist: '@reatha',
    image: '/src/assets/images/card_summer_cloths_yellow_1794470938002.jpg',
    businessImage: '/src/assets/images/gateway_sunglasses_banner_1794472948136.jpg',
    accent: '#F59E0B',
  },
];

const WAVE_IMAGES = [
  '/src/assets/images/gateway_sunglasses_banner_1794472948136.jpg',
  '/src/assets/images/card_summer_cloths_yellow_1794470938002.jpg',
  '/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg',
  '/src/assets/images/card_winter_cloths_orange_1794470939362.jpg',
  '/src/assets/images/bento_popart_creator_1794472951684.jpg',
  '/src/assets/images/featured_artist_orange_dress_1794472953183.jpg',
  '/src/assets/images/card_modern_shorts_beige_1794470941113.jpg',
  '/src/assets/images/card_woolan_fashion_studio_1794470942757.jpg',
  '/src/assets/images/card_jogger_outfit_teal_1794470945448.jpg',
  '/src/assets/images/card_model_outfit_loft_1794470944858.jpg',
  '/src/assets/images/gateway_sunglasses_banner_1794472948136.jpg',
];

const CREATIVE_TOOLS = [
  { id: 'brush', Icon: Paintbrush, label: 'Brush Studio', rotate: -14 },
  { id: 'pen', Icon: PenTool, label: 'Vector Pen', rotate: 8 },
  { id: 'palette', Icon: Palette, label: 'Color Harmony', rotate: -6 },
  { id: 'clear', Icon: XCircle, label: 'Canvas Reset', rotate: 12 },
  { id: 'layers', Icon: Layers, label: 'Layer Stack', rotate: -10 },
  { id: 'shapes', Icon: Shapes, label: 'Geometric Primitives', rotate: 9 },
  { id: 'wand', Icon: Wand2, label: 'Smart Refine', rotate: -8 },
];

export const VisionFolderSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [waveProgress, setWaveProgress] = useState(0.5);
  const [activeFolderTab, setActiveFolderTab] = useState<'business' | 'personal'>('personal');
  const [activeToolId, setActiveToolId] = useState<string>('brush');
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - window.innerHeight);
        const raw = clamp(-rect.top / scrollable, 0, 1);
        setProgress(raw);
      }
      if (waveSectionRef.current) {
        const wRect = waveSectionRef.current.getBoundingClientRect();
        const total = window.innerHeight + wRect.height;
        const wRaw = clamp((window.innerHeight - wRect.top) / Math.max(1, total), 0, 1);
        setWaveProgress(wRaw);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = viewportWidth < 768 ? 0.62 : viewportWidth < 1100 ? 0.82 : 1;

  // Stage 4A (0.00 -> 0.30): Giant 3-line statement + center stack
  const statementOpacity = 1 - smoothstep(0.18, 0.34, progress);
  const statementScale = lerp(1, 0.94, smoothstep(0.16, 0.34, progress));

  // Stage 4B (0.30 -> 0.64): 6-Card Diagonal Cascade with "Where Art Meets Market" white info card at idx 1
  const cascadeEnter = smoothstep(0.18, 0.42, progress);
  const cascadeExit = smoothstep(0.58, 0.78, progress);
  const cascadeBadgeOpacity = cascadeEnter * (1 - cascadeExit);

  // Stage 4C (0.64 -> 1.00): "Our vision for any art technology." + 3x2 Folder Grid
  const folderStageOpacity = smoothstep(0.64, 0.84, progress);
  const folderStageY = lerp(36, 0, smoothstep(0.64, 0.84, progress));

  return (
    <>
      {/* ===================================================================
          SECTION 4: 3-STAGE SCROLL-SCRUBBED VISION & FOLDER CHOREOGRAPHY (00:13 - 00:20)
         =================================================================== */}
      <section
        ref={containerRef}
        className="relative w-full h-[300vh] bg-white select-none"
      >
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center px-4 sm:px-8 md:px-14">
          <div className="relative w-full max-w-[1260px] h-[640px] flex items-center justify-center mt-8">
            {/* ---------------------------------------------------------------
                STAGE 4A BACKGROUND: Giant 3-Line Editorial Typography (00:13 - 00:14)
               --------------------------------------------------------------- */}
            <div
              style={{
                opacity: statementOpacity,
                transform: `scale(${statementScale})`,
              }}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4"
            >
              <p
                className="text-[28px] sm:text-[44px] md:text-[54px] font-semibold tracking-[-0.03em] leading-[1.14] text-[#141414] max-w-[1040px]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="text-[#D4D4D8]">Whether </span>
                <span>you&apos;re an artist </span>
                <span className="text-[#D4D4D8]">looking to sell your work</span>
                <br />
                <span>or buyer seeking </span>
                <span className="text-[#EA580C]">unique pieces</span>
                <br />
                <span>connects you to world of </span>
                <span className="text-[#D4D4D8]">creativity commerce.</span>
              </p>

              {/* Floating "@alician" (left black bubble) & "@andrea" (right blue bubble) */}
              <div
                style={{ opacity: statementOpacity }}
                className="hidden sm:flex absolute left-[24%] top-[43%] -rotate-6 px-4 py-1.5 rounded-full bg-[#141414] text-white text-[12.5px] font-medium shadow-lg"
              >
                @alician
              </div>
              <div
                style={{ opacity: statementOpacity }}
                className="hidden sm:flex absolute right-[23%] top-[47%] rotate-6 px-4 py-1.5 rounded-full bg-[#2563EB] text-white text-[12.5px] font-medium shadow-lg"
              >
                @andrea
              </div>
            </div>

            {/* ---------------------------------------------------------------
                STAGE 4C LEFT COLUMN & RIGHT FOLDER FRAME ("Our vision for any art technology.")
               --------------------------------------------------------------- */}
            <div
              style={{
                opacity: folderStageOpacity,
                transform: `translate3d(0, ${folderStageY}px, 0)`,
              }}
              className={`absolute inset-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 z-10 ${
                progress > 0.68 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {/* Left Column: Eye Icon + "Our vision for any art technology." + 7 Floating Tool Icons */}
              <div className="w-full lg:w-[36%] flex flex-col items-start justify-between h-full py-10">
                <div>
                  <div className="w-11 h-11 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-center text-[#141414] shadow-xs">
                    <Eye className="w-5 h-5" />
                  </div>

                  <h2
                    className="mt-6 text-[36px] sm:text-[46px] md:text-[52px] font-semibold tracking-[-0.03em] leading-[1.06] text-[#141414]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Our vision
                    <br />
                    for any art
                    <br />
                    technology.
                  </h2>

                  <p className="mt-4 text-[13.5px] sm:text-[14.5px] text-[#71717A] leading-[1.65] max-w-[360px]">
                    Every piece of art tells a story. Echoes of Expression allows artists to showcase their personal journeys through their work.
                  </p>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() =>
                      setActiveFolderTab((prev) =>
                        prev === 'personal' ? 'business' : 'personal'
                      )
                    }
                    className="mt-6 px-5 py-2.5 rounded-full border border-zinc-200 hover:border-zinc-400 bg-white text-[#141414] text-[12.5px] font-semibold tracking-tight shadow-xs cursor-pointer transition-colors"
                  >
                    Read more
                  </motion.button>
                </div>

                {/* Bottom-Left 7 Floating Outlined Creative Tool Icons (00:18 - 00:20) */}
                <div className="hidden sm:flex flex-wrap items-center gap-3 pt-6 max-w-[340px]">
                  {CREATIVE_TOOLS.map(({ id, Icon, label, rotate }) => {
                    const isSelected = activeToolId === id;
                    return (
                      <motion.button
                        key={id}
                        type="button"
                        onClick={() => setActiveToolId(id)}
                        whileHover={{ y: -6, scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        style={{ transform: `rotate(${rotate}deg)` }}
                        title={label}
                        aria-label={label}
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer shadow-xs ${
                          isSelected
                            ? 'border-[#141414] bg-[#141414] text-white'
                            : 'border-zinc-200 bg-white text-[#141414] hover:border-zinc-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Interactive Folder Container Backdrop & Tab Bar (00:17 - 00:20) */}
              <div className="hidden lg:flex flex-col w-[61%] h-[530px] justify-start">
                {/* Folder Top Tabs Row: "Business" | Dark Notched Folder Tab "Personal" | "+ Create" */}
                <div className="flex items-center justify-between w-full mb-3.5 px-2">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveFolderTab('business')}
                      className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-colors cursor-pointer ${
                        activeFolderTab === 'business'
                          ? 'bg-[#141414] text-white shadow-sm'
                          : 'text-[#71717A] hover:text-[#141414]'
                      }`}
                    >
                      Business
                    </button>

                    {/* Signature Dark Folder-Tab Shape for "Personal" */}
                    <button
                      type="button"
                      onClick={() => setActiveFolderTab('personal')}
                      className={`relative px-7 py-2.5 rounded-t-2xl rounded-b-lg text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-3 ${
                        activeFolderTab === 'personal'
                          ? 'bg-[#141414] text-white shadow-md min-w-[210px]'
                          : 'bg-zinc-100 text-[#52525B] hover:bg-zinc-200 min-w-[160px]'
                      }`}
                    >
                      <span>Personal</span>
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#EA580C]" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveFolderTab((prev) =>
                        prev === 'personal' ? 'business' : 'personal'
                      )
                    }
                    className="px-4 py-2 rounded-full border border-zinc-200 hover:border-zinc-400 bg-white text-[#141414] text-[12.5px] font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create</span>
                  </button>
                </div>

                {/* Folder Body Surface where the 6 cards land in a 3x2 grid */}
                <div className="w-full flex-1 rounded-[32px] bg-[#FAFAFA] border border-zinc-200/85 shadow-inner" />
              </div>
            </div>

            {/* ---------------------------------------------------------------
                UNIFIED 6-CARD CHOREOGRAPHY LAYER
                Interpolates smoothly across:
                  Stage 4A (0.00): Center Stack
                  Stage 4B (0.45): 6-Card Diagonal Cascade (Card 1 = "Where Art Meets Market" white card)
                  Stage 4C (0.90): Symmetrical 3x2 Grid inside Right Folder Container
               --------------------------------------------------------------- */}
            <div className="pointer-events-none relative w-full h-full flex items-center justify-center z-20">
              {VISION_CARDS.map((card, idx) => {
                // Stage 4A: Center vertical stack
                const stackX = (idx - 2.5) * 4 * scale;
                const stackY = (idx - 2.5) * 5 * scale;
                const stackRot = (idx - 2.5) * 2.5;
                const stackW = 220 * scale;
                const stackH = 264 * scale;

                // Stage 4B: 6-Card Diagonal Cascade across viewport (top-left to bottom-right)
                const cascadeX = (-425 + idx * 170) * scale;
                const cascadeY = (-135 + idx * 54) * scale;
                const cascadeW = 196 * scale;
                const cascadeH = 232 * scale;

                // Stage 4C: Symmetrical 3x2 Grid centered inside Right Folder Container
                const col = idx % 3;
                const row = Math.floor(idx / 3);
                const gridOriginX = viewportWidth >= 1024 ? 248 * scale : 0;
                const gridOriginY = viewportWidth >= 1024 ? 26 * scale : 110 * scale;
                const gridPitchX = 224 * scale;
                const gridPitchY = 204 * scale;

                const folderX = gridOriginX + (col - 1) * gridPitchX;
                const folderY = gridOriginY + (row - 0.5) * gridPitchY;
                const folderW = 200 * scale;
                const folderH = 184 * scale;

                let x = stackX;
                let y = stackY;
                let w = stackW;
                let h = stackH;
                let rot = stackRot;

                if (progress <= 0.46) {
                  const t1 = smoothstep(0.12, 0.42, progress);
                  x = lerp(stackX, cascadeX, t1);
                  y = lerp(stackY, cascadeY, t1);
                  w = lerp(stackW, cascadeW, t1);
                  h = lerp(stackH, cascadeH, t1);
                  rot = lerp(stackRot, 0, t1);
                } else {
                  const t2 = smoothstep(0.48, 0.72, progress);
                  x = lerp(cascadeX, folderX, t2);
                  y = lerp(cascadeY, folderY, t2);
                  w = lerp(cascadeW, folderW, t2);
                  h = lerp(cascadeH, folderH, t2);
                  rot = 0;
                }

                const showEditorialWhiteCard = idx === 1 && cascadeBadgeOpacity > 0.15;
                const imgSrc =
                  activeFolderTab === 'business' ? card.businessImage : card.image;

                return (
                  <div
                    key={card.id}
                    style={{
                      width: `${Math.round(w)}px`,
                      height: `${Math.round(h)}px`,
                      transform: `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) rotate(${rot.toFixed(2)}deg)`,
                      zIndex: 30 + idx,
                    }}
                    className="pointer-events-auto absolute rounded-[22px] shadow-[0_18px_38px_-14px_rgba(0,0,0,0.20)] transition-shadow duration-200"
                  >
                    {/* Card Inner Visual */}
                    <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-zinc-100 border border-white/80">
                      <img
                        src={imgSrc}
                        alt={card.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />

                      {/* Stage 4B Card 2 ("Where Art Meets Market") White Editorial Info Overlay (00:15 - 00:16) */}
                      {showEditorialWhiteCard && (
                        <div
                          style={{ opacity: cascadeBadgeOpacity }}
                          className="absolute inset-0 bg-white p-5 flex flex-col justify-between border border-zinc-200 rounded-[22px]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#EA580C]">
                              ARTFUSION
                            </span>
                            <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                          </div>
                          <div>
                            <h4
                              className="text-[17px] font-bold text-[#141414] leading-snug"
                              style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                              Where Art Meets Market
                            </h4>
                            <p className="mt-1.5 text-[11.5px] text-[#71717A] leading-relaxed">
                              Allowing artists to showcase their work and buyers to find unique, inspiring pieces.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Stage 4B Card 4 ("@allyson" Yellow Speech Bubble at 00:15 - 00:16) */}
                    {idx === 3 && cascadeBadgeOpacity > 0.1 && (
                      <div
                        style={{ opacity: cascadeBadgeOpacity }}
                        className="absolute -top-4 -right-6 px-3.5 py-1 rounded-full bg-[#FACC15] text-[#141414] text-[11.5px] font-semibold shadow-md rotate-6 z-40 whitespace-nowrap"
                      >
                        @allyson
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5: "You will find yourself among us" DUAL-ARC COMMUNITY WAVE (00:21 - 00:23)
         =================================================================== */}
      <section
        ref={waveSectionRef}
        className="relative w-full bg-white py-28 overflow-hidden select-none"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          {/* Top Arched Wave of 11 Floating Art Cards */}
          <div className="relative w-full flex items-center justify-center gap-3 sm:gap-5 px-4 overflow-visible">
            {WAVE_IMAGES.map((src, i) => {
              const norm = i - (WAVE_IMAGES.length - 1) / 2;
              const archY = Math.sin((i / (WAVE_IMAGES.length - 1)) * Math.PI) * -42;
              const scrollDriftX = (waveProgress - 0.5) * -90;
              const tilt = norm * 2.2;
              return (
                <motion.div
                  key={`top-wave-${i}`}
                  style={{
                    transform: `translate3d(${scrollDriftX}px, ${archY}px, 0) rotate(${tilt}deg)`,
                  }}
                  whileHover={{ scale: 1.12, y: archY - 10, zIndex: 30 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-md border border-zinc-100 shrink-0 bg-zinc-100 cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`Community artwork ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Center Editorial Statement ("You will find yourself among us") */}
          <div className="my-16 sm:my-20 px-4 text-center max-w-[680px] z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-[36px] sm:text-[52px] md:text-[60px] font-semibold tracking-[-0.03em] leading-[1.06] text-[#141414]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              You will find yourself
              <br />
              among us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-[14px] sm:text-[15px] text-[#71717A] leading-relaxed max-w-[440px] mx-auto"
            >
              Dive into a dynamic community where artists and buyers seamlessly merge.
            </motion.p>
          </div>

          {/* Bottom Inverted Arched Wave of 11 Floating Art Cards */}
          <div className="relative w-full flex items-center justify-center gap-3 sm:gap-5 px-4 overflow-visible">
            {[...WAVE_IMAGES].reverse().map((src, i) => {
              const norm = i - (WAVE_IMAGES.length - 1) / 2;
              const archY = Math.sin((i / (WAVE_IMAGES.length - 1)) * Math.PI) * 42;
              const scrollDriftX = (waveProgress - 0.5) * 90;
              const tilt = -norm * 2.2;
              return (
                <motion.div
                  key={`bottom-wave-${i}`}
                  style={{
                    transform: `translate3d(${scrollDriftX}px, ${archY}px, 0) rotate(${tilt}deg)`,
                  }}
                  whileHover={{ scale: 1.12, y: archY - 10, zIndex: 30 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-md border border-zinc-100 shrink-0 bg-zinc-100 cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`Creator showcase ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
