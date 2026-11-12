import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products';
import {
  computeCardTransform,
  addItemToCart,
  getCartTotalCount,
  getCartSubtotal,
  getInitialCart,
} from './choreography';

test('stack-rise places Woolan Fashion (index 3) on top of the center stack', () => {
  const woolan = computeCardTransform(PRODUCTS[3], 'stack-rise', 0, 3, 1360);
  const summer = computeCardTransform(PRODUCTS[0], 'stack-rise', 0, 3, 1360);
  assert.ok(woolan.zIndex > summer.zIndex, 'Woolan Fashion should have highest zIndex on initial stack rise');
  assert.equal(woolan.showBuyNow, true);
  assert.equal(Math.abs(woolan.x) < 15, true);
});

test('stack-shuffle flips Summer Cloths (index 0) to the top of the center stack', () => {
  const woolan = computeCardTransform(PRODUCTS[3], 'stack-shuffle', 0, 3, 1360);
  const summer = computeCardTransform(PRODUCTS[0], 'stack-shuffle', 0, 3, 1360);
  assert.ok(summer.zIndex > woolan.zIndex, 'Summer Cloths should flip to top of stack during shuffle');
  assert.equal(summer.showBuyNow, true);
});

test('hero-fan spreads all 6 cards left-to-right with tilted rotations', () => {
  const transforms = PRODUCTS.map((p) =>
    computeCardTransform(p, 'ready', 0, 3, 1360)
  );
  for (let i = 1; i < transforms.length; i++) {
    assert.ok(
      transforms[i].x > transforms[i - 1].x,
      `Card ${i} should be positioned to the right of Card ${i - 1}`
    );
  }
  assert.ok(transforms[0].rotate < 0, 'Left cards should tilt counter-clockwise');
  assert.ok(transforms[5].rotate > 0, 'Right cards should tilt clockwise');
  assert.equal(transforms[0].showMeta, false, 'Product metadata is hidden in Hero Fan');
});

test('best-selling stage un-rotates cards and makes Winter Cloths (1) & Woolan Fashion (3) taller', () => {
  const transforms = PRODUCTS.map((p) =>
    computeCardTransform(p, 'ready', 0.36, 3, 1360)
  );
  transforms.forEach((t) => {
    assert.equal(t.rotate, 0, 'Cards should be un-rotated in Best Selling row');
    assert.equal(t.showMeta, true, 'Metadata should be visible in Best Selling row');
  });
  assert.ok(
    transforms[1].height > transforms[0].height,
    'Winter Cloths (card 2) should be taller than Summer Cloths (card 1)'
  );
  assert.ok(
    transforms[3].height > transforms[2].height,
    'Woolan Fashion (card 4) should be taller than Modern Shorts (card 3)'
  );
});

test('best-selling-shifted slides carousel horizontally to the left to reveal Model Outfit', () => {
  const initialRow = computeCardTransform(PRODUCTS[5], 'ready', 0.36, 3, 1360);
  const shiftedRow = computeCardTransform(PRODUCTS[5], 'ready', 0.60, 3, 1360);
  assert.ok(
    shiftedRow.x < initialRow.x,
    'Carousel should shift left at scrollProgress 0.60'
  );
});

test('product-detail morphs selected card to large left portrait and moves others offscreen', () => {
  const selected = computeCardTransform(PRODUCTS[3], 'ready', 0.96, 3, 1360);
  const unselectedLeft = computeCardTransform(PRODUCTS[1], 'ready', 0.96, 3, 1360);
  const unselectedRight = computeCardTransform(PRODUCTS[4], 'ready', 0.96, 3, 1360);

  assert.ok(selected.width >= 440, 'Selected card should expand to large portrait width');
  assert.ok(selected.height >= 500, 'Selected card should expand to large portrait height');
  assert.equal(selected.showBuyNow, false, 'Buy Now pill hides on expanded PDP portrait');
  assert.equal(unselectedLeft.opacity, 0);
  assert.equal(unselectedRight.opacity, 0);
});

test('cart state starts with 2 items and increments properly when adding items', () => {
  const initial = getInitialCart();
  assert.equal(getCartTotalCount(initial), 2);
  const updated = addItemToCart(initial, PRODUCTS[3], 'L', {
    id: 'teal',
    label: 'Teal',
    hex: '#00A8B5',
  });
  assert.equal(getCartTotalCount(updated), 3);
  assert.equal(getCartSubtotal(updated), 178 + 220 + 178);
});
