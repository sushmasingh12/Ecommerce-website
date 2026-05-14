const PricingInventoryCard = ({
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
        {/* ── Price + Discount ──────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Base Price */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
              Base Price ({form.currency === 'INR' ? '₹' : form.currency})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-secondary-container text-sm font-semibold">
                {form.currency === 'INR' ? '₹' : form.currency}
              </span>
              <input
                type="number"
                value={form.basePrice}
                onChange={(e) => setField("basePrice", e.target.value)}
                placeholder="0"
                className={`w-full bg-surface-container-low border-none rounded-xl pl-7 pr-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all ${errors.basePrice ? "ring-2 ring-error/40" : ""
                  }`}
              />
            </div>
            {errors.basePrice && (
              <p className="text-xs text-error font-medium">{errors.basePrice}</p>
            )}
          </div>

          {/* Discount % */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
              Discount (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                value={form.discount}
                onChange={(e) => setField("discount", e.target.value)}
                placeholder="0"
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-secondary-container text-sm">
                %
              </span>
            </div>
          </div>
        </div>

        {/* ── Currency & Badge ──────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
              Currency
            </label>
            <input
              type="text"
              value={form.currency}
              onChange={(e) => setField("currency", e.target.value)}
              placeholder="e.g. INR"
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
              Badge
            </label>
            <input
              type="text"
              value={form.badge}
              onChange={(e) => setField("badge", e.target.value)}
              placeholder="e.g. New Arrival"
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* ── Final Price Preview ───────────────────── */}
        {form.basePrice && (
          <div className="flex items-center gap-3 px-4 py-3 bg-secondary-fixed/30 rounded-xl">
            <span className="material-symbols-outlined text-secondary text-base">sell</span>
            <div className="text-sm">
              <span className="font-bold text-on-surface">
                ₹{Math.round(form.basePrice * (1 - (form.discount || 0) / 100)).toLocaleString("en-IN")}
              </span>
              {form.discount > 0 && (
                <span className="ml-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  {form.discount}% OFF
                </span>
              )}
              <span className="ml-2 text-xs text-on-surface-variant">selling price</span>
            </div>
          </div>
        )}

        <div className="h-px bg-outline-variant/10" />

        {/* ── SKU ───────────────────────────────────── */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
            SKU (Stock Keeping Unit)
          </label>
          <input
            type="text"
            value={form.sku}
            onChange={(e) => setField("sku", e.target.value)}
            placeholder="BZR-MEN-001"
            className={`w-full bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all ${errors.sku ? "ring-2 ring-error/40" : ""
              }`}
          />
          {errors.sku && (
            <p className="text-xs text-error font-medium">{errors.sku}</p>
          )}
        </div>

        {/* ── Stock Stepper ─────────────────────────── */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
            Stock Quantity
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onDecrement}
              className="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-xl text-on-surface hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <input
              type="number"
              value={form.stock}
              onChange={(e) =>
                setField("stock", Math.max(0, Number(e.target.value)))
              }
              className="flex-1 text-center bg-surface-container-low border-none rounded-xl py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none"
            />
            <button
              type="button"
              onClick={onIncrement}
              className="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-xl text-on-surface hover:bg-surface-container-high transition-all"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>

          {/* Stock status chip */}
          <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${form.stock > 10
              ? "text-emerald-600"
              : form.stock > 0
                ? "text-amber-600"
                : "text-error"
            }`}>
            {form.stock > 10
              ? "✓ In Stock"
              : form.stock > 0
                ? "⚠ Low Stock"
                : "✕ Out of Stock"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingInventoryCard;
