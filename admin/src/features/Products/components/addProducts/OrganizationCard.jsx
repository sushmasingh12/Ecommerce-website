const CATEGORIES = [
  "Digital Photography",
  "Optics & Lenses",
  "Accessories",
  "Limited Editions",
];

const OrganizationCard = ({
  form,
  errors,
  tagInput,
  setTagInput,
  setField,
  onAddTag,
  onRemoveTag,
}) =>{
  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
      <h3 className="text-xs font-bold uppercase tracking-widest text-on-secondary-container mb-6">
        Organization
      </h3>
      <div className="space-y-6">
        {/* Category */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
            Category
          </label>
          <div className="relative">
            <select
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              className={`w-full appearance-none bg-surface-container-low border-none rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all ${
                errors.category ? "ring-2 ring-error/40" : ""
              }`}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
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

        {/* Tags */}
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
              placeholder="Add tag..."
              className="bg-transparent border-none focus:ring-0 outline-none p-0 text-[11px] placeholder:text-on-secondary-container/50 w-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default OrganizationCard