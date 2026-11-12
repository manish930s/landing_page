import { PRODUCTS, ProductItem, SizeOption } from '../data/products';

export type StagePhase =
  | 'skeleton'
  | 'stack-rise'
  | 'stack-shuffle'
  | 'hero-fan'
  | 'best-selling'
  | 'best-selling-shifted'
  | 'product-detail';

export interface CardTransform {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  scale: number;
  opacity: number;
  zIndex: number;
  borderRadius: number;
  showBuyNow: boolean;
  showMeta: boolean;
  metaOpacity: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: SizeOption;
  colorId: string;
  colorLabel: string;
  colorHex: string;
  quantity: number;
  image: string;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function lerp(a: number, b: number, t: number): number {
  const clamped = clamp(t, 0, 1);
  return a + (b - a) * clamped;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Computes responsive scale factor relative to a 1360px reference canvas width.
 */
export function getResponsiveScale(viewportWidth: number): number {
  if (viewportWidth <= 640) return clamp(viewportWidth / 520, 0.55, 0.78);
  if (viewportWidth <= 1024) return clamp(viewportWidth / 1180, 0.68, 0.9);
  return clamp(viewportWidth / 1360, 0.85, 1.12);
}

/**
 * Computes the Hero -> Showcase Cascade card transform for the pinned top stage.
 * - introPhase !== 'ready':
 *   Exact bottom-up card rise -> center stack -> shuffle (untouched).
 * - introPhase === 'ready':
 *   heroScrollProgress = 0.00 -> Exact "The Ultimate COLLECTIONS" 6-card Hero Fan (untouched).
 *   heroScrollProgress = 0.42 -> Cards gather into a center stack as Hero text scrolls out (00:04 of video).
 *   heroScrollProgress = 1.00 -> Cards fan out into the 5-card diagonal stair-step cascade on the right side
 *                                alongside "Showcase, Sell, & acquire arts to our marketplace." (00:05-00:06).
 */
export function computeHeroToShowcaseTransform(
  product: ProductItem,
  introPhase: 'stack-enter' | 'stack-rise' | 'stack-shuffle' | 'ready',
  heroScrollProgress: number,
  viewportWidth: number
): CardTransform {
  const scaleFactor = getResponsiveScale(viewportWidth);
  const idx = product.index;

  // Base dimensions in Hero Fan ("The Ultimate COLLECTIONS")
  const heroW = Math.round(204 * scaleFactor);
  const heroH = Math.round(246 * scaleFactor);
  const heroX = Math.round(product.heroFan.xOffset * scaleFactor);
  const heroY = Math.round(product.heroFan.yOffset * scaleFactor);
  const heroRot = product.heroFan.rotate;

  // 1. Intro phases: cards start stacked at the bottom of the screen and rise up into center stack
  if (introPhase === 'stack-enter') {
    return {
      x: product.stackOrder.initialX,
      y: Math.round(420 * scaleFactor) + product.stackOrder.initialY,
      width: Math.round(234 * scaleFactor),
      height: Math.round(278 * scaleFactor),
      rotate: product.stackOrder.initialRotate,
      scale: 0.94,
      opacity: 1,
      zIndex: product.stackOrder.initialZ,
      borderRadius: 26,
      showBuyNow: idx === 3,
      showMeta: false,
      metaOpacity: 0,
    };
  }

  if (introPhase === 'stack-rise') {
    return {
      x: product.stackOrder.initialX,
      y: 26 + product.stackOrder.initialY,
      width: Math.round(234 * scaleFactor),
      height: Math.round(278 * scaleFactor),
      rotate: product.stackOrder.initialRotate,
      scale: 1,
      opacity: 1,
      zIndex: product.stackOrder.initialZ,
      borderRadius: 26,
      showBuyNow: idx === 3,
      showMeta: false,
      metaOpacity: 0,
    };
  }

  if (introPhase === 'stack-shuffle') {
    const isCard1 = idx === 0;
    return {
      x: isCard1 ? 0 : product.stackOrder.initialX * 1.15,
      y: 22 + (isCard1 ? 0 : product.stackOrder.initialY),
      width: Math.round(234 * scaleFactor),
      height: Math.round(278 * scaleFactor),
      rotate: isCard1 ? -2.2 : product.stackOrder.initialRotate * 1.1,
      scale: isCard1 ? 1.02 : 0.99,
      opacity: 1,
      zIndex: isCard1 ? 70 : product.stackOrder.initialZ,
      borderRadius: 26,
      showBuyNow: isCard1,
      showMeta: false,
      metaOpacity: 0,
    };
  }

  // 2. Ready state at top of page (heroScrollProgress <= 0.02): Exact Hero Fan
  if (heroScrollProgress <= 0.02) {
    return {
      x: heroX,
      y: heroY,
      width: heroW,
      height: heroH,
      rotate: heroRot,
      scale: 1,
      opacity: 1,
      zIndex: product.heroFan.zIndex,
      borderRadius: 24,
      showBuyNow: true,
      showMeta: false,
      metaOpacity: 0,
    };
  }

  // Midpoint (0.40): Compact center stack (matches 00:04 in Klickpin video)
  const stackW = Math.round(208 * scaleFactor);
  const stackH = Math.round(244 * scaleFactor);
  const stackX = Math.round((idx - 2.5) * 4 * scaleFactor);
  const stackY = Math.round((idx - 2.5) * 3 * scaleFactor);
  const stackRot = (idx - 2.5) * 2.8;

  // Endpoint (1.00): 5-card diagonal stair-step cascade on the right side (matches 00:05-00:06 in Klickpin video)
  // Cards 0..4 form the 5 visible diagonal steps from upper-center-right to bottom-right; Card 5 tucks cleanly behind Card 4
  const cascadeSlot = Math.min(idx, 4);
  const isMobile = viewportWidth < 768;
  const cascadeBaseX = isMobile ? -95 : 82;
  const cascadeStepX = isMobile ? 48 : 96;
  const cascadeBaseY = isMobile ? -55 : -108;
  const cascadeStepY = isMobile ? 38 : 54;

  const cascadeX = Math.round((cascadeBaseX + cascadeSlot * cascadeStepX) * scaleFactor);
  const cascadeY = Math.round((cascadeBaseY + cascadeSlot * cascadeStepY) * scaleFactor);
  const cascadeW = Math.round(176 * scaleFactor);
  const cascadeH = Math.round(202 * scaleFactor);

  if (heroScrollProgress <= 0.42) {
    const t = smoothstep(0.02, 0.40, heroScrollProgress);
    return {
      x: lerp(heroX, stackX, t),
      y: lerp(heroY, stackY, t),
      width: lerp(heroW, stackW, t),
      height: lerp(heroH, stackH, t),
      rotate: lerp(heroRot, stackRot, t),
      scale: 1,
      opacity: 1,
      zIndex: t > 0.5 ? 60 - idx * 5 : product.heroFan.zIndex,
      borderRadius: 24,
      showBuyNow: t < 0.35,
      showMeta: false,
      metaOpacity: 0,
    };
  }

  const t2 = smoothstep(0.42, 0.92, heroScrollProgress);
  const targetOpacity = idx === 5 ? lerp(1, 0, smoothstep(0.5, 0.85, heroScrollProgress)) : 1;

  return {
    x: lerp(stackX, cascadeX, t2),
    y: lerp(stackY, cascadeY, t2),
    width: lerp(stackW, cascadeW, t2),
    height: lerp(stackH, cascadeH, t2),
    rotate: lerp(stackRot, 0, t2),
    scale: 1,
    opacity: targetOpacity,
    zIndex: 30 + idx * 5,
    borderRadius: lerp(24, 22, t2),
    showBuyNow: false,
    showMeta: false,
    metaOpacity: 0,
  };
}

/**
 * Computes exact card transform for any stage or continuous scroll progress.
 */
export function computeCardTransform(
  product: ProductItem,
  introPhase: 'stack-enter' | 'stack-rise' | 'stack-shuffle' | 'ready',
  scrollProgress: number,
  selectedProductIndex: number,
  viewportWidth: number
): CardTransform {
  const scaleFactor = getResponsiveScale(viewportWidth);
  const idx = product.index;

  // Base dimensions in Hero Fan
  const heroW = Math.round(204 * scaleFactor);
  const heroH = Math.round(246 * scaleFactor);
  const heroX = Math.round(product.heroFan.xOffset * scaleFactor);
  const heroY = Math.round(product.heroFan.yOffset * scaleFactor);
  const heroRot = product.heroFan.rotate;

  if (introPhase === 'stack-enter') {
    return {
      x: product.stackOrder.initialX,
      y: Math.round(420 * scaleFactor) + product.stackOrder.initialY,
      width: Math.round(234 * scaleFactor),
      height: Math.round(278 * scaleFactor),
      rotate: product.stackOrder.initialRotate,
      scale: 0.94,
      opacity: 1,
      zIndex: product.stackOrder.initialZ,
      borderRadius: 26,
      showBuyNow: idx === 3,
      showMeta: false,
      metaOpacity: 0,
    };
  }

  if (introPhase === 'stack-rise') {
    return {
      x: product.stackOrder.initialX,
      y: 26 + product.stackOrder.initialY,
      width: Math.round(234 * scaleFactor),
      height: Math.round(278 * scaleFactor),
      rotate: product.stackOrder.initialRotate,
      scale: 1,
      opacity: 1,
      zIndex: product.stackOrder.initialZ,
      borderRadius: 26,
      showBuyNow: idx === 3,
      showMeta: false,
      metaOpacity: 0,
    };
  }

  if (introPhase === 'stack-shuffle') {
    const isCard1 = idx === 0;
    return {
      x: isCard1 ? 0 : product.stackOrder.initialX * 1.15,
      y: 22 + (isCard1 ? 0 : product.stackOrder.initialY),
      width: Math.round(234 * scaleFactor),
      height: Math.round(278 * scaleFactor),
      rotate: isCard1 ? -2.2 : product.stackOrder.initialRotate * 1.1,
      scale: isCard1 ? 1.02 : 0.99,
      opacity: 1,
      zIndex: isCard1 ? 70 : product.stackOrder.initialZ,
      borderRadius: 26,
      showBuyNow: isCard1,
      showMeta: false,
      metaOpacity: 0,
    };
  }

  const gridCardW = Math.round(202 * scaleFactor);
  const gridGap = Math.round(26 * scaleFactor);
  const gridPitch = gridCardW + gridGap;
  const gridBaseX = Math.round((-2.15 + idx) * gridPitch);
  const gridShiftedX = Math.round((-2.85 + idx) * gridPitch);

  const gridCardH = product.isTallInGrid
    ? Math.round(288 * scaleFactor)
    : Math.round(236 * scaleFactor);
  const gridCardY = product.isTallInGrid
    ? Math.round(-26 * scaleFactor)
    : 0;

  if (scrollProgress <= 0.36) {
    const t = smoothstep(0.02, 0.34, scrollProgress);
    const metaT = smoothstep(0.22, 0.36, scrollProgress);
    return {
      x: lerp(heroX, gridBaseX, t),
      y: lerp(heroY, gridCardY, t),
      width: lerp(heroW, gridCardW, t),
      height: lerp(heroH, gridCardH, t),
      rotate: lerp(heroRot, 0, t),
      scale: 1,
      opacity: 1,
      zIndex: t > 0.5 ? 20 + idx : product.heroFan.zIndex,
      borderRadius: 24,
      showBuyNow: true,
      showMeta: metaT > 0.05,
      metaOpacity: metaT,
    };
  }

  if (scrollProgress <= 0.62) {
    const shiftT = smoothstep(0.40, 0.58, scrollProgress);
    return {
      x: lerp(gridBaseX, gridShiftedX, shiftT),
      y: gridCardY,
      width: gridCardW,
      height: gridCardH,
      rotate: 0,
      scale: 1,
      opacity: 1,
      zIndex: 20 + idx,
      borderRadius: 24,
      showBuyNow: true,
      showMeta: true,
      metaOpacity: 1,
    };
  }

  const detailT = smoothstep(0.64, 0.92, scrollProgress);
  const metaFadeOut = 1 - smoothstep(0.62, 0.74, scrollProgress);

  const isSelected = idx === selectedProductIndex;
  const detailW = viewportWidth < 768
    ? Math.round(Math.min(viewportWidth - 48, 360))
    : Math.round(460 * scaleFactor);
  const detailH = viewportWidth < 768
    ? Math.round(410 * scaleFactor)
    : Math.round(520 * scaleFactor);
  const detailX = viewportWidth < 768
    ? 0
    : Math.round(-275 * scaleFactor);
  const detailY = viewportWidth < 768
    ? Math.round(-110 * scaleFactor)
    : Math.round(12 * scaleFactor);

  if (isSelected) {
    return {
      x: lerp(gridShiftedX, detailX, detailT),
      y: lerp(gridCardY, detailY, detailT),
      width: lerp(gridCardW, detailW, detailT),
      height: lerp(gridCardH, detailH, detailT),
      rotate: 0,
      scale: 1,
      opacity: 1,
      zIndex: 80,
      borderRadius: lerp(24, 34, detailT),
      showBuyNow: detailT < 0.35,
      showMeta: metaFadeOut > 0.05,
      metaOpacity: metaFadeOut,
    };
  }

  const direction = idx < selectedProductIndex ? -1 : 1;
  const distanceIndex = Math.abs(idx - selectedProductIndex);
  const offscreenX =
    gridShiftedX + direction * (viewportWidth * 0.75 + distanceIndex * 90);

  return {
    x: lerp(gridShiftedX, offscreenX, detailT),
    y: gridCardY,
    width: gridCardW,
    height: gridCardH,
    rotate: 0,
    scale: lerp(1, 0.94, detailT),
    opacity: lerp(1, 0, smoothstep(0.66, 0.88, scrollProgress)),
    zIndex: 10 + idx,
    borderRadius: 24,
    showBuyNow: detailT < 0.5,
    showMeta: metaFadeOut > 0.05,
    metaOpacity: metaFadeOut,
  };
}

/**
 * Pure cart state helpers for unit testing and UI state management.
 */
export function addItemToCart(
  cart: CartItem[],
  product: ProductItem,
  size: SizeOption,
  color: { id: string; label: string; hex: string }
): CartItem[] {
  const existingIndex = cart.findIndex(
    (item) =>
      item.productId === product.id &&
      item.size === size &&
      item.colorId === color.id
  );
  if (existingIndex >= 0) {
    return cart.map((item, i) =>
      i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [
    ...cart,
    {
      productId: product.id,
      name: product.name,
      price: product.detailPrice,
      size,
      colorId: color.id,
      colorLabel: color.label,
      colorHex: color.hex,
      quantity: 1,
      image: product.image,
    },
  ];
}

export function getCartTotalCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getInitialCart(): CartItem[] {
  return [
    {
      productId: PRODUCTS[3].id,
      name: PRODUCTS[3].name,
      price: PRODUCTS[3].detailPrice,
      size: 'S',
      colorId: 'white',
      colorLabel: 'White',
      colorHex: '#FFFFFF',
      quantity: 1,
      image: PRODUCTS[3].image,
    },
    {
      productId: PRODUCTS[1].id,
      name: PRODUCTS[1].name,
      price: PRODUCTS[1].detailPrice,
      size: 'M',
      colorId: 'crimson',
      colorLabel: 'Red',
      colorHex: '#D90429',
      quantity: 1,
      image: PRODUCTS[1].image,
    },
  ];
}
