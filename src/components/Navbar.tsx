import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (target: 'home' | 'product' | 'detail' | 'contact') => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <header
      aria-hidden={!isVisible}
      className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-10 lg:px-[5vw] transition-all duration-300 pointer-events-none ${
        isScrolled && isVisible
          ? 'py-3.5 sm:py-4 lg:py-[1.1vw] bg-white/90 backdrop-blur-md border-b border-zinc-100/80'
          : 'py-5 sm:py-6 lg:py-[1.6vw] bg-transparent'
      }`}
    >
      <div className="w-full flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark ("Fashion.") — Scaled proportionally for normal & fullscreen displays */}
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
            onClick={() => handleNavClick('home')}
            className="text-[23px] sm:text-[26px] lg:text-[clamp(25px,1.8vw,34px)] font-bold tracking-tight text-[#141414] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Fashion.
          </button>
        </motion.div>

        {/* Zone 2: 4 Single-line Navigation Links (Desktop / Tablet) */}
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
          className={`hidden md:flex items-center gap-8 lg:gap-[3.3vw] text-[15px] lg:text-[clamp(15.5px,1.1vw,20px)] ${
            isVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={() => handleNavClick('home')}
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
            onClick={() => handleNavClick('product')}
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
            onClick={() => handleNavClick('detail')}
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
            onClick={() => handleNavClick('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeSection === 'contact'
                ? 'font-semibold text-[#141414]'
                : 'font-normal text-[#52525B] hover:text-[#141414]'
            }`}
          >
            Contact
          </button>
        </motion.nav>

        {/* Zone 3: User Replay / Profile, Shopping Bag Action, & Mobile Menu Toggle */}
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
          className={`flex items-center gap-4 sm:gap-6 shrink-0 ${
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
              className="w-[23px] h-[23px] lg:w-[clamp(23px,1.55vw,29px)] lg:h-[clamp(23px,1.55vw,29px)]"
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
              className="w-[22px] h-[22px] lg:w-[clamp(22px,1.5vw,28px)] lg:h-[clamp(22px,1.5vw,28px)]"
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
              className="absolute -top-1 -right-1.5 min-w-[19px] h-[19px] lg:min-w-[22px] lg:h-[22px] px-1 rounded-full bg-[#E11D2E] text-white text-[10.5px] lg:text-[12px] font-bold flex items-center justify-center leading-none shadow-sm tabular-nums"
            >
              {cartCount}
            </motion.span>
          </button>

          {/* Mobile Hamburger Menu Button (< 768px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile navigation"
            className="md:hidden w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-[#141414] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>

      {/* Responsive Mobile Navigation Drawer (< 768px) */}
      <AnimatePresence>
        {mobileMenuOpen && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto mt-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-zinc-200/80 p-4 flex flex-col gap-2"
          >
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'product', label: 'Product' },
                { id: 'detail', label: 'About Us' },
                { id: 'contact', label: 'Contact' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#141414] text-white font-semibold'
                    : 'text-[#141414] hover:bg-zinc-100 font-medium'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
