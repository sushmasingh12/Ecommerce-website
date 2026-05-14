const SEOPreviewCard = ({ form, setField }) => {
  const slug = form.title
    ? form.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
    : "product-name";

  const autoTitle = form.title ? `${form.title} | Bazario` : "";
  const seoTitle = form.seoTitle || autoTitle;
  const seoDesc = form.seoDescription || form.description || "";

  const charCount = seoDesc.length;
  const charColor =
    charCount > 160 ? "text-error" : charCount > 120 ? "text-amber-500" : "text-emerald-600";

  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
          SEO Preview
        </h3>
        <button
          type="button"
          onClick={() => setField("seoTitle", autoTitle)}
          className="text-[10px] font-bold text-secondary hover:underline"
        >
          Auto-fill
        </button>
      </div>

      {/* ── Google SERP preview ───────────────────────── */}
      <div className="p-4 rounded-xl border border-outline-variant/15 bg-surface-container-low/20 mb-4">
        <p className="text-[#1a0dab] text-base font-medium hover:underline cursor-pointer truncate">
          {seoTitle || "Product Title | Bazario"}
        </p>
        <p className="text-[#006621] text-xs mt-1 truncate">
          {`https://bazario.in/product/${slug}`}
        </p>
        <p className="text-on-surface-variant text-xs mt-2 line-clamp-2 leading-relaxed">
          {seoDesc || "Add a product description to preview your SEO snippet here."}
        </p>
      </div>

      {/* ── Editable fields ──────────────────────────── */}
      <div className="space-y-3">
        <div>
          <input
            type="text"
            value={form.seoTitle}
            onChange={(e) => setField("seoTitle", e.target.value)}
            placeholder="SEO Title"
            maxLength={70}
            className="w-full bg-surface-container-low border-none rounded-xl px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
          />
          <p className="text-[9px] text-on-secondary-container mt-1 text-right">
            {(form.seoTitle || "").length}/70 chars
          </p>
        </div>

        <div>
          <textarea
            value={form.seoDescription}
            onChange={(e) => setField("seoDescription", e.target.value)}
            placeholder="SEO Description (120–160 characters recommended)…"
            rows={3}
            maxLength={200}
            className="w-full bg-surface-container-low border-none rounded-xl px-3 py-2 text-sm text-on-surface-variant focus:ring-0 outline-none resize-none"
          />
          <p className={`text-[9px] mt-1 text-right font-bold ${charColor}`}>
            {charCount}/160 chars
          </p>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
            URL Slug
          </label>
          <div className="flex items-center mt-1 bg-surface-container-low rounded-xl overflow-hidden">
            <span className="px-3 py-2 text-xs text-on-secondary-container border-r border-outline-variant/10 whitespace-nowrap">
              bazario.in/product/
            </span>
            <input
              type="text"
              value={form.seoUrl || slug}
              onChange={(e) => setField("seoUrl", e.target.value)}
              className="flex-1 bg-transparent border-none px-3 py-2 text-sm text-on-surface outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* ── AI Chip ──────────────────────────────────── */}
      <div className="mt-4 flex items-center gap-2 p-3 bg-secondary-fixed/40 rounded-lg">
        <span className="material-symbols-outlined text-secondary text-sm animate-pulse">
          auto_awesome
        </span>
        <p className="text-[11px] font-medium text-on-surface">
          Tip: Include the brand name "Bazario" in your meta-title for better CTR.
        </p>
      </div>
    </section>
  );
};

export default SEOPreviewCard;
