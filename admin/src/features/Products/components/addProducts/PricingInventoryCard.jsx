const PricingInventoryCard =({
  form,
  errors,
  setField,
  onIncrement,
  onDecrement,
}) => {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
      <h3 className="text-xs font-bold uppercase tracking-widest text-on-secondary-container mb-6">
        Pricing &amp; Inventory
      </h3>
      <div className="space-y-4">
        {/* Price + Discount */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
              Base Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-secondary-container text-sm">
                $
              </span>
              <input
                type="number"
                value={form.basePrice}
                onChange={(e) => setField("basePrice", e.target.value)}
                placeholder="0.00"
                className={`w-full bg-surface-container-low border-none rounded-xl pl-7 pr-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all ${
                  errors.basePrice ? "ring-2 ring-error/40" : ""
                }`}
              />
            </div>
            {errors.basePrice && (
              <p className="text-xs text-error font-medium">{errors.basePrice}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
              Discount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-secondary-container text-sm">
                $
              </span>
              <input
                type="number"
                value={form.discount}
                onChange={(e) => setField("discount", e.target.value)}
                placeholder="0.00"
                className="w-full bg-surface-container-low border-none rounded-xl pl-7 pr-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-outline-variant/10" />

        {/* SKU */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
            SKU (Stock Keeping Unit)
          </label>
          <input
            type="text"
            value={form.sku}
            onChange={(e) => setField("sku", e.target.value)}
            placeholder="ZN-500-BLK"
            className={`w-full bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all ${
              errors.sku ? "ring-2 ring-error/40" : ""
            }`}
          />
          {errors.sku && (
            <p className="text-xs text-error font-medium">{errors.sku}</p>
          )}
        </div>

        {/* Stock Stepper */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
            Stock Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={onDecrement}
              className="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-xl text-on-surface hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setField("stock", Math.max(0, Number(e.target.value)))}
              className="flex-1 text-center bg-surface-container-low border-none rounded-xl py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none"
            />
            <button
              onClick={onIncrement}
              className="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-xl text-on-surface hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingInventoryCard