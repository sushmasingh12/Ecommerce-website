import React from 'react';

const OrderSummary = () => {
  return (
    <aside className="col-span-4 sticky top-24">
      <div className="bg-surface-container-lowest rounded-lg p-8 shadow-sm border border-outline-variant/10">
        <h2 className="text-xl font-bold tracking-tight text-on-surface mb-8">Summary</h2>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-sm">
            <span className="text-on-surface-variant">Subtotal</span>
            <span className="font-semibold text-on-surface">$1,197.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-on-surface-variant">Discount</span>
            <span className="font-semibold text-tertiary">-$50.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-on-surface-variant">Shipping</span>
            <span className="font-semibold text-on-surface">$15.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-on-surface-variant">Tax (8%)</span>
            <span className="font-semibold text-on-surface">$91.76</span>
          </div>
        </div>
        <div className="pt-6 border-t border-outline-variant/20 flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <span className="text-xs uppercase font-black tracking-widest text-on-secondary-container">Estimated Total</span>
            <span className="text-3xl font-black text-on-surface">$1,253.76</span>
          </div>
          {/* Glassmorphic AI Insight */}
          <div className="bg-secondary-container/40 backdrop-blur-md rounded-md p-4 border border-primary/5">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
              <p className="text-[11px] leading-relaxed text-on-secondary-fixed-variant">
                <strong className="text-primary">Precision Insight:</strong> Based on customer history, this order qualifies for "High Priority" fulfillment. Inventory levels for <span className="italic font-semibold">SW-7721-NV</span> are healthy.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Actions Embedded in Sticky Sidebar for Quick Access */}
      <div className="mt-8 flex flex-col gap-3">
        <button className="w-full bg-primary bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-md font-bold text-sm tracking-wide shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-xl">shopping_bag</span>
          Create Order
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-surface-container-high text-on-surface py-3 rounded-md font-bold text-xs uppercase tracking-wider hover:bg-surface-container-highest transition-colors">
            Save Draft
          </button>
          <button className="bg-surface-container-lowest text-on-surface-variant hover:text-error py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-colors border border-outline-variant/20">
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;
