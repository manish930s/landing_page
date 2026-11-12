import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import {
  PRODUCTS,
  AVAILABLE_COLORS,
  AVAILABLE_SIZES,
  SizeOption,
} from './data/products';
import {
  computeHeroToShowcaseTransform,
  smoothstep,
  lerp,
  clamp,
  addItemToCart,
  getCartTotalCount,
  getInitialCart,
  CartItem,
} from './utils/choreography';
import { Navbar } from './components/Navbar';
import { SpeechBadges } from './components/SpeechBadges';
import { CartDrawer } from './components/CartDrawer';
import { ShowcaseGatewaySection } from './components/ShowcaseGatewaySection';
import { VisionFolderSection } from './components/VisionFolderSection';
import { StoryMarketplaceSection } from './components/StoryMarketplaceSection';
import { MembershipFooterSection } from './components/MembershipFooterSection';

export default function App() {
  // Check URL params for ?autostart=1 or ?stage=...
  const getInitialPhase = (): 'stack-enter' | 'stack-rise' | 'stack-shuffle' | 'ready' => {
    if (typeof window === 'undefined') return 'ready';
    const params = new URLSearchParams(window.location.search);
    const stage = params.get('stage');
    if (stage === 'stack') return 'stack-rise';
    if (stage === 'shuffle') return 'stack-shuffle';
    if (params.get('autostart') === '1' || stage) {
      return 'ready';
    }
    return 'stack-enter';
  };

  const [introPhase, setIntroPhase] = useState<
    'stack-enter' | 'stack-rise' | 'stack-shuffle' | 'ready'
  >(getInitialPhase);

  // Normalized scroll progress [0..1] within the top Hero -> Showcase Cascade container (first 245vh)
  const [heroScrollProgress, setHeroScrollProgress] = useState<number>(0);
  const [pageScrollY, setPageScrollY] = useState<number>(0);

  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [viewportHeight, setViewportHeight] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerHeight : 900
  );

  // Product Quick-View modal state (when clicking "Buy Now" on any Hero card)
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(3);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<SizeOption>('S');
  const [selectedColorId, setSelectedColorId] = useState<string>('white');
  const [cart, setCart] = useState<CartItem[]>(getInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [cascadeRotationOffset, setCascadeRotationOffset] = useState<number>(0);

  const heroStageRef = useRef<HTMLDivElement | null>(null);
  const heroProgressProxyRef = useRef<{ value: number }>({ value: 0 });
  const introTimersRef = useRef<number[]>([]);

  const clearIntroTimers = useCallback(() => {
    introTimersRef.current.forEach((id) => window.clearTimeout(id));
    introTimersRef.current = [];
  }, []);

  // Exact bottom-up Card Stack Rise -> Stack Shuffle -> Hero Fan sequence (untouched!)
  const runIntroSequence = useCallback(() => {
    clearIntroTimers();
    gsap.killTweensOf(heroProgressProxyRef.current);
    window.scrollTo({ top: 0, behavior: 'auto' });
    heroProgressProxyRef.current.value = 0;
    setHeroScrollProgress(0);
    setIntroPhase('stack-enter');

    // Step 1: Cards immediately rise from the bottom into the center stack (Card 4 Woolan Fashion on top)
    const t1 = window.setTimeout(() => {
      setIntroPhase('stack-rise');
    }, 60);

    // Step 2: At 950ms, Card 1 (Summer Cloths) shuffles to top of center deck
    const t2 = window.setTimeout(() => {
      setIntroPhase('stack-shuffle');
    }, 950);

    // Step 3: At 1750ms, all 6 cards fan out into "The Ultimate COLLECTIONS" & Navbar animates in
    const t3 = window.setTimeout(() => {
      setIntroPhase('ready');
    }, 1750);

    introTimersRef.current = [t1, t2, t3];
  }, [clearIntroTimers]);

  // Run intro on initial mount unless ?autostart=1 or ?stage=... was provided
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') !== '1' && !params.get('stage')) {
      runIntroSequence();
    }
    return () => clearIntroTimers();
  }, [runIntroSequence, clearIntroTimers]);

  // Responsive viewport listener tracking both width and height
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Native window scroll -> GSAP smoothed heroScrollProgress sync
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setPageScrollY(currentY);

      if (!heroStageRef.current) return;
      const stageHeight = heroStageRef.current.offsetHeight;
      const scrollableHeroDistance = Math.max(1, stageHeight - window.innerHeight);
      const rawHeroProgress = clamp(currentY / scrollableHeroDistance, 0, 1);

      // If user scrolls during intro, immediately finish intro so scroll feels instant
      if (rawHeroProgress > 0.02 && introPhase !== 'ready') {
        clearIntroTimers();
        setIntroPhase('ready');
      }

      gsap.to(heroProgressProxyRef.current, {
        value: rawHeroProgress,
        duration: 0.28,
        ease: 'power3.out',
        overwrite: 'auto',
        onUpdate: () => {
          setHeroScrollProgress(heroProgressProxyRef.current.value);
        },
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [introPhase, clearIntroTimers]);

  // Smooth scroll to a Y offset or section
  const smoothScrollToY = useCallback(
    (targetY: number, duration = 1.1) => {
      clearIntroTimers();
      setIntroPhase('ready');
      const scrollObj = { y: window.scrollY };
      gsap.to(scrollObj, {
        y: targetY,
        duration,
        ease: 'power3.inOut',
        onUpdate: () => {
          window.scrollTo({ top: scrollObj.y, behavior: 'auto' });
        },
      });
    },
    [clearIntroTimers]
  );

  // Navigation handler for the Top Navbar ("Fashion.", "Home", "Product", "About Us", "Contact")
  const handleNavigate = (target: 'home' | 'product' | 'detail' | 'contact') => {
    if (target === 'home') {
      smoothScrollToY(0, 0.95);
    } else if (target === 'product') {
      if (heroStageRef.current) {
        const targetY = Math.max(0, heroStageRef.current.offsetHeight - window.innerHeight);
        smoothScrollToY(targetY, 1.05);
      }
    } else if (target === 'detail') {
      const el = document.getElementById('gateway-section');
      if (el) {
        smoothScrollToY(el.offsetTop - 40, 1.1);
      }
    } else if (target === 'contact') {
      setIsContactOpen(true);
    }
  };

  // Explore More button in Hero -> smoothly transitions into the Showcase Cascade section (00:04 - 00:06)
  const handleExploreMore = () => {
    if (heroStageRef.current) {
      const targetY = Math.max(0, heroStageRef.current.offsetHeight - window.innerHeight);
      smoothScrollToY(targetY, 1.15);
    }
  };

  // Clicking Buy Now on a Hero card -> opens Product Quick-View Modal
  const handleSelectProductDetail = (index: number) => {
    setSelectedProductIndex(index);
    setIsProductModalOpen(true);
  };

  // Add to cart handler
  const handleAddToCart = () => {
    const activeProduct = PRODUCTS[selectedProductIndex] || PRODUCTS[3];
    const colorObj =
      AVAILABLE_COLORS.find((c) => c.id === selectedColorId) ||
      AVAILABLE_COLORS[1];
    setCart((prev) =>
      addItemToCart(prev, activeProduct, selectedSize, colorObj)
    );
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1600);
  };

  const handleUpdateCartQuantity = (idx: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const isStackPhase = introPhase !== 'ready';

  // 1. Hero Headline ("The Ultimate COLLECTIONS") opacity & upward scroll exit
  const heroTitleOpacity = isStackPhase
    ? 0
    : 1 - smoothstep(0.03, 0.32, heroScrollProgress);
  const heroTitleY = isStackPhase
    ? 38
    : -smoothstep(0.0, 0.36, heroScrollProgress) * 150;

  // 2. Hero Footer ("We Do Not Divide Our Collections..." + "Explore More")
  const heroFooterOpacity = isStackPhase
    ? 0
    : 1 - smoothstep(0.02, 0.26, heroScrollProgress);
  const heroFooterY = isStackPhase
    ? 44
    : -smoothstep(0.0, 0.30, heroScrollProgress) * 100;

  // 3. Section 2 ("Showcase, Sell, & acquire arts to our marketplace.") left column & floating badges (00:05 - 00:06)
  const showcaseEnter = smoothstep(0.46, 0.86, heroScrollProgress);
  const showcaseY = lerp(52, 0, showcaseEnter);

  const activeSection: 'home' | 'product' | 'detail' | 'contact' = isContactOpen
    ? 'contact'
    : heroScrollProgress < 0.4
    ? 'home'
    : pageScrollY < 1800
    ? 'product'
    : 'detail';

  const activeProduct = PRODUCTS[selectedProductIndex] || PRODUCTS[3];

  return (
    <div id="top" className="relative w-full bg-white text-[#141414] select-none">
      {/* =====================================================================
           TOP NAVIGATION BAR ("Fashion." Navbar — hidden during bottom-up card rise,
           animates in smoothly when cards expand into "The Ultimate COLLECTIONS")
          ===================================================================== */}
      <Navbar
        isVisible={!isStackPhase}
        isScrolled={pageScrollY > 40}
        activeSection={activeSection}
        cartCount={getCartTotalCount(cart)}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onReplayTour={runIntroSequence}
      />

      {/* =====================================================================
           SECTION 1 & 2 PINNED STAGE:
           - 00:00 - 00:03: Exact Bottom-Up Card Stack Rise -> Shuffle -> "The Ultimate COLLECTIONS" Hero Fan
           - 00:04 - 00:06: Scroll-Scrubbed Center Stack -> 5-Card Diagonal Showcase Cascade + "Showcase, Sell, & acquire arts to our marketplace."
          ===================================================================== */}
      <div
        ref={heroStageRef}
        className="relative w-full h-[245vh] bg-white"
      >
        <div className="sticky top-0 w-screen h-screen bg-white overflow-hidden flex flex-col justify-between">
          {/* Floating Left Teal ("Get upto 30% OFF") & Right Orange ("Best Product") Speech Bubbles in Hero */}
          <SpeechBadges
            introPhase={introPhase}
            scrollProgress={heroScrollProgress * 1.8}
            viewportWidth={viewportWidth}
            viewportHeight={viewportHeight}
          />

          <main className="relative flex-1 w-full h-full flex flex-col items-center justify-center overflow-hidden px-5 sm:px-10 lg:px-[5vw]">
            {/* ---------------------------------------------------------------
                 1. HERO HEADLINE ("The Ultimate COLLECTIONS")
                    Uses both vw and vh bounds so it never collides with cards on 16:9 fullscreen laptops
                --------------------------------------------------------------- */}
            <motion.div
              initial={false}
              animate={{
                opacity: heroTitleOpacity,
                y: heroTitleY,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[clamp(64px,10.5vh,124px)] left-0 right-0 flex flex-col items-center text-center z-20 pointer-events-none px-4"
            >
              <span
                className="text-[clamp(22px,min(2.6vw,4.2vh),44px)] font-normal tracking-tight text-[#141414] leading-[1.1]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                The Ultimate
              </span>
              <h1
                className="mt-0.5 text-[clamp(32px,min(4.4vw,6.8vh),74px)] font-semibold tracking-[-0.02em] text-[#141414] leading-[1.0] uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                COLLECTIONS
              </h1>
            </motion.div>

            {/* ---------------------------------------------------------------
                 2. SECTION 2 LEFT EDITORIAL COLUMN ("Showcase, Sell, & acquire arts to our marketplace." at 00:05 - 00:06)
                --------------------------------------------------------------- */}
            <div
              style={{
                opacity: showcaseEnter,
                transform: `translate3d(0, ${showcaseY}px, 0)`,
              }}
              className={`absolute left-5 sm:left-10 lg:left-[5vw] right-5 md:right-auto top-[11%] md:top-1/2 md:-translate-y-1/2 w-auto md:w-full max-w-[490px] xl:max-w-[38vw] z-30 ${
                heroScrollProgress > 0.55 ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              <div className="text-[11px] sm:text-[12px] xl:text-[0.85vw] font-bold tracking-[0.2em] uppercase">
                <span className="text-[#141414]">E-</span>
                <span className="text-[#E11D48]">COMMERCE</span>
              </div>

              <h2
                className="mt-2 sm:mt-3 text-[32px] sm:text-[48px] md:text-[clamp(38px,min(4.4vw,6.5vh),72px)] font-semibold tracking-[-0.035em] leading-[1.02]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <span className="block text-[#141414]">Showcase, Sell,</span>
                <span className="block text-[#141414]">&amp; acquire arts to</span>
                <span
                  className="block transition-colors duration-300"
                  style={{
                    color:
                      heroScrollProgress > 0.85 ? '#141414' : '#A1A1AA',
                  }}
                >
                  our marketplace.
                </span>
              </h2>

              <p className="mt-3 sm:mt-5 text-[13px] sm:text-[15px] xl:text-[1.05vw] text-[#71717A] leading-[1.6] max-w-[420px] xl:max-w-[30vw]">
                Dynamic community where artists and buyers seamlessly merge. ArtFusion brings together creators and enthusiasts to share creativity.
              </p>

              <div className="mt-5 sm:mt-7 flex items-center gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const el = document.getElementById('membership-section');
                    if (el) smoothScrollToY(el.offsetTop - 20, 1.2);
                  }}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#141414] hover:bg-zinc-800 text-white text-[12px] sm:text-[13px] xl:text-[0.95vw] font-semibold tracking-tight shadow-[0_12px_28px_-8px_rgba(0,0,0,0.35)] cursor-pointer"
                >
                  Join for $9.99/m
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const el = document.getElementById('gateway-section');
                    if (el) smoothScrollToY(el.offsetTop - 20, 1.05);
                  }}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-zinc-200 hover:border-zinc-400 bg-white text-[#141414] text-[12px] sm:text-[13px] xl:text-[0.95vw] font-semibold tracking-tight cursor-pointer transition-colors"
                >
                  Read more
                </motion.button>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                 3. UNIFIED 6-CARD CHOREOGRAPHY STAGE
                    - Bottom Stack Rise -> Shuffle -> "The Ultimate COLLECTIONS" Hero Fan
                    - Center Stack Gather (0.40) -> 5-Card Diagonal Showcase Cascade on Right (1.00)
                --------------------------------------------------------------- */}
            <div
              className="relative w-full h-full flex items-center justify-center z-20"
              data-testid="card-choreography-stage"
            >
              {PRODUCTS.map((product, idx) => {
                const shiftedIdx =
                  heroScrollProgress > 0.6
                    ? (idx + cascadeRotationOffset) % PRODUCTS.length
                    : idx;
                const virtualProduct = { ...product, index: shiftedIdx };

                const transform = computeHeroToShowcaseTransform(
                  virtualProduct,
                  introPhase,
                  heroScrollProgress,
                  viewportWidth,
                  viewportHeight
                );

                const isHovered =
                  hoveredCardIndex === idx &&
                  introPhase === 'ready';

                const hoverLiftY = isHovered ? -8 : 0;
                const hoverScale = isHovered ? 1.025 : transform.scale;

                return (
                  <motion.div
                    key={product.id}
                    initial={{
                      x: product.stackOrder.initialX,
                      y: 440,
                      rotate: product.stackOrder.initialRotate,
                      scale: 0.92,
                      opacity: 1,
                    }}
                    animate={{
                      x: transform.x,
                      y: transform.y + hoverLiftY,
                      width: transform.width,
                      height: transform.height,
                      rotate: transform.rotate,
                      scale: hoverScale,
                      opacity: transform.opacity,
                    }}
                    transition={
                      isStackPhase
                        ? {
                            type: 'spring',
                            stiffness: 190,
                            damping: 23,
                            mass: 0.9,
                          }
                        : {
                            type: 'spring',
                            stiffness: 280,
                            damping: 30,
                            mass: 0.75,
                          }
                    }
                    style={{
                      zIndex: isHovered ? 90 : transform.zIndex,
                    }}
                    onMouseEnter={() => setHoveredCardIndex(idx)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                    className="absolute flex flex-col items-stretch"
                  >
                    {/* Card Visual Frame */}
                    <div
                      onClick={() => handleSelectProductDetail(idx)}
                      style={{
                        borderRadius: `${transform.borderRadius}px`,
                      }}
                      className="relative w-full h-full overflow-hidden bg-zinc-100 shadow-[0_20px_42px_-12px_rgba(0,0,0,0.24)] cursor-pointer transition-shadow duration-200"
                    >
                      {/* High-Resolution Studio Photograph */}
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        draggable={false}
                        className="w-full h-full object-cover object-center select-none"
                        style={{
                          backgroundColor: product.accentColor,
                        }}
                      />

                      {/* Top-Right "Buy Now" Pill (Shown in Hero Fan) */}
                      <AnimatePresence>
                        {transform.showBuyNow && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute top-2 sm:top-3.5 z-10 ${
                              idx < 3 && heroScrollProgress < 0.2
                                ? 'left-2 sm:left-auto sm:right-5'
                                : 'right-2 sm:right-3.5'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectProductDetail(idx);
                              }}
                              aria-label={`Buy ${product.name} now`}
                              className="px-2 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full bg-white/95 hover:bg-white text-[#141414] text-[8px] sm:text-[11px] lg:text-[clamp(10.5px,0.75vw,13px)] font-semibold tracking-tight shadow-sm transition-transform hover:scale-105 cursor-pointer whitespace-nowrap shrink-0"
                            >
                              Buy Now
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}

              {/* Floating "@howard" (burgundy) & "@robin" (black) Speech Bubbles on the Right Diagonal Cascade (00:05 - 00:06) */}
              <div
                style={{ opacity: showcaseEnter }}
                className="pointer-events-none hidden md:block absolute inset-0 z-[75]"
              >
                <div className="absolute left-[49%] top-[16%] -rotate-6 px-4 py-1.5 rounded-full bg-[#881337] text-white text-[12.5px] font-medium shadow-lg">
                  @howard
                </div>
                <div className="absolute left-[74%] top-[36%] -rotate-3 px-4 py-1.5 rounded-full bg-[#141414] text-white text-[12.5px] font-medium shadow-lg">
                  @robin
                </div>
              </div>

              {/* Right-Edge Vertical "<" / ">" Cascade Controls (00:05 - 00:06) */}
              <div
                style={{ opacity: showcaseEnter }}
                className={`hidden lg:flex flex-col items-center gap-2 absolute right-2 top-1/2 -translate-y-1/2 z-40 ${
                  heroScrollProgress > 0.6 ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setCascadeRotationOffset((prev) => (prev + 1) % PRODUCTS.length)
                  }
                  aria-label="Cycle cascade cards up"
                  className="w-9 h-9 rounded-full border border-zinc-200 bg-white hover:border-zinc-400 flex items-center justify-center text-[#141414] shadow-2xs cursor-pointer"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCascadeRotationOffset(
                      (prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length
                    )
                  }
                  aria-label="Cycle cascade cards down"
                  className="w-9 h-9 rounded-full border border-zinc-200 bg-white hover:border-zinc-400 flex items-center justify-center text-[#141414] shadow-2xs cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                 4. HERO BOTTOM COPY & "Explore More" CTA
                    Scaled proportionally with clamp() so it stays balanced on all viewports
                --------------------------------------------------------------- */}
            <motion.div
              initial={false}
              animate={{
                opacity: heroFooterOpacity,
                y: heroFooterY,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute bottom-[clamp(22px,5.2vh,72px)] left-0 right-0 flex flex-col items-center text-center z-20 px-4 ${
                !isStackPhase && heroScrollProgress < 0.2
                  ? 'pointer-events-auto'
                  : 'pointer-events-none'
              }`}
            >
              <p className="text-[clamp(12px,min(0.95vw,1.85vh),16px)] leading-[1.55] text-[#3F3F46] max-w-[clamp(310px,30vw,480px)] font-medium">
                We Do Not Divide Our Collections To Seasons We Create
                <br />
                New Models Every Week, And We In A Few Items
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleExploreMore}
                className="mt-3.5 sm:mt-4 px-[clamp(22px,1.8vw,32px)] py-[clamp(9px,1.15vh,14px)] rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white text-[clamp(12px,0.9vw,15px)] font-medium tracking-wide shadow-[0_10px_24px_-6px_rgba(0,0,0,0.35)] cursor-pointer whitespace-nowrap shrink-0"
              >
                Explore More
              </motion.button>
            </motion.div>
          </main>
        </div>
      </div>

      {/* =====================================================================
           POST-HERO SECTIONS (00:07 - 00:42 OF ATTACHED REFERENCE VIDEO)
          ===================================================================== */}
      {/* Section 3: "Gateway to artist people." + Burnt-Orange Banner + "Trusted by the best." */}
      <ShowcaseGatewaySection />

      {/* Section 4 & 5: 3-Stage Scroll-Scrubbed Card Choreography -> Folder Grid + Dual-Arc Community Wave */}
      <VisionFolderSection />

      {/* Section 6 & 7: "Every piece of art tells a story" 2x2 Bento + "Marketplace for Creativity" & "Trisha Woodward" */}
      <StoryMarketplaceSection />

      {/* Section 8: "Membership" Pricing Deck + Neon Lime Marquee + Split Feature Cards + Footer */}
      <MembershipFooterSection
        onNavigateTop={() => smoothScrollToY(0, 1.1)}
      />

      {/* =====================================================================
           SHOPPING BAG SLIDE-OVER DRAWER
          ===================================================================== */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={() => setCart([])}
      />

      {/* =====================================================================
           PRODUCT QUICK-VIEW MODAL (When clicking "Buy Now" on any Hero Card)
          ===================================================================== */}
      <AnimatePresence>
        {isProductModalOpen && (
          <>
            <motion.div
              key="product-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50"
            />
            <motion.div
              key="product-modal-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={activeProduct.detailTitle}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[760px] max-h-[90vh] overflow-y-auto bg-white rounded-[32px] p-6 sm:p-8 z-50 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-7 items-center"
            >
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                aria-label="Close product detail"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-[#141414] cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-72 sm:h-96 rounded-[24px] overflow-hidden bg-zinc-100 shadow-md">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col items-start">
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#71717A]">
                  LIMITED EDITION CAPSULE
                </span>
                <h3
                  className="mt-1 text-2xl sm:text-3xl font-bold text-[#141414]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {activeProduct.detailTitle}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#71717A] leading-relaxed">
                  {activeProduct.description}
                </p>

                <div className="mt-4 text-2xl font-bold text-[#141414]">
                  ${activeProduct.detailPrice.toFixed(2)}
                </div>

                {/* Size Selector */}
                <div className="mt-5 w-full">
                  <span className="text-xs font-semibold text-[#141414]">
                    Size
                  </span>
                  <div className="mt-2 flex items-center gap-2">
                    {AVAILABLE_SIZES.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`w-9 h-9 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#141414] text-white'
                            : 'border border-zinc-200 text-[#141414] hover:border-zinc-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div className="mt-4 w-full">
                  <span className="text-xs font-semibold text-[#141414]">
                    Color
                  </span>
                  <div className="mt-2 flex items-center gap-2.5">
                    {AVAILABLE_COLORS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColorId(c.id)}
                        aria-label={c.label}
                        style={{ backgroundColor: c.hex }}
                        className={`w-6 h-6 rounded-full border cursor-pointer ${
                          selectedColorId === c.id
                            ? 'ring-2 ring-offset-2 ring-[#141414]'
                            : 'border-zinc-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-6 w-full py-3 rounded-full bg-[#141414] hover:bg-zinc-800 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  {addedFeedback ? '✓ Added To Bag' : 'Add To Cart'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================================
           STUDIO CONTACT MODAL
          ===================================================================== */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            <motion.div
              key="contact-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="fixed inset-0 bg-black/35 backdrop-blur-[2px] z-50"
            />
            <motion.div
              key="contact-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Contact Fashion Studio"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[420px] bg-white rounded-3xl p-7 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <h3
                  className="text-xl font-bold text-[#141414]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Contact Studio
                </h3>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(false)}
                  aria-label="Close contact dialog"
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
                We release new limited-edition capsules every week. Reach our showroom team for styling inquiries or press requests.
              </p>
              <div className="mt-5 space-y-2.5 text-xs text-zinc-500">
                <p>
                  <strong className="text-[#141414]">Showroom:</strong> 420 Mercer St, SoHo, New York
                </p>
                <p>
                  <strong className="text-[#141414]">Direct:</strong> studio@fashion-collections.com
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                className="mt-6 w-full py-3 rounded-full bg-[#181818] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
