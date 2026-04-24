import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartDrawer = () => {
  const { items, isOpen, total, count, closeDrawer, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-60 transition-opacity duration-300"
        onClick={closeDrawer}
      ></div>

      {/* Mini Cart Drawer */}
      <aside className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-70 flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
        {/* Drawer Header */}
        <header className="px-8 py-10 flex justify-between items-center bg-white border-b border-gray-100">
          <div>
            <h2 className="font-headline text-2xl tracking-tight">Your Selection</h2>
            <span className="text-[10px] font-label tracking-widest uppercase text-gray-500 mt-1 block">
              {count} {count === 1 ? 'CURATED ITEM' : 'CURATED ITEMS'}
            </span>
          </div>
          <button 
            onClick={closeDrawer}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors group"
          >
            <span className="material-symbols-outlined text-gray-400 group-hover:text-black">close</span>
          </button>
        </header>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-10 scrollbar-hide">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="material-symbols-outlined text-4xl text-gray-300">shopping_bag</span>
              <p className="text-sm text-gray-500 uppercase tracking-widest">Your bag is empty</p>
              <button 
                onClick={closeDrawer}
                className="text-[10px] font-label tracking-widest uppercase underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="flex gap-6 group">
                <div className="w-24 aspect-3/4 bg-gray-50 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={item.image} 
                    alt={item.name} 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-headline text-lg leading-tight uppercase tracking-tight">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id, item.variant)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                    <p className="text-[11px] font-label uppercase tracking-widest text-gray-500 mt-1">
                      {item.variant}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-4 border border-gray-200 px-3 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                        className="text-xs hover:text-secondary"
                      >
                        -
                      </button>
                      <span className="text-xs font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                        className="text-xs hover:text-secondary"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-headline font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <footer className="p-8 space-y-6 bg-gray-50">
            <div className="space-y-2 border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-label tracking-widest uppercase opacity-60">Subtotal</span>
                <span className="font-medium text-lg">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-label tracking-widest uppercase opacity-60">Shipping</span>
                <span className="text-[11px] font-label tracking-widest uppercase text-emerald-600 font-medium">Complimentary</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  closeDrawer();
                  navigate('/checkout');
                }}
                className="w-full bg-black text-white py-5 text-xs font-label tracking-[0.2em] uppercase hover:bg-gray-800 transition-all duration-500 active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={() => {
                  closeDrawer();
                  navigate('/cart');
                }}
                className="w-full bg-transparent text-black py-4 text-[10px] font-label tracking-[0.2em] uppercase hover:text-gray-600 transition-all underline underline-offset-8 decoration-gray-300"
              >
                View Full Bag
              </button>
            </div>
            <div className="flex justify-center gap-8 pt-4">
              <span className="material-symbols-outlined text-xl opacity-20">payments</span>
              <span className="material-symbols-outlined text-xl opacity-20">shield_lock</span>
              <span className="material-symbols-outlined text-xl opacity-20">verified_user</span>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
