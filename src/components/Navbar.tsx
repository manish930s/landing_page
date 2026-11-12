import React from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  isVisible: boolean;
  isScrolled?: boolean;
  activeSection: 'home' | 'product' | 'detail' | 'contact';
  cartCount: number;
  onNavigate: (target: 'home' | 'product' | 'detail' | 'contact') => void;
  onOpenCart: () => void;
  onReplayTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isVisible,
  isScrolled = false,
  activeSection,
  cartCount,
  onNavigate,
  onOpenCart,
  onReplayTour,
}) => {
  return (
    <header
      aria-hidden={!isVisible}
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 transition-all duration-300 pointer-events-none ${
        isScrolled && isVisible
          ? 'py-4 bg-white/88 backdrop-blur-md border-b border-zinc-100/80'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -28,
          }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={isVisible ? 'pointer-events-auto' : 'pointer-events-none'}
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-[22px] font-bold tracking-tight text-[#141414] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Fashion.
          </button>
        </motion.div>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <motion.nav
          aria-label="Primary Navigation"
          initial={{ opacity: 0, y: -28 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -28,
          }}
          transition={{
            duration: 0.65,
            delay: isVisible ? 0.06 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`hidden md:flex items-center gap-11 text-[14.5px] ${
            isVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeSection === 'home'
                ? 'font-semibold text-[#141414]'
                : 'font-normal text-[#52525B] hover:text-[#141414]'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('product')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeSection === 'product'
                ? 'font-semibold text-[#141414]'
                : 'font-normal text-[#52525B] hover:text-[#141414]'
            }`}
          >
            Product
          </button>
          <button
            type="button"
            onClick={() => onNavigate('detail')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeSection === 'detail'
                ? 'font-semibold text-[#141414]'
                : 'font-normal text-[#52525B] hover:text-[#141414]'
            }`}
          >
            About Us
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeSection === 'contact'
                ? 'font-semibold text-[#141414]'
                : 'font-normal text-[#52525B] hover:text-[#141414]'
            }`}
          >
            Contact
          </button>
        </motion.nav>

        {/* Zone 3: User Replay / Profile & Shopping Bag Action */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -28,
          }}
          transition={{
            duration: 0.65,
            delay: isVisible ? 0.12 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`flex items-center gap-5 shrink-0 ${
            isVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={onReplayTour}
            aria-label="Replay animation showcase"
            title="Replay Full Animation Sequence"
            className="text-[#141414] hover:opacity-70 transition-opacity cursor-pointer p-1"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9.5" />
              <circle cx="12" cy="9.5" r="3" />
              <path d="M6.8 18.2c1.3-2.1 3.1-3.2 5.2-3.2s3.9 1.1 5.2 3.2" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            className="relative text-[#141414] hover:opacity-75 transition-opacity cursor-pointer p-1"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 7.5h12l1.2 12.5H4.8L6 7.5z" />
              <path d="M9 7.5V5.8a3 3 0 0 1 6 0v1.7" />
            </svg>
            <motion.span
              key={cartCount}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E11D2E] text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-sm tabular-nums"
            >
              {cartCount}
            </motion.span>
          </button>
        </motion.div>
      </div>
    </header>
  );
};
