import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Paintbrush,
  PenTool,
  Wand2,
  Palette,
  Sparkles,
  Layers,
  Shapes,
  Eye,
  ArrowUpRight,
} from 'lucide-react';

interface PricingPlan {
  id: 'monthly' | 'quarterly' | 'annually';
  name: string;
  price: string;
  period: string;
  badge?: string;
  description: string;
  defaultRotate: number;
  defaultY: number;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99',
    period: '/month',
    description: 'Essential tools for emerging creators starting their portfolio.',
    defaultRotate: -6,
    defaultY: 14,
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: '$12.99',
    period: '/month',
    badge: 'Popular',
    description: 'Accelerated visibility and 0% commission on primary drops.',
    defaultRotate: 2.5,
    defaultY: -12,
  },
  {
    id: 'annually',
    name: 'Annually',
    price: '$19.99',
    period: '/month',
    description: 'Full commercial suite for established studios and galleries.',
    defaultRotate: 7,
    defaultY: 18,
  },
];

const STICKER_PUCKS = [
  { id: 's1', Icon: Paintbrush, rotate: -18 },
  { id: 's2', Icon: PenTool, rotate: 14 },
  { id: 's3', Icon: Wand2, rotate: -9 },
  { id: 's4', Icon: Palette, rotate: 22 },
  { id: 's5', Icon: Sparkles, rotate: -15 },
  { id: 's6', Icon: Layers, rotate: 11 },
  { id: 's7', Icon: Shapes, rotate: -12 },
  { id: 's8', Icon: Eye, rotate: 16 },
];

interface MembershipFooterSectionProps {
  onSelectPlan?: (planName: string) => void;
  onNavigateTop?: () => void;
}

export const MembershipFooterSection: React.FC<MembershipFooterSectionProps> = ({
  onSelectPlan,
  onNavigateTop,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'monthly' | 'quarterly' | 'annually'>('quarterly');
  const [planToast, setPlanToast] = useState<string | null>(null);

  const handleChoosePlan = (plan: PricingPlan) => {
    setSelectedPlanId(plan.id);
    setPlanToast(`${plan.name} plan (${plan.price}${plan.period}) selected`);
    if (onSelectPlan) onSelectPlan(plan.name);
    window.setTimeout(() => setPlanToast(null), 2600);
  };

  return (
    <div className="w-full bg-white select-none">
      {/* ===================================================================
          PART 8A: "Membership" 3-CARD TILTED PRICING DECK (00:35 - 00:37, sec_36.png)
         =================================================================== */}
      <section
        id="membership-section"
        className="relative w-full py-24 px-6 sm:px-10 lg:px-[5vw] overflow-hidden"
      >
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Copy Column matching sec_36.png */}
          <div className="w-full lg:w-[34%] flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              className="text-[11px] sm:text-[12px] xl:text-[0.85vw] font-bold tracking-[0.2em] uppercase"
            >
              <span className="text-[#141414]">PRICING </span>
              <span className="text-[#EA580C]">PLANS</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.55 }}
              className="mt-2.5 text-[42px] sm:text-[54px] md:text-[4.3vw] font-semibold tracking-[-0.03em] leading-[1.03] text-[#141414]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Membership
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-4 text-[14px] sm:text-[15px] xl:text-[1.02vw] text-[#71717A] leading-relaxed max-w-[360px] xl:max-w-[26vw]"
            >
              Gain access to exclusive tools, resources, and a supportive community that helps you grow and succeed in the art world.
            </motion.p>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const next =
                  selectedPlanId === 'quarterly'
                    ? 'annually'
                    : selectedPlanId === 'annually'
                    ? 'monthly'
                    : 'quarterly';
                setSelectedPlanId(next);
              }}
              className="mt-7 px-6 py-2.5 rounded-full border border-zinc-300 hover:border-[#141414] bg-white text-[#141414] text-[12.5px] font-semibold cursor-pointer transition-colors"
            >
              See Detail
            </motion.button>

            {planToast && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 px-4 py-2 rounded-full bg-[#141414] text-white text-xs font-medium"
              >
                ✓ {planToast}
              </motion.div>
            )}
          </div>

          {/* Right 3-Card Overlapping Tilted Pricing Deck matching sec_36.png */}
          <div className="w-full lg:w-[64%] grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 items-center pt-4 pb-6">
            {PRICING_PLANS.map((plan, idx) => {
              const isHighlighted = plan.id === selectedPlanId;
              const isOrangeCard = plan.id === 'quarterly';

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 45, rotate: 0 }}
                  whileInView={{
                    opacity: 1,
                    y: plan.defaultY,
                    rotate: plan.defaultRotate,
                  }}
                  whileHover={{
                    y: plan.defaultY - 12,
                    rotate: 0,
                    scale: 1.03,
                    zIndex: 40,
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 22,
                    delay: idx * 0.08,
                  }}
                  onClick={() => handleChoosePlan(plan)}
                  style={{
                    zIndex: isOrangeCard ? 30 : isHighlighted ? 25 : 10 + idx,
                  }}
                  className={`relative rounded-[28px] p-7 sm:p-8 cursor-pointer transition-shadow flex flex-col justify-between min-h-[290px] sm:min-h-[320px] lg:min-h-[22vw] ${
                    isOrangeCard
                      ? 'bg-[#EA580C] text-white shadow-[0_28px_60px_-15px_rgba(234,88,12,0.45)]'
                      : 'bg-[#F6F6F7] text-[#141414] border border-zinc-200/80 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.10)]'
                  } ${
                    isHighlighted && !isOrangeCard
                      ? 'ring-2 ring-[#141414]'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[15px] font-semibold ${
                        isOrangeCard ? 'text-white' : 'text-[#141414]'
                      }`}
                    >
                      {plan.name}
                    </span>
                    {plan.badge && (
                      <span className="px-3.5 py-1 rounded-full bg-white text-[#141414] text-[11px] font-semibold shadow-xs">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="my-auto pt-8">
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-[42px] sm:text-[48px] xl:text-[3.4vw] font-semibold tracking-[-0.03em] leading-none"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {plan.price}
                      </span>
                    </div>
                    <p
                      className={`mt-3 text-[12.5px] leading-relaxed ${
                        isOrangeCard ? 'text-orange-100' : 'text-[#71717A]'
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-3 border-t border-current/10 text-[12px] font-semibold">
                    <span>Get Started</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          PART 8B: NEON LIME (#EEFF41) MARQUEE BANNER WITH STICKER PUCKS (00:38 - 00:39, sec_39.png)
         =================================================================== */}
      <section className="w-full py-10 px-6 sm:px-10 lg:px-[5vw]">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[29vw] rounded-[34px] bg-[#EEFF41] pt-12 sm:pt-14 pb-8 sm:pb-10 flex flex-col justify-between overflow-hidden shadow-[0_24px_50px_-18px_rgba(163,230,53,0.4)]"
          >
            {/* Top Giant Scrolling Horizontal Marquee Text + Inline Art Thumbnails matching sec_39.png */}
            <div className="relative w-full overflow-hidden flex whitespace-nowrap">
              <div className="flex items-center gap-8 pr-8 animate-art-marquee">
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex items-center gap-8">
                    <span
                      className="text-[48px] sm:text-[68px] md:text-[5.5vw] font-semibold tracking-[-0.03em] text-[#141414] leading-none"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Artists can ride
                    </span>
                    <span className="inline-block w-20 h-14 sm:w-28 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#141414] shadow-md shrink-0 rotate-3">
                      <img
                        src="/src/assets/images/gateway_sunglasses_banner_1794472948136.jpg"
                        alt="Artist highlight"
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <span
                      className="text-[48px] sm:text-[68px] md:text-[5.5vw] font-semibold tracking-[-0.03em] text-[#141414] leading-none"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Inspired by people
                    </span>
                    <span className="inline-block w-20 h-14 sm:w-28 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#141414] shadow-md shrink-0 -rotate-3">
                      <img
                        src="/src/assets/images/featured_artist_orange_dress_1794472953183.jpg"
                        alt="Inspired creator"
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <span
                      className="text-[48px] sm:text-[68px] md:text-[5.5vw] font-semibold tracking-[-0.03em] text-[#141414] leading-none"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      New Art Platform
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row of 8 Circular White Vector-Icon Sticker Pucks clustered at the bottom edge */}
            <div className="mt-16 px-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              {STICKER_PUCKS.map(({ id, Icon, rotate }, idx) => (
                <motion.div
                  key={id}
                  initial={{ y: -40, opacity: 0, rotate: 0 }}
                  whileInView={{ y: 0, opacity: 1, rotate }}
                  whileHover={{ y: -8, scale: 1.12, rotate: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                    delay: idx * 0.04,
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#141414] shadow-md border border-black/10 flex items-center justify-center cursor-pointer"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          PART 8C: 2 LARGE FULL-BLEED SPLIT VISUAL CARDS ("Meets new people" | "Archive of new arts") (00:40 - 00:41, sec_41.png)
         =================================================================== */}
      <section className="w-full py-16 px-6 sm:px-10 lg:px-[5vw]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
          {/* Left Full-Bleed Visual Card: "Meets new people" on Magenta Portrait Backdrop (sec_41.png) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="group relative h-[420px] sm:h-[480px] lg:h-[34vw] max-h-[620px] rounded-[32px] overflow-hidden shadow-lg bg-[#E11D48] cursor-pointer"
          >
            <img
              src="/src/assets/images/featured_artist_orange_dress_1794472953183.jpg"
              alt="Meets new people"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

            {/* Overlaid Bottom-Left Editorial Copy & White Pill Button matching sec_41.png */}
            <div className="absolute bottom-8 sm:bottom-10 left-8 sm:left-10 right-8 z-10 flex flex-col items-start text-white">
              <h3
                className="text-[32px] sm:text-[42px] lg:text-[2.9vw] font-semibold tracking-[-0.03em] leading-[1.04]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Meets new
                <br />
                people
              </h3>
              <p className="mt-2.5 text-[13.5px] sm:text-[14.5px] text-white/85 max-w-[290px] leading-relaxed">
                Great opportunity to sharper your aesthetic
              </p>
              <button
                type="button"
                className="mt-5 px-6 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-[#141414] text-[12.5px] font-semibold shadow-md cursor-pointer transition-transform active:scale-95"
              >
                Let&apos;s Meet
              </button>
            </div>
          </motion.div>

          {/* Right Full-Bleed Visual Card: "Archive of new arts" on Botanical Artwork Backdrop (sec_41.png) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="group relative h-[420px] sm:h-[480px] lg:h-[34vw] max-h-[620px] rounded-[32px] overflow-hidden shadow-lg bg-[#D9F99D] cursor-pointer"
          >
            <img
              src="/src/assets/images/bento_popart_creator_1794472951684.jpg"
              alt="Archive of new arts"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-white/35 to-transparent" />

            {/* Overlaid Bottom-Left Editorial Copy & Black Pill Button matching sec_41.png */}
            <div className="absolute bottom-8 sm:bottom-10 left-8 sm:left-10 right-8 z-10 flex flex-col items-start text-[#141414]">
              <h3
                className="text-[32px] sm:text-[42px] lg:text-[2.9vw] font-semibold tracking-[-0.03em] leading-[1.04]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Archive of
                <br />
                new arts
              </h3>
              <p className="mt-2.5 text-[13.5px] sm:text-[14.5px] text-[#3F3F46] max-w-[290px] leading-relaxed">
                Great opportunity to sharper your aesthetic
              </p>
              <button
                type="button"
                className="mt-5 px-6 py-2.5 rounded-full bg-[#141414] hover:bg-zinc-800 text-white text-[12.5px] font-semibold shadow-md cursor-pointer transition-transform active:scale-95"
              >
                Archive
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          PART 8D: EDITORIAL MULTI-COLUMN FOOTER ("Our platform, your art.") (00:42, sec_41.png)
         =================================================================== */}
      <footer className="w-full pt-12 pb-16 px-6 sm:px-10 lg:px-[5vw] bg-white">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-zinc-200/80">
            {/* Brand & Tagline Column */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h4
                  className="text-[28px] sm:text-[36px] lg:text-[2.5vw] font-semibold tracking-[-0.03em] text-[#141414] leading-[1.08] max-w-[320px]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Our platform,
                  <br />
                  <span className="text-[#A1A1AA]">your art.</span>
                </h4>
              </div>

              <div className="mt-8 flex items-center gap-3">
                {['Instagram', 'Twitter', 'Dribbble'].map((social) => (
                  <a
                    key={social}
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigateTop) onNavigateTop();
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-zinc-200 hover:border-[#141414] text-xs font-medium text-[#52525B] hover:text-[#141414] flex items-center gap-1 transition-colors"
                  >
                    <span>{social}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Link Columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h5 className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#A1A1AA]">
                  GET STARTED
                </h5>
                <ul className="mt-4 space-y-2.5 text-[14px] font-medium text-[#141414]">
                  <li>
                    <a href="#gateway-section" className="hover:text-[#EA580C] transition-colors">
                      Create Now
                    </a>
                  </li>
                  <li>
                    <a href="#membership-section" className="hover:text-[#EA580C] transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#marketplace-creativity-section" className="hover:text-[#EA580C] transition-colors">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="#story-bento-section" className="hover:text-[#EA580C] transition-colors">
                      Tutorials
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#A1A1AA]">
                  YOUR STORY
                </h5>
                <ul className="mt-4 space-y-2.5 text-[14px] font-medium text-[#141414]">
                  <li>
                    <a href="#story-bento-section" className="hover:text-[#EA580C] transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#gateway-section" className="hover:text-[#EA580C] transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#marketplace-creativity-section" className="hover:text-[#EA580C] transition-colors">
                      Supports
                    </a>
                  </li>
                  <li>
                    <a href="#membership-section" className="hover:text-[#EA580C] transition-colors">
                      Contacts
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#A1A1AA]">
                  PRIVACY &amp; POLICY
                </h5>
                <ul className="mt-4 space-y-2.5 text-[14px] font-medium text-[#141414]">
                  <li>
                    <a href="#top" className="hover:text-[#EA580C] transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#top" className="hover:text-[#EA580C] transition-colors">
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a href="#top" className="hover:text-[#EA580C] transition-colors">
                      Site map
                    </a>
                  </li>
                  <li>
                    <a href="#top" className="hover:text-[#EA580C] transition-colors">
                      Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
            <p>© 2026 Fashion. &amp; ArtFusion Marketplace. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Curated Studio Edition</span>
              <span>New York • Milan • Tokyo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
