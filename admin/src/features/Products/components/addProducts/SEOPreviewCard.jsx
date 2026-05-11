const SEOPreviewCard = ({ form, setField }) =>{
  const slug = form.title
    ? form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    : "your-product-name";

  const seoTitle = form.seoTitle || (form.title ? `${form.title} | Curator AI` : "");
  const seoDesc  = form.seoDescription || form.description || "";

  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
          SEO Preview
        </h3>
        <button
          onClick={() => setField("seoTitle", form.title ? `${form.title} | Curator AI` : "")}
          className="text-[10px] font-bold text-primary hover:underline"
        >
          Auto-fill
        </button>
      </div>

      {/* Preview Box */}
      <div className="p-4 rounded-xl border border-outline-variant/15 bg-surface-container-low/20 mb-4">
        <p className="text-[#1a0dab] text-base font-medium hover:underline cursor-pointer truncate">
          {seoTitle || "Product Title | Curator AI"}
        </p>
        <p className="text-[#006621] text-xs mt-1 truncate">
          {`https://curator.ai/products/${slug}`}
        </p>
        <p className="text-on-surface-variant text-xs mt-2 line-clamp-2 leading-relaxed">
          {seoDesc || "Add a product description to preview your SEO snippet here."}
        </p>
      </div>

      {/* Editable SEO fields */}
      <div className="space-y-3">
        <input
          type="text"
          value={form.seoTitle}
          onChange={(e) => setField("seoTitle", e.target.value)}
          placeholder="SEO Title"
          className="w-full bg-surface-container-low border-none rounded-xl px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
        />
        <textarea
          value={form.seoDescription}
          onChange={(e) => setField("seoDescription", e.target.value)}
          placeholder="SEO Description..."
          rows={3}
          className="w-full bg-surface-container-low border-none rounded-xl px-3 py-2 text-sm text-on-surface-variant focus:ring-0 outline-none resize-none"
        />
      </div>

      {/* AI Chip */}
      <div className="mt-4 flex items-center gap-2 p-3 bg-secondary-container/30 rounded-lg">
        <span className="material-symbols-outlined text-primary text-sm animate-pulse">
          auto_awesome
        </span>
        <p className="text-[11px] font-medium text-primary">
          AI Recommendation: Add 'handmade' to your meta-tags.
        </p>
      </div>
    </section>
  );
}

export default SEOPreviewCard