import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import {
  PRODUCTS,
  AVAILABLE_COLORS,
  SizeOption,
} from './data/products';
import {
  computeCardTransform,
  smoothstep,
  lerp,
  addItemToCart,
  getCartTotalCount,
  getInitialCart,
  CartItem,
} from './utils/choreography';
import { Navbar } from './components/Navbar';
import { SpeechBadges } from './components/SpeechBadges';
import { ProductDetailPanel } from './components/ProductDetailPanel';
import { CartDrawer } from './components/CartDrawer';

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

  // Continuous normalized scroll progress [0..1] driven by window scroll or programmatic GSAP tween
  const [scrollProgress, setScrollProgress] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const params = new URLSearchParams(window.location.search);
    const stage = params.get('stage');
    if (stage === 'bestselling') return 0.36;
    if (stage === 'shifted') return 0.58;
    if (stage === 'detail') return 0.96;
    return 0;
  });

  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  // Selected product for Product Detail morph (defaults to index 3: "Woolan Fashion")
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(3);
  const [selectedSize, setSelectedSize] = useState<SizeOption>('S');
  const [selectedColorId, setSelectedColorId] = useState<string>('white');
  const [cart, setCart] = useState<CartItem[]>(getInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const scrollProxyRef = useRef<{ value: number }>({ value: scrollProgress });
  const isProgrammaticScrollRef = useRef(false);
  const introTimersRef = useRef<number[]>([]);

  const clearIntroTimers = useCallback(() => {
    introTimersRef.current.forEach((id) => window.clearTimeout(id));
    introTimersRef.current = [];
  }, []);

  // Run the bottom-up Card Stack Rise -> Stack Shuffle -> Hero Fan sequence (no skeleton screen!)
  const runIntroSequence = useCallback(() => {
    clearIntroTimers();
    gsap.killTweensOf(scrollProxyRef.current);
    window.scrollTo({ top: 0, behavior: 'auto' });
    scrollProxyRef.current.value = 0;
    setScrollProgress(0);
    setIntroPhase('stack-enter');

    // Step 1: Cards immediately rise from the bottom into the center stack (Card 4 Woolan Fashion on top)
    const t1 = window.setTimeout(() => {
      setIntroPhase('stack-rise');
    }, 60);

    // Step 2: At 950ms, Card 1 (Summer Cloths) shuffles to top of center deck
    const t2 = window.setTimeout(() => {
      setIntroPhase('stack-shuffle');
    }, 950);

    // Step 3: At 1750ms, all 6 cards fan out into "The Ultimate COLLECTIONS"
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

  // Responsive viewport listener
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Native window scroll -> GSAP smoothed scrollProgress sync
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const rawProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

      // If user scrolls during intro, immediately finish intro so scroll feels instant
      if (rawProgress > 0.02 && introPhase !== 'ready') {
        clearIntroTimers();
        setIntroPhase('ready');
      }

      gsap.to(scrollProxyRef.current, {
        value: rawProgress,
        duration: 0.32,
        ease: 'power3.out',
        overwrite: 'auto',
        onUpdate: () => {
          setScrollProgress(scrollProxyRef.current.value);
        },
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [introPhase, clearIntroTimers]);

  // Programmatic GSAP transition to a specific normalized scroll progress [0..1]
  const animateToProgress = useCallback(
    (targetProgress: number, duration = 1.15) => {
      clearIntroTimers();
      setIntroPhase('ready');

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      isProgrammaticScrollRef.current = true;

      gsap.to(scrollProxyRef.current, {
        value: targetProgress,
        duration,
        ease: 'power3.inOut',
        overwrite: 'auto',
        onUpdate: () => {
          const val = scrollProxyRef.current.value;
          setScrollProgress(val);
          if (maxScroll > 0) {
            window.scrollTo({ top: val * maxScroll, behavior: 'auto' });
          }
        },
        onComplete: () => {
          isProgrammaticScrollRef.current = false;
        },
      });
    },
    [clearIntroTimers]
  );

  // Full cinematic sequence playback (plays Stack Rise -> Stack Shuffle -> Hero Fan -> Best Selling -> Carousel Shift -> Product Detail)
  const handleReplayFullShowcase = useCallback(() => {
    runIntroSequence();
    const t4 = window.setTimeout(() => {
      animateToProgress(0.36, 1.1);
    }, 3400);
    const t5 = window.setTimeout(() => {
      animateToProgress(0.58, 1.0);
    }, 5200);
    const t6 = window.setTimeout(() => {
      setSelectedProductIndex(3); // Woolan Fashion
      animateToProgress(0.98, 1.15);
    }, 7100);
    introTimersRef.current.push(t4, t5, t6);
  }, [runIntroSequence, animateToProgress]);

  // Navigation handler
  const handleNavigate = (target: 'home' | 'product' | 'detail' | 'contact') => {
    if (target === 'home') {
      animateToProgress(0, 0.95);
    } else if (target === 'product') {
      animateToProgress(0.38, 1.0);
    } else if (target === 'detail') {
      animateToProgress(0.98, 1.1);
    } else if (target === 'contact') {
      setIsContactOpen(true);
    }
  };

  // Explore More button in Hero -> transitions to Best Selling section and then gently shifts carousel
  const handleExploreMore = () => {
    clearIntroTimers();
    animateToProgress(0.36, 1.05);
    const shiftTimer = window.setTimeout(() => {
      if (
        scrollProxyRef.current.value >= 0.3 &&
        scrollProxyRef.current.value <= 0.45
      ) {
        animateToProgress(0.58, 0.95);
      }
    }, 1600);
    introTimersRef.current.push(shiftTimer);
  };

  // Clicking Buy Now on a card or clicking a card -> morphs that card into Product Detail View
  const handleSelectProductDetail = (index: number) => {
    setSelectedProductIndex(index);
    animateToProgress(0.98, 1.1);
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

  // Hero Headline ("The Ultimate COLLECTIONS") opacity & upward scroll exit
  const heroTitleOpacity = isStackPhase
    ? 0
    : 1 - smoothstep(0.04, 0.24, scrollProgress);
  const heroTitleY = isStackPhase
    ? 38
    : -smoothstep(0.0, 0.28, scrollProgress) * 140;

  // Hero Footer ("We Do Not Divide Our Collections..." + "Explore More")
  const heroFooterOpacity = isStackPhase
    ? 0
    : 1 - smoothstep(0.03, 0.20, scrollProgress);
  const heroFooterY = isStackPhase
    ? 44
    : -smoothstep(0.0, 0.24, scrollProgress) * 90;

  // Best Selling Headline ("Best Selling Product Of The COLLECTION") rises from bottom and exits upward when entering Detail View
  const bestSellingEnter = smoothstep(0.12, 0.34, scrollProgress);
  const bestSellingExit = smoothstep(0.64, 0.82, scrollProgress);
  const bestSellingOpacity = bestSellingEnter * (1 - bestSellingExit);
  const bestSellingHeadlineY =
    lerp(280, 0, bestSellingEnter) - bestSellingExit * 180;

  // Best Selling CTA ("See All Product")
  const bestSellingFooterOpacity =
    smoothstep(0.24, 0.36, scrollProgress) * (1 - smoothstep(0.62, 0.76, scrollProgress));
  const bestSellingFooterY =
    lerp(60, 0, smoothstep(0.24, 0.36, scrollProgress)) -
    smoothstep(0.62, 0.76, scrollProgress) * 90;

  const activeSection: 'home' | 'product' | 'detail' | 'contact' = isContactOpen
    ? 'contact'
    : scrollProgress < 0.25
    ? 'home'
    : scrollProgress < 0.72
    ? 'product'
    : 'detail';

  const activeProduct = PRODUCTS[selectedProductIndex] || PRODUCTS[3];

  return (
    <div className="relative min-h-[340vh] w-full bg-white text-[#141414] select-none">
      {/* Full-Screen Viewport Stage (Edge-to-Edge White, No Outer Frame) */}
      <div className="fixed inset-0 w-screen h-screen bg-white overflow-hidden flex flex-col justify-between">
        {/* Top Navigation Bar (hidden while cards rise from bottom; animates in smoothly as cards expand) */}
        <Navbar
          isVisible={!isStackPhase}
          activeSection={activeSection}
          cartCount={getCartTotalCount(cart)}
          onNavigate={handleNavigate}
          onOpenCart={() => setIsCartOpen(true)}
          onReplayTour={handleReplayFullShowcase}
        />

        {/* Floating Left Teal & Right Orange Speech Bubbles */}
        <SpeechBadges
          introPhase={introPhase}
          scrollProgress={scrollProgress}
        />

        {/* Main Full-Screen Interactive Stage */}
        <main className="relative flex-1 w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8">
          {/* =========================================================
              1. HERO HEADLINE ("The Ultimate COLLECTIONS")
             ========================================================= */}
          <motion.div
            initial={false}
            animate={{
              opacity: heroTitleOpacity,
              y: heroTitleY,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[13%] sm:top-[14.5%] left-0 right-0 flex flex-col items-center text-center z-20 pointer-events-none"
          >
            <span
              className="text-[28px] sm:text-[38px] md:text-[42px] font-normal tracking-tight text-[#141414] leading-[1.12]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              The Ultimate
            </span>
            <h1
              className="mt-0.5 text-[42px] sm:text-[58px] md:text-[66px] font-semibold tracking-[-0.02em] text-[#141414] leading-[1.02] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              COLLECTIONS
            </h1>
          </motion.div>

          {/* =========================================================
              2. BEST SELLING HEADLINE ("Best Selling Product Of The COLLECTION")
             ========================================================= */}
          <div
            className="absolute top-[13%] sm:top-[14%] left-0 right-0 flex flex-col items-center text-center z-20 pointer-events-none"
            style={{
              opacity: bestSellingOpacity,
              transform: `translate3d(0, ${bestSellingHeadlineY}px, 0)`,
            }}
          >
            <span
              className="text-[24px] sm:text-[33px] md:text-[36px] font-normal tracking-tight text-[#141414] leading-[1.15]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Best Selling Product Of The
            </span>
            <h2
              className="mt-0.5 text-[42px] sm:text-[58px] md:text-[64px] font-semibold tracking-[-0.02em] text-[#141414] leading-[1.04] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              COLLECTION
            </h2>
          </div>

          {/* =========================================================
              3. UNIFIED 6-CARD CHOREOGRAPHY STAGE (Bottom Stack Rise -> Shuffle -> Fan -> Row -> Detail)
             ========================================================= */}
          <div
            className="relative w-full h-[390px] sm:h-[450px] flex items-center justify-center z-20 mt-6 sm:mt-8"
            data-testid="card-choreography-stage"
          >
            {PRODUCTS.map((product, idx) => {
              const transform = computeCardTransform(
                product,
                introPhase,
                scrollProgress,
                selectedProductIndex,
                viewportWidth
              );

              const isHovered =
                hoveredCardIndex === idx &&
                introPhase === 'ready' &&
                scrollProgress < 0.7;

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
                    onClick={() => {
                      if (scrollProgress < 0.8) {
                        handleSelectProductDetail(idx);
                      }
                    }}
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

                    {/* Top-Right "Buy Now" Pill */}
                    <AnimatePresence>
                      {transform.showBuyNow && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-3.5 z-10 ${
                            idx < 3 && scrollProgress < 0.2
                              ? 'right-5'
                              : 'right-3.5'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectProductDetail(idx);
                            }}
                            aria-label={`Buy ${product.name} now`}
                            className="px-3 py-1 rounded-full bg-white/95 hover:bg-white text-[#141414] text-[10px] font-semibold tracking-tight shadow-sm transition-transform hover:scale-105 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            Buy Now
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Best-Selling Card Metadata Row Below Image (Name, Price, Star Rating) */}
                  {transform.showMeta && (
                    <div
                      style={{ opacity: transform.metaOpacity }}
                      className="pt-3 px-0.5 flex flex-col gap-1 pointer-events-auto"
                    >
                      <div className="flex items-center justify-between gap-2 text-[13.5px] leading-snug">
                        <span className="font-semibold text-[#141414] truncate">
                          {product.name}
                        </span>
                        <span className="font-semibold text-[#141414] tabular-nums shrink-0">
                          ${product.cardPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#71717A]">
                        <span className="text-[#FACC15] text-[12px] leading-none">
                          ★
                        </span>
                        <span className="tabular-nums">{product.rating}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* =========================================================
                4. PRODUCT DETAIL RIGHT-HAND PANEL ("WOOLAN FASHION")
               ========================================================= */}
            <div className="w-full max-w-[1180px] mx-auto flex justify-end items-center pointer-events-none z-30">
              <div className="w-full md:w-[48%] lg:w-[46%] pl-0 md:pl-8">
                <ProductDetailPanel
                  product={activeProduct}
                  scrollProgress={scrollProgress}
                  selectedSize={selectedSize}
                  selectedColorId={selectedColorId}
                  onSelectSize={setSelectedSize}
                  onSelectColor={setSelectedColorId}
                  onAddToCart={handleAddToCart}
                  addedFeedback={addedFeedback}
                />
              </div>
            </div>
          </div>

          {/* =========================================================
              5. HERO BOTTOM COPY & "Explore More" CTA
             ========================================================= */}
          <motion.div
            initial={false}
            animate={{
              opacity: heroFooterOpacity,
              y: heroFooterY,
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-[6.5%] sm:bottom-[7.5%] left-0 right-0 flex flex-col items-center text-center z-20 ${
              !isStackPhase && scrollProgress < 0.2
                ? 'pointer-events-auto'
                : 'pointer-events-none'
            }`}
          >
            <p className="text-[12.5px] sm:text-[13.5px] leading-[1.6] text-[#3F3F46] max-w-[390px] font-medium">
              We Do Not Divide Our Collections To Seasons We Create
              <br />
              New Models Every Week, And We In A Few Items
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleExploreMore}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white text-[12px] font-medium tracking-wide shadow-[0_10px_24px_-6px_rgba(0,0,0,0.35)] cursor-pointer whitespace-nowrap shrink-0"
            >
              Explore More
            </motion.button>
          </motion.div>

          {/* =========================================================
              6. BEST SELLING BOTTOM CTA ("See All Product")
             ========================================================= */}
          <div
            className={`absolute bottom-[6%] sm:bottom-[6.5%] left-0 right-0 flex items-center justify-center gap-3 z-20 ${
              scrollProgress >= 0.24 && scrollProgress <= 0.7
                ? 'pointer-events-auto'
                : 'pointer-events-none'
            }`}
            style={{
              opacity: bestSellingFooterOpacity,
              transform: `translate3d(0, ${bestSellingFooterY}px, 0)`,
            }}
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleSelectProductDetail(3)}
              className="px-6 py-2.5 rounded-full bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white text-[12px] font-medium tracking-wide shadow-[0_10px_24px_-6px_rgba(0,0,0,0.35)] cursor-pointer whitespace-nowrap shrink-0"
            >
              See All Product
            </motion.button>
          </div>
        </main>
      </div>

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={() => setCart([])}
      />

      {/* Studio Contact Modal */}
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] bg-white rounded-3xl p-7 z-50 shadow-2xl"
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
