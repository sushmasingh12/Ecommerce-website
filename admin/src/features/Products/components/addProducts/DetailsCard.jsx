const DetailsCard = ({
  form,
  setField,
  highlightInput,
  setHighlightInput,
  onAddHighlight,
  onRemoveHighlight,
}) => {
  const setNestedField = (parent, child, value) => {
    setField(parent, { ...form[parent], [child]: value });
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">list_alt</span>
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-on-surface">Product Details & Specs</h2>
      </div>

      <div className="space-y-10">
        {/* ── Highlights ────────────────────────────── */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
            Key Highlights
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddHighlight(highlightInput);
                }
              }}
              placeholder="e.g. 100% Organic Cotton"
              className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none"
            />
            <button
              type="button"
              onClick={() => onAddHighlight(highlightInput)}
              className="px-4 bg-primary text-on-primary rounded-xl text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Add
            </button>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {form.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 px-4 py-2 bg-surface-container-low rounded-lg text-sm text-on-surface-variant border border-outline-variant/10"
              >
                <span className="truncate">{h}</span>
                <button
                  onClick={() => onRemoveHighlight(i)}
                  className="material-symbols-outlined text-sm hover:text-error transition-colors"
                >
                  close
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-px bg-outline-variant/10" />

        {/* ── Specifications ────────────────────────── */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["fit", "fabric", "origin"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
                  {field}
                </label>
                <input
                  type="text"
                  value={form.specifications[field]}
                  onChange={(e) => setNestedField("specifications", field, e.target.value)}
                  placeholder={`e.g. ${field === 'fit' ? 'Regular' : field === 'fabric' ? 'Silk' : 'Italy'}`}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-outline-variant/10" />

        {/* ── Composition & Care ────────────────────── */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Composition & Care</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["outer", "lining", "care"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
                  {field}
                </label>
                <input
                  type="text"
                  value={form.composition[field]}
                  onChange={(e) => setNestedField("composition", field, e.target.value)}
                  placeholder={`e.g. ${field === 'care' ? 'Dry clean only' : '100% Wool'}`}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-outline-variant/10" />

        {/* ── Shipping Details ──────────────────────── */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Shipping & Returns</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["delivery", "returns", "warranty"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
                  {field}
                </label>
                <input
                  type="text"
                  value={form.shippingDetails[field]}
                  onChange={(e) => setNestedField("shippingDetails", field, e.target.value)}
                  placeholder="e.g. 3-5 business days"
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-outline-variant/10" />

        {/* ── Artisan's Note ────────────────────────── */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
            The Artisan's Note
          </label>
          <textarea
            value={form.artisanNote}
            onChange={(e) => setField("artisanNote", e.target.value)}
            placeholder="A personal touch about the craftsmanship..."
            rows={4}
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm text-on-surface-variant focus:ring-2 focus:ring-primary/10 outline-none resize-none italic"
          />
        </div>

        <div className="h-px bg-outline-variant/10" />

        {/* ── Rating Breakdown ──────────────────────── */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
            Rating Breakdown (%)
          </label>
          <div className="grid grid-cols-5 gap-4">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="space-y-2 text-center">
                <label className="text-[10px] font-bold text-on-surface-variant flex items-center justify-center gap-1">
                  {star} <span className="material-symbols-outlined text-[10px]">star</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.ratingBreakdown?.[star] || 0}
                  onChange={(e) => {
                    const newBreakdown = { ...form.ratingBreakdown, [star]: Number(e.target.value) };
                    setField("ratingBreakdown", newBreakdown);
                  }}
                  className="w-full bg-surface-container-low border-none rounded-lg px-2 py-2 text-center text-xs text-on-surface focus:ring-2 focus:ring-primary/10 outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsCard;
