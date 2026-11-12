import React from 'react';
import { motion } from 'motion/react';
import {
  ProductItem,
  AVAILABLE_SIZES,
  AVAILABLE_COLORS,
  SizeOption,
} from '../data/products';
import { smoothstep } from '../utils/choreography';

interface ProductDetailPanelProps {
  product: ProductItem;
  scrollProgress: number;
  selectedSize: SizeOption;
  selectedColorId: string;
  onSelectSize: (size: SizeOption) => void;
  onSelectColor: (colorId: string) => void;
  onAddToCart: () => void;
  addedFeedback: boolean;
}

export const ProductDetailPanel: React.FC<ProductDetailPanelProps> = ({
  product,
  scrollProgress,
  selectedSize,
  selectedColorId,
  onSelectSize,
  onSelectColor,
  onAddToCart,
  addedFeedback,
}) => {
  // Staggered entrance between scrollProgress 0.72 and 0.94
  const panelOpacity = smoothstep(0.70, 0.90, scrollProgress);
  const panelY = (1 - smoothstep(0.70, 0.92, scrollProgress)) * 64;
  const isInteractive = scrollProgress >= 0.72;

  return (
    <div
      className={`w-full max-w-[470px] transition-none ${
        isInteractive ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        opacity: panelOpacity,
        transform: `translate3d(0, ${panelY}px, 0)`,
      }}
    >
      {/* Product Title */}
      <h2
        className="text-[32px] sm:text-[38px] font-semibold tracking-tight text-[#141414] leading-[1.12] uppercase"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {product.detailTitle}
      </h2>

      {/* Price */}
      <p
        className="mt-3 text-[24px] sm:text-[26px] font-semibold text-[#141414] tabular-nums"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        ${product.detailPrice.toFixed(2)}
      </p>

      {/* Editorial Description */}
      <p className="mt-5 text-[14px] leading-[1.68] text-[#8E8E93] max-w-[420px]">
        {product.description}
      </p>

      {/* Size Selector */}
      <div className="mt-7">
        <p
          className="text-[13px] font-bold tracking-tight uppercase text-[#141414]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          SELECT SIZE (US)
        </p>
        <div
          role="radiogroup"
          aria-label="Select Size (US)"
          className="mt-3 flex items-center gap-3"
        >
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectSize(size)}
                className={`w-11 h-11 rounded-[12px] text-[13px] font-medium transition-all duration-150 flex items-center justify-center cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#1C1C1E] text-white shadow-[0_6px_16px_rgba(0,0,0,0.18)] scale-[1.03]'
                    : 'bg-white text-[#1C1C1E] border border-[#E4E4E7] hover:border-[#1C1C1E]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selector */}
      <div className="mt-6">
        <p
          className="text-[13px] font-bold tracking-tight uppercase text-[#141414]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          SELECT COLOR
        </p>
        <div
          role="radiogroup"
          aria-label="Select Color"
          className="mt-3 flex items-center gap-3.5"
        >
          {AVAILABLE_COLORS.map((color) => {
            const isSelected = selectedColorId === color.id;
            return (
              <button
                key={color.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={`Color ${color.label}`}
                onClick={() => onSelectColor(color.id)}
                className={`rounded-full transition-all duration-150 cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'w-10 h-10 border-[2px] border-[#181818] shadow-sm scale-105'
                    : 'w-7 h-7 border border-black/15 hover:scale-105'
                }`}
                style={{
                  backgroundColor: color.hex,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Primary Add To Cart Button */}
      <div className="mt-8">
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAddToCart}
          className="px-7 py-3.5 rounded-full bg-[#181818] hover:bg-[#27272A] text-white text-[12px] font-semibold tracking-wider uppercase flex items-center gap-3 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.32)] cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>{addedFeedback ? 'ADDED TO BAG ✓' : 'ADD TO CART'}</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="19" cy="21" r="1.5" />
            <path d="M2.5 3h2.8l2.4 11.5a2 2 0 0 0 2 1.5h9.2a2 2 0 0 0 1.9-1.4L23 6H6" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};
