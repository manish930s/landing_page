import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, getCartSubtotal } from '../utils/choreography';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const subtotal = getCartSubtotal(cart);

  const handleCheckout = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      onClearCart();
    }, 300);
  };

  const handleClose = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/35 backdrop-blur-[2px] z-50"
          />
          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Bag"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[410px] bg-white z-50 shadow-2xl flex flex-col justify-between p-7"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-zinc-100">
                <h3
                  className="text-xl font-bold tracking-tight text-[#141414]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close shopping bag"
                  className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {orderConfirmed ? (
                <div className="py-14 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h4
                    className="mt-4 text-lg font-bold text-[#141414]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Order #1084 Confirmed
                  </h4>
                  <p className="mt-2 text-sm text-zinc-500">
                    Your limited-run collection pieces are being prepared for express studio dispatch.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-zinc-500">
                    Your shopping bag is currently empty.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-zinc-100 mt-3 max-h-[58vh] overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <li
                      key={`${item.productId}-${item.size}-${item.colorId}`}
                      className="py-4 flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 rounded-xl object-cover bg-zinc-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#141414] truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Size {item.size} · {item.colorLabel}
                        </p>
                        <p className="text-sm font-semibold text-[#141414] mt-1 tabular-nums">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => onUpdateQuantity(idx, -1)}
                          className="w-7 h-7 rounded-lg border border-zinc-200 hover:border-zinc-400 text-xs font-bold flex items-center justify-center cursor-pointer"
                        >
                          −
                        </button>
                        <span className="text-xs font-semibold w-4 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => onUpdateQuantity(idx, 1)}
                          className="w-7 h-7 rounded-lg border border-zinc-200 hover:border-zinc-400 text-xs font-bold flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {!orderConfirmed && cart.length > 0 && (
              <div className="pt-5 border-t border-zinc-100">
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-zinc-500">Subtotal</span>
                  <span
                    className="text-lg font-bold text-[#141414] tabular-nums"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-full bg-[#181818] hover:bg-[#27272A] text-white text-xs font-semibold tracking-wider uppercase cursor-pointer transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
