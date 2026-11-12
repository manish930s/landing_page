export interface ProductItem {
  id: string;
  index: number;
  name: string;
  detailTitle: string;
  cardPrice: number;
  detailPrice: number;
  rating: string;
  image: string;
  accentColor: string;
  isTallInGrid: boolean;
  description: string;
  heroFan: {
    xOffset: number; // px relative to center on 1280px stage
    yOffset: number; // px relative to center
    rotate: number;  // degrees
    zIndex: number;
  };
  stackOrder: {
    initialZ: number;
     initialRotate: number;
    initialX: number;
    initialY: number;
  };
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'summer-cloths',
    index: 0,
    name: 'Summer Cloths',
    detailTitle: 'SUMMER CLOTHS',
    cardPrice: 80,
    detailPrice: 80.0,
    rating: '(4.5)',
    image: '/src/assets/images/card_summer_cloths_yellow_1794470938002.jpg',
    accentColor: '#F6B128',
    isTallInGrid: false,
    description:
      'Bring the past into the future with the Nike Air Max 2090, a bold look inspired by the DNA of the iconic Air Max 90. Brand-new Nike Air cushioning underfoot adds unparalleled comfort.',
    heroFan: {
      xOffset: -455,
      yOffset: 28,
      rotate: -6.5,
      zIndex: 10,
    },
    stackOrder: {
      initialZ: 50,
      initialRotate: -4,
      initialX: -6,
      initialY: 4,
    },
  },
  {
    id: 'winter-cloths',
    index: 1,
    name: 'Winter Cloths',
    detailTitle: 'WINTER CLOTHS',
    cardPrice: 220,
    detailPrice: 220.0,
    rating: '(4.5)',
    image: '/src/assets/images/card_winter_cloths_orange_1794470939362.jpg',
    accentColor: '#D95326',
    isTallInGrid: true,
    description:
      'Bring the past into the future with the Nike Air Max 2090, a bold look inspired by the DNA of the iconic Air Max 90. Brand-new Nike Air cushioning underfoot adds unparalleled comfort.',
    heroFan: {
      xOffset: -273,
      yOffset: -10,
      rotate: -3.2,
      zIndex: 20,
    },
    stackOrder: {
      initialZ: 40,
      initialRotate: 5,
      initialX: 8,
      initialY: -4,
    },
  },
  {
    id: 'modern-shorts',
    index: 2,
    name: 'Modern Shorts',
    detailTitle: 'MODERN SHORTS',
    cardPrice: 170,
    detailPrice: 170.0,
    rating: '(4.5)',
    image: '/src/assets/images/card_modern_shorts_beige_1794470941113.jpg',
    accentColor: '#F3C79B',
    isTallInGrid: false,
    description:
      'Bring the past into the future with the Nike Air Max 2090, a bold look inspired by the DNA of the iconic Air Max 90. Brand-new Nike Air cushioning underfoot adds unparalleled comfort.',
    heroFan: {
      xOffset: -91,
      yOffset: 8,
      rotate: -1.2,
      zIndex: 30,
    },
    stackOrder: {
      initialZ: 30,
      initialRotate: -6,
      initialX: -8,
      initialY: 6,
    },
  },
  {
    id: 'woolan-fashion',
    index: 3,
    name: 'Woolan Fashion',
    detailTitle: 'WOOLAN FASHION',
    cardPrice: 280,
    detailPrice: 178.0,
    rating: '(4.5)',
    image: '/src/assets/images/card_woolan_fashion_studio_1794470942757.jpg',
    accentColor: '#D44B20',
    isTallInGrid: true,
    description:
      'Bring the past into the future with the Nike Air Max 2090, a bold look inspired by the DNA of the iconic Air Max 90. Brand-new Nike Air cushioning underfoot adds unparalleled comfort.',
    heroFan: {
      xOffset: 91,
      yOffset: -8,
      rotate: 2.2,
      zIndex: 40,
    },
    stackOrder: {
      initialZ: 60, // Starts on top when rising from bottom!
      initialRotate: 2.5,
      initialX: 0,
      initialY: 0,
    },
  },
  {
    id: 'jogger-outfit',
    index: 4,
    name: 'Jogger Outfit',
    detailTitle: 'JOGGER OUTFIT',
    cardPrice: 480,
    detailPrice: 480.0,
    rating: '(4.5)',
    image: '/src/assets/images/card_jogger_outfit_teal_1794470945448.jpg',
    accentColor: '#3689A0',
    isTallInGrid: false,
    description:
      'Bring the past into the future with the Nike Air Max 2090, a bold look inspired by the DNA of the iconic Air Max 90. Brand-new Nike Air cushioning underfoot adds unparalleled comfort.',
    heroFan: {
      xOffset: 273,
      yOffset: 14,
      rotate: 4.5,
      zIndex: 35,
    },
    stackOrder: {
      initialZ: 20,
      initialRotate: -7.5,
      initialX: 6,
      initialY: 5,
    },
  },
  {
    id: 'model-outfit',
    index: 5,
    name: 'Model Outfit',
    detailTitle: 'MODEL OUTFIT',
    cardPrice: 480,
    detailPrice: 480.0,
    rating: '(4.5)',
    image: '/src/assets/images/card_model_outfit_loft_1794470944858.jpg',
    accentColor: '#C54A22',
    isTallInGrid: false,
    description:
      'Bring the past into the future with the Nike Air Max 2090, a bold look inspired by the DNA of the iconic Air Max 90. Brand-new Nike Air cushioning underfoot adds unparalleled comfort.',
    heroFan: {
      xOffset: 455,
      yOffset: 24,
      rotate: 6.5,
      zIndex: 25,
    },
    stackOrder: {
      initialZ: 10,
      initialRotate: 6.5,
      initialX: -5,
      initialY: -3,
    },
  },
];

export const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', '2XL'] as const;
export type SizeOption = (typeof AVAILABLE_SIZES)[number];

export interface ColorOption {
  id: string;
  label: string;
  hex: string;
  borderHex?: string;
}

export const AVAILABLE_COLORS: ColorOption[] = [
  { id: 'crimson', label: 'Red', hex: '#D90429' },
  { id: 'white', label: 'White', hex: '#FFFFFF', borderHex: '#181818' },
  { id: 'teal', label: 'Teal', hex: '#00A8B5' },
];
