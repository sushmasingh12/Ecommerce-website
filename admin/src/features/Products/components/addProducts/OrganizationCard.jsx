// ── Bazario category tree ──────────────────────────────────
// Must match navigationData.js in the storefront exactly.
const CATEGORY_OPTIONS = [
  { label: "Men", value: "men", subs: ["Shirts", "T-shirts", "Pant & Joggers", "Trouser"] },
  { label: "Women", value: "women", subs: ["Dresses & Skirts", "Top", "T-Shirt", "Bottomwear"] },
  { label: "Accessories", value: "accessories", subs: ["Bags", "Watches", "Jewellery"] },
  { label: "Footwear", value: "footwear", subs: ["Men Footwear", "Women Footwear"] },
  { label: "Collections", value: "collections", subs: [] },
  { label: "New Arrivals", value: "new-arrivals", subs: [] },
];

const OrganizationCard = ({
  form,
  errors,
  tagInput,
  setTagInput,
  setField,
  onAddTag,
  onRemoveTag,
}) => {
  // Derive available sub-categories from chosen top-level category
  const activeCat = CATEGORY_OPTIONS.find((c) => c.value === form.category);
  const subOptions = activeCat?.subs ?? [];

  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
      <h3 className="text-xs font-bold uppercase tracking-widest text-on-secondary-container mb-6">
        Organization
      </h3>

      <div className="space-y-6">
        {/* ── Category ──────────────────────────────── */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
            Category
          </label>
          <div className="relative">
            <select
              value={form.category}
              onChange={(e) => {
                setField("category", e.target.value);
                setField("subcategory", ""); // reset sub when cat changes
              }}
              className={`w-full appearance-none bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all ${errors.category ? "ring-2 ring-error/40" : ""
                }`}
            >
              <option value="">Select category…</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-secondary-container pointer-events-none text-sm">
              unfold_more
            </span>
          </div>
          {errors.category && (
            <p className="text-xs text-error font-medium">{errors.category}</p>
          )}
        </div>

        {/* ── Sub-category (conditional) ────────────── */}
        {subOptions.length > 0 && (
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
              Sub-category
            </label>
            <div className="relative">
              <select
                value={form.subcategory ?? ""}
                onChange={(e) => setField("subcategory", e.target.value)}
                className="w-full appearance-none bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              >
                <option value="">All {activeCat?.label}</option>
                {subOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-secondary-container pointer-events-none text-sm">
                unfold_more
              </span>
            </div>
          </div>
        )}

        {/* ── Brand & Gender ────────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
              Brand
            </label>
            <input
              type="text"
              value={form.brand}
              onChange={(e) => setField("brand", e.target.value)}
              placeholder="e.g. Bazario"
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
              Gender
            </label>
            <div className="relative">
              <select
                value={form.gender}
                onChange={(e) => setField("gender", e.target.value)}
                className="w-full appearance-none bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
                <option value="Kids">Kids</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-secondary-container pointer-events-none text-sm">
                unfold_more
              </span>
            </div>
          </div>
        </div>

        {/* ── Tags ──────────────────────────────────── */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 p-3 bg-surface-container-low rounded-xl min-h-[80px]">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2 py-1 bg-white rounded-md text-[11px] font-bold text-primary uppercase tracking-tighter shadow-sm border border-outline-variant/5"
              >
                {tag}
                <button
                  onClick={() => onRemoveTag(tag)}
                  className="material-symbols-outlined text-[10px] hover:text-error transition-colors"
                >
                  close
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  onAddTag(tagInput);
                }
              }}
              placeholder="Add tag…"
              className="bg-transparent border-none focus:ring-0 outline-none p-0 text-[11px] placeholder:text-on-secondary-container/50 w-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationCard;
