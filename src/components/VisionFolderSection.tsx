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
    title: 'Cobalt Eye Study',
    artist: '@reatha',
    image: '/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg',
    businessImage: '/src/assets/images/gateway_sunglasses_banner_1794472948136.jpg',
    accent: '#2563EB',
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
  '/src/assets/images/bento_cobalt_art_sculpture_1794472950567.jpg',
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
  const [progress, setProgress] = useState(0);
  const [activeFolderTab, setActiveFolderTab] = useState<'business' | 'personal'>('personal');
  const [activeToolId, setActiveToolId] = useState<string>('brush');
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [viewportHeight, setViewportHeight] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerHeight : 900
  );

  useEffect(() => {
    const onResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
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
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scale proportionally with both viewportWidth and viewportHeight so normal preview, fullscreen laptops, and mobile devices have clean proportions
  const scale =
    viewportWidth < 768
      ? clamp(Math.min(viewportWidth / 640, viewportHeight / 820), 0.46, 0.65)
      : viewportWidth < 1024
      ? clamp(Math.min(viewportWidth / 1100, viewportHeight / 820), 0.68, 0.85)
      : clamp(
          Math.min(viewportWidth / 1400, (viewportHeight / 820) * 1.05),
          0.82,
          1.75
        );

  // Stage 4A (0.00 -> 0.30): Giant 3-line statement + center stack (sec_14.png)
  const statementOpacity = 1 - smoothstep(0.18, 0.34, progress);
  const statementScale = lerp(1, 0.94, smoothstep(0.16, 0.34, progress));

  // Stage 4B (0.30 -> 0.64): 6-Card Diagonal Cascade with "Where Art Meets Market" white info card at idx 1
  const cascadeEnter = smoothstep(0.18, 0.42, progress);
  const cascadeExit = smoothstep(0.58, 0.78, progress);
  const cascadeBadgeOpacity = cascadeEnter * (1 - cascadeExit);

  // Stage 4C (0.64 -> 1.00): "Our vision for any art technology." + 3x2 Folder Grid (sec_19.png)
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
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center px-6 sm:px-10 lg:px-[5vw]">
          <div
            style={{ height: `${Math.round(540 * scale)}px` }}
            className="relative w-full flex items-center justify-center mt-6"
          >
            {/* ---------------------------------------------------------------
                STAGE 4A BACKGROUND: Giant 3-Line Editorial Typography (00:13 - 00:14, sec_14.png)
               --------------------------------------------------------------- */}
            <div
              style={{
                opacity: statementOpacity,
                transform: `scale(${statementScale})`,
              }}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4"
            >
              <p
                className="text-[28px] sm:text-[44px] md:text-[4.1vw] font-semibold tracking-[-0.03em] leading-[1.12] text-[#141414] max-w-[86vw]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="text-[#D4D4D8]">Whether </span>
                <span>you&apos;re an artist </span>
                <span className="text-[#D4D4D8]">looking to sell your work</span>
                <br />
                <span>or buyer seeking </span>
                <span className="text-[#EA580C]">unique pieces</span>
                <span> connects</span>
                <br />
                <span>you to world of </span>
                <span className="text-[#D4D4D8]">creativity commerce.</span>
              </p>

              {/* Floating "@alician" (left black bubble) & "@andrea" (right blue bubble) */}
              <div
                style={{ opacity: statementOpacity }}
                className="hidden sm:flex absolute left-[22%] top-[44%] -rotate-6 px-4 py-1.5 rounded-full bg-[#141414] text-white text-[12.5px] font-medium shadow-lg z-40"
              >
                @alician
              </div>
              <div
                style={{ opacity: statementOpacity }}
                className="hidden sm:flex absolute right-[21%] top-[47%] rotate-6 px-4 py-1.5 rounded-full bg-[#2563EB] text-white text-[12.5px] font-medium shadow-lg z-40"
              >
                @andrea
              </div>
            </div>

            {/* ---------------------------------------------------------------
                STAGE 4C LEFT COLUMN & RIGHT FOLDER FRAME ("Our vision for any art technology." sec_19.png)
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
              <div className="w-full lg:w-[35%] flex flex-col items-start justify-between h-full py-4">
                <div>
                  <div className="w-12 h-12 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center text-[#141414] shadow-xs">
                    <Eye className="w-5 h-5" />
                  </div>

                  <h2
                    className="mt-6 text-[36px] sm:text-[46px] lg:text-[3.8vw] font-semibold tracking-[-0.03em] leading-[1.04] text-[#141414]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Our vision
                    <br />
                    for any art
                    <br />
                    <span className="text-[#A1A1AA]">technology.</span>
                  </h2>

                  <p className="mt-4 text-[13.5px] sm:text-[14.5px] xl:text-[1.02vw] text-[#71717A] leading-[1.65] max-w-[360px] xl:max-w-[26vw]">
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
                    className="mt-6 px-6 py-2.5 rounded-full border border-zinc-200 hover:border-zinc-400 bg-white text-[#141414] text-[12.5px] font-semibold tracking-tight shadow-xs cursor-pointer transition-colors"
                  >
                    Read more
                  </motion.button>
                </div>

                {/* Bottom-Left 7 Floating Outlined Creative Tool Icons (00:18 - 00:20, sec_19.png) */}
                <div className="hidden sm:flex flex-wrap items-center gap-3 pt-4 max-w-[380px]">
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

              {/* Right Column: Interactive Folder Container Backdrop & Full-Width Dark Notched Folder Header (sec_19.png) */}
              <div
                style={{ height: `${Math.round(520 * scale)}px` }}
                className="hidden lg:flex flex-col w-[62%] justify-start"
              >
                {/* Exact Folder Header Bar from sec_19.png: "Business" light tab on left + Full-Width Dark Notched "Personal" Folder Bar */}
                <div className="relative flex items-end w-full h-14 mb-3">
                  {/* Back Left Light Folder Tab: "Business" */}
                  <button
                    type="button"
                    onClick={() => setActiveFolderTab('business')}
                    className={`h-12 px-7 rounded-t-[20px] text-[13.5px] font-semibold transition-colors cursor-pointer flex items-center ${
                      activeFolderTab === 'business'
                        ? 'bg-[#18181B] text-white z-20'
                        : 'bg-[#F4F4F5] text-[#71717A] hover:text-[#141414] z-10'
                    }`}
                  >
                    Business
                  </button>

                  {/* Front Full-Width Dark Notched Folder Bar: "Personal" + "+ Create" (sec_19.png) */}
                  <div
                    onClick={() => setActiveFolderTab('personal')}
                    className={`flex-1 h-13 -ml-2 rounded-t-[22px] rounded-tr-[24px] px-7 flex items-center justify-between cursor-pointer transition-colors shadow-md ${
                      activeFolderTab === 'personal'
                        ? 'bg-[#18181B] text-white z-20'
                        : 'bg-zinc-200 text-[#141414] z-10'
                    }`}
                  >
                    <span className="text-[14px] font-semibold tracking-tight">
                      Personal
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveFolderTab((prev) =>
                          prev === 'personal' ? 'business' : 'personal'
                        );
                      }}
                      className="px-4 py-1.5 rounded-full bg-white text-[#141414] text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs hover:bg-zinc-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create</span>
                    </button>
                  </div>
                </div>

                {/* Folder Body Surface where the 6 cards land in a 3x2 grid */}
                <div className="w-full flex-1 rounded-b-[32px] rounded-tl-[24px] bg-[#FAFAFA]/70 border border-zinc-200/75" />
              </div>
            </div>

            {/* ---------------------------------------------------------------
                UNIFIED 6-CARD CHOREOGRAPHY LAYER
                Interpolates smoothly across:
                  Stage 4A (0.00): Center Diagonally-Offset Stack (sec_14.png)
                  Stage 4B (0.45): 6-Card Diagonal Cascade (Card 1 = "Where Art Meets Market" white card)
                  Stage 4C (0.90): Symmetrical 3x2 Grid inside Right Folder Container (sec_19.png)
               --------------------------------------------------------------- */}
            <div className="pointer-events-none relative w-full h-full flex items-center justify-center z-20">
              {VISION_CARDS.map((card, idx) => {
                // Stage 4A: Center diagonal stack (sec_14.png shows cards fanned upward-right behind the front card)
                const stackX = (2.5 - idx) * -12 * scale;
                const stackY = (2.5 - idx) * -12 * scale;
                const stackRot = (idx - 2.5) * 1.4;
                const stackW = 225 * scale;
                const stackH = 268 * scale;

                // Stage 4B: 6-Card Diagonal Cascade across viewport (top-left to bottom-right)
                const cascadeX = (-425 + idx * 170) * scale;
                const cascadeY = (-135 + idx * 54) * scale;
                const cascadeW = 198 * scale;
                const cascadeH = 234 * scale;

                // Stage 4C: Symmetrical 3x2 Grid centered inside Right Folder Container (w-[62%] on right of 90vw container -> center offset = +19% of 90vw = +0.171 * viewportWidth)
                const col = idx % 3;
                const row = Math.floor(idx / 3);
                const gridOriginX =
                  viewportWidth >= 1024 ? viewportWidth * 0.171 : 0;
                const gridOriginY = viewportWidth >= 1024 ? 28 * scale : 110 * scale;
                const gridPitchX = 236 * scale;
                const gridPitchY = 208 * scale;

                const folderX = gridOriginX + (col - 1) * gridPitchX;
                const folderY = gridOriginY + (row - 0.5) * gridPitchY;
                const folderW = 216 * scale;
                const folderH = 192 * scale;

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
          SECTION 5: "You will find yourself among us" CONTINUOUS ANIMATED WAVE (00:21 - 00:23, sec_22.png)
         =================================================================== */}
      <section
        className="relative w-full bg-white py-28 sm:py-32 overflow-hidden select-none"
      >
        <div className="w-full flex flex-col items-center">
          {/* Top Continuously Moving Wave of Art Cards (gliding right-to-left with gentle arch bob) */}
          <div className="relative w-full overflow-hidden py-12">
            <div className="flex items-center w-max animate-wave-left">
              {[0, 1].map((dup) => (
                <div
                  key={`top-wave-track-${dup}`}
                  className="flex items-center gap-4 sm:gap-5 lg:gap-[1.35vw] pr-4 sm:pr-5 lg:pr-[1.35vw]"
                >
                  {WAVE_IMAGES.map((src, i) => {
                    const archY = Math.round(
                      Math.sin((i / (WAVE_IMAGES.length - 1)) * Math.PI) * -36
                    );
                    const tilt = ((i % 5) - 2) * 1.8;
                    return (
                      <div
                        key={`top-wave-${dup}-${i}`}
                        style={
                          {
                            '--arch-y': `${archY}px`,
                            '--card-tilt': `${tilt}deg`,
                            animationDelay: `${i * 0.28}s`,
                          } as React.CSSProperties
                        }
                        className="animate-wave-bob w-24 h-28 sm:w-28 sm:h-32 lg:w-[7.6vw] lg:h-[8.8vw] rounded-[22px] overflow-hidden shadow-[0_14px_30px_-10px_rgba(0,0,0,0.18)] border border-zinc-100 shrink-0 bg-zinc-100 cursor-pointer hover:scale-110 transition-transform duration-300"
                      >
                        <img
                          src={src}
                          alt={`Community artwork ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Center Editorial Statement ("You will find yourself among us" matching sec_22.png) */}
          <div className="my-10 sm:my-14 px-6 text-center max-w-[820px] z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-[38px] sm:text-[54px] md:text-[4.6vw] font-semibold tracking-[-0.03em] leading-[1.04] text-[#141414]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              You will find yourself
              <br />
              <span className="text-[#A1A1AA]">among us</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-[14px] sm:text-[15px] xl:text-[1.08vw] text-[#71717A] leading-relaxed max-w-[460px] xl:max-w-[32vw] mx-auto"
            >
              Dive into a dynamic community where artists and buyers seamlessly merge.
            </motion.p>
          </div>

          {/* Bottom Continuously Moving Wave of Art Cards (gliding left-to-right with gentle arch bob) */}
          <div className="relative w-full overflow-hidden py-12">
            <div className="flex items-center w-max animate-wave-right">
              {[0, 1].map((dup) => (
                <div
                  key={`bottom-wave-track-${dup}`}
                  className="flex items-center gap-4 sm:gap-5 lg:gap-[1.35vw] pr-4 sm:pr-5 lg:pr-[1.35vw]"
                >
                  {[...WAVE_IMAGES].reverse().map((src, i) => {
                    const archY = Math.round(
                      Math.sin((i / (WAVE_IMAGES.length - 1)) * Math.PI) * 36
                    );
                    const tilt = -((i % 5) - 2) * 1.8;
                    return (
                      <div
                        key={`bottom-wave-${dup}-${i}`}
                        style={
                          {
                            '--arch-y': `${archY}px`,
                            '--card-tilt': `${tilt}deg`,
                            animationDelay: `${i * 0.32}s`,
                          } as React.CSSProperties
                        }
                        className="animate-wave-bob w-24 h-28 sm:w-28 sm:h-32 lg:w-[7.6vw] lg:h-[8.8vw] rounded-[22px] overflow-hidden shadow-[0_14px_30px_-10px_rgba(0,0,0,0.18)] border border-zinc-100 shrink-0 bg-zinc-100 cursor-pointer hover:scale-110 transition-transform duration-300"
                      >
                        <img
                          src={src}
                          alt={`Creator showcase ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
