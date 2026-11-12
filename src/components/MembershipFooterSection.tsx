import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
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
  features: string[];
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
    features: [
      'Unlimited gallery uploads',
      'Direct collector messaging',
      'Standard studio analytics',
    ],
    defaultRotate: -8,
    defaultY: 18,
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: '$12.99',
    period: '/month',
    badge: 'Popular',
    description: 'Accelerated visibility and 0% commission on primary drops.',
    features: [
      'Zero marketplace fee on drops',
      'Priority homepage curation',
      'Verified creator identity badge',
    ],
    defaultRotate: 2.5,
    defaultY: -14,
  },
  {
    id: 'annually',
    name: 'Annually',
    price: '$19.99',
    period: '/month',
    description: 'Full commercial suite for established studios and galleries.',
    features: [
      'Multi-artist studio seats',
      'Custom collector domain',
      'Dedicated curator advisory',
    ],
    defaultRotate: 9,
    defaultY: 22,
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
          PART 8A: "Membership" 3-CARD TILTED PRICING DECK (00:35 - 00:37)
         =================================================================== */}
      <section
        id="membership-section"
        className="relative w-full py-24 px-4 sm:px-8 md:px-14 overflow-hidden"
      >
        <div className="max-w-[1220px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-14">
          {/* Left Copy Column */}
          <div className="w-full lg:w-[36%] flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#71717A]"
            >
              PRICING PLANS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.55 }}
              className="mt-2 text-[40px] sm:text-[52px] font-semibold tracking-[-0.03em] leading-[1.05] text-[#141414]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Membership
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-4 text-[14px] text-[#71717A] leading-relaxed max-w-[360px]"
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

          {/* Right 3-Card Overlapping Tilted Pricing Deck */}
          <div className="w-full lg:w-[64%] grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-3 items-center pt-4 pb-6">
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
                  className={`relative rounded-[28px] p-6 sm:p-7 cursor-pointer transition-shadow flex flex-col justify-between min-h-[380px] ${
                    isOrangeCard
                      ? 'bg-[#EA580C] text-white shadow-[0_28px_60px_-15px_rgba(234,88,12,0.45)]'
                      : 'bg-[#FAFAFA] text-[#141414] border border-zinc-200/90 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.12)]'
                  } ${
                    isHighlighted && !isOrangeCard
                      ? 'ring-2 ring-[#141414]'
                      : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[15px] font-semibold ${
                          isOrangeCard ? 'text-orange-100' : 'text-[#141414]'
                        }`}
                      >
                        {plan.name}
                      </span>
                      {plan.badge && (
                        <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10.5px] font-semibold">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span
                        className="text-[36px] sm:text-[40px] font-bold tracking-tight"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-xs ${
                          isOrangeCard ? 'text-orange-100' : 'text-[#71717A]'
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <p
                      className={`mt-2.5 text-[12.5px] leading-relaxed ${
                        isOrangeCard ? 'text-orange-100' : 'text-[#71717A]'
                      }`}
                    >
                      {plan.description}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2 text-[12px] font-medium"
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                              isOrangeCard
                                ? 'bg-white/20 text-white'
                                : 'bg-zinc-200 text-[#141414]'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5" />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChoosePlan(plan);
                    }}
                    className={`mt-7 w-full py-3 rounded-full text-[12.5px] font-semibold transition-transform active:scale-95 cursor-pointer ${
                      isOrangeCard
                        ? 'bg-[#141414] text-white hover:bg-zinc-900 shadow-md'
                        : 'bg-white border border-zinc-300 text-[#141414] hover:bg-[#141414] hover:text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          PART 8B: NEON LIME (#EEFF41) MARQUEE BANNER WITH STICKER PUCKS (00:38 - 00:39)
         =================================================================== */}
      <section className="w-full py-10 px-4 sm:px-8 md:px-14">
        <div className="max-w-[1220px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-[34px] bg-[#EEFF41] pt-14 pb-10 overflow-hidden shadow-[0_24px_50px_-18px_rgba(163,230,53,0.4)]"
          >
            {/* Giant Scrolling Horizontal Marquee Text + Inline Art Thumbnails */}
            <div className="relative w-full overflow-hidden flex whitespace-nowrap">
              <div className="flex items-center gap-8 pr-8 animate-art-marquee">
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex items-center gap-8">
                    <span
                      className="text-[48px] sm:text-[68px] md:text-[82px] font-semibold tracking-[-0.03em] text-[#141414] leading-none"
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
                      className="text-[48px] sm:text-[68px] md:text-[82px] font-semibold tracking-[-0.03em] text-[#141414] leading-none"
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
                      className="text-[48px] sm:text-[68px] md:text-[82px] font-semibold tracking-[-0.03em] text-[#141414] leading-none"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      New Art Platform
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row of 8 Circular White Vector-Icon Sticker Pucks */}
            <div className="mt-10 px-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
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
                  className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white text-[#141414] shadow-md border border-black/10 flex items-center justify-center cursor-pointer"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          PART 8C: 2-COLUMN SPLIT FEATURE CARDS ("Meets new people" | "Archive of new arts") (00:40 - 00:41)
         =================================================================== */}
      <section className="w-full py-20 px-4 sm:px-8 md:px-14">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 border-y border-zinc-200/80 py-14">
          {/* Left Split Card: "Meets new people" */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="lg:pr-12 lg:border-r border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="w-full sm:w-[54%] flex flex-col items-start">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#71717A]">
                COMMUNITY
              </span>
              <h3
                className="mt-2 text-[28px] sm:text-[34px] font-semibold tracking-tight text-[#141414] leading-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Meets new
                <br />
                people
              </h3>
              <p className="mt-2.5 text-[13.5px] text-[#71717A] leading-relaxed">
                Connect with fellow creators, collectors, and curators across global art hubs.
              </p>
              <button
                type="button"
                className="mt-5 px-5 py-2 rounded-full border border-zinc-300 hover:border-[#141414] bg-white text-[#141414] text-[12px] font-semibold cursor-pointer transition-colors"
              >
                Let&apos;s Meet
              </button>
            </div>

            <div className="w-full sm:w-[46%] h-56 rounded-[24px] overflow-hidden shadow-md bg-[#E11D48]">
              <img
                src="/src/assets/images/featured_artist_orange_dress_1794472953183.jpg"
                alt="Meets new people"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Right Split Card: "Archive of new arts" */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:pl-12 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="w-full sm:w-[54%] flex flex-col items-start">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#71717A]">
                CURATION
              </span>
              <h3
                className="mt-2 text-[28px] sm:text-[34px] font-semibold tracking-tight text-[#141414] leading-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Archive of
                <br />
                new arts
              </h3>
              <p className="mt-2.5 text-[13.5px] text-[#71717A] leading-relaxed">
                Explore thousands of verified contemporary works and limited studio editions.
              </p>
              <button
                type="button"
                className="mt-5 px-5 py-2 rounded-full border border-zinc-300 hover:border-[#141414] bg-white text-[#141414] text-[12px] font-semibold cursor-pointer transition-colors"
              >
                Explore
              </button>
            </div>

            <div className="w-full sm:w-[46%] h-56 rounded-[24px] overflow-hidden shadow-md bg-[#3F6212]">
              <img
                src="/src/assets/images/bento_popart_creator_1794472951684.jpg"
                alt="Archive of new arts"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================
          PART 8D: EDITORIAL MULTI-COLUMN FOOTER ("Our platform, your art.") (00:42)
         =================================================================== */}
      <footer className="w-full pt-8 pb-16 px-4 sm:px-8 md:px-14 bg-white">
        <div className="max-w-[1220px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-zinc-200/80">
            {/* Brand & Tagline Column */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <button
                  type="button"
                  onClick={onNavigateTop}
                  className="text-[24px] font-bold tracking-tight text-[#141414] cursor-pointer"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Fashion.
                </button>
                <h4
                  className="mt-4 text-[28px] sm:text-[32px] font-semibold tracking-tight text-[#141414] leading-tight max-w-[300px]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Our platform,
                  <br />
                  your art.
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
                <h5 className="text-[13px] font-semibold text-[#141414]">
                  Get Started
                </h5>
                <ul className="mt-4 space-y-2.5 text-[13px] text-[#71717A]">
                  <li>
                    <a href="#gateway-section" className="hover:text-[#141414]">
                      Create Account
                    </a>
                  </li>
                  <li>
                    <a href="#marketplace-creativity-section" className="hover:text-[#141414]">
                      Artist Marketplace
                    </a>
                  </li>
                  <li>
                    <a href="#membership-section" className="hover:text-[#141414]">
                      Membership Plans
                    </a>
                  </li>
                  <li>
                    <a href="#story-bento-section" className="hover:text-[#141414]">
                      Collector Access
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-[13px] font-semibold text-[#141414]">
                  Your Story
                </h5>
                <ul className="mt-4 space-y-2.5 text-[13px] text-[#71717A]">
                  <li>
                    <a href="#story-bento-section" className="hover:text-[#141414]">
                      Echoes of Expression
                    </a>
                  </li>
                  <li>
                    <a href="#gateway-section" className="hover:text-[#141414]">
                      Masterclasses
                    </a>
                  </li>
                  <li>
                    <a href="#marketplace-creativity-section" className="hover:text-[#141414]">
                      Featured Creators
                    </a>
                  </li>
                  <li>
                    <a href="#membership-section" className="hover:text-[#141414]">
                      Studio Technology
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-[13px] font-semibold text-[#141414]">
                  Privacy &amp; Policy
                </h5>
                <ul className="mt-4 space-y-2.5 text-[13px] text-[#71717A]">
                  <li>
                    <a href="#top" className="hover:text-[#141414]">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#top" className="hover:text-[#141414]">
                      Privacy Statement
                    </a>
                  </li>
                  <li>
                    <a href="#top" className="hover:text-[#141414]">
                      Provenance Guarantee
                    </a>
                  </li>
                  <li>
                    <a href="#top" className="hover:text-[#141414]">
                      Cookie Preferences
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
