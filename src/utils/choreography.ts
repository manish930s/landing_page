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
 * Computes exact card transform for any stage or continuous scroll progress.
 * scrollProgress is normalized [0..1] across the main scroll container:
 *   0.00           -> hero-fan ("The Ultimate COLLECTIONS")
 *   0.38 .. 0.48   -> best-selling ("Best Selling Product Of The COLLECTION")
 *   0.52 .. 0.65   -> best-selling-shifted (horizontal carousel shift left)
 *   0.85 .. 1.00   -> product-detail ("WOOLAN FASHION" detail morph)
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
    // Stacked tightly in the center after rising from bottom, Card 4 (index 3) on top
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
    // Card 1 (index 0) flips to the top of the center stack
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

  // 2. Ready state: interpolate across scrollProgress [0..1]
  // Stage A (0.00 -> 0.36): Hero Fan -> Best Selling Row
  // Stage B (0.36 -> 0.62): Best Selling Row -> Best Selling Carousel Shifted Left
  // Stage C (0.62 -> 0.94): Best Selling Shifted -> Product Detail Morph

  // Best Selling Row geometry:
  // 6 cards laid out horizontally with uniform gap, un-rotated (0deg).
  // Cards 1 (idx 1) and 3 (idx 3) are taller ("Winter Cloths" and "Woolan Fashion").
  const gridCardW = Math.round(202 * scaleFactor);
  const gridGap = Math.round(26 * scaleFactor);
  const gridPitch = gridCardW + gridGap;
  // In initial Best Selling frame (frame_030), Card 0 starts near left margin and Card 5 is partially off right edge
  const gridBaseX = Math.round((-2.15 + idx) * gridPitch);
  const gridShiftedX = Math.round((-2.85 + idx) * gridPitch); // shifted left so Card 5 is fully visible (frame_038)

  const gridCardH = product.isTallInGrid
    ? Math.round(288 * scaleFactor)
    : Math.round(236 * scaleFactor);
  // Align bottom edges of all cards so tall cards rise upward, matching frame_030!
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

  // Stage C (0.62 -> 1.00): Morph from Best Selling Shifted into Product Detail View
  const detailT = smoothstep(0.64, 0.92, scrollProgress);
  const metaFadeOut = 1 - smoothstep(0.62, 0.74, scrollProgress);

  const isSelected = idx === selectedProductIndex;
  // Target geometry for the selected card on the left of the Product Detail View (matching frame_050)
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

  // Non-selected cards slide cleanly outward horizontally (left cards go left, right cards go right)
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
  // Matches the "2" badge on the shopping bag in the reference video!
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
