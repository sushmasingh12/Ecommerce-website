const GeneralInfoCard = ({ form, errors, setField }) => {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">description</span>
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-on-surface">General Information</h2>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              Product Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. Zenit-M Digital Rangefinder Camera"
              className={`w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all ${errors.title ? "ring-2 ring-error/40" : ""
                }`}
            />
            {errors.title && (
              <p className="text-xs text-error font-medium mt-1">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
              Sub-description / Tagline
            </label>
            <input
              type="text"
              value={form.subdesc}
              onChange={(e) => setField("subdesc", e.target.value)}
              placeholder="e.g. Limited Edition Craftsmanship"
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* short Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-secondary-container">
            Short Description
          </label>
          <div className="border border-outline-variant/15 rounded-xl overflow-hidden bg-surface-container-low">
            {/* Mini Toolbar */}
            {/* <div className="flex items-center gap-2 p-3 bg-white/50 border-b border-outline-variant/10">
              {["format_bold", "format_italic", "format_list_bulleted", "link", "image"].map(
                (icon, i) => (
                  <span key={icon}>
                    {i === 4 && (
                      <span className="h-4 w-px bg-outline-variant/20 mx-1 inline-block" />
                    )}
                    <button className="p-1.5 hover:bg-surface-container-high rounded transition-colors text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">{icon}</span>
                    </button>
                  </span>
                )
              )}
            </div> */}
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Describe the product craftsmanship, features, and technical specifications..."
              rows={6}
              className="w-full bg-transparent border-none rounded-b-xl px-4 py-3 text-on-surface-variant focus:ring-0 outline-none text-sm leading-relaxed resize-none"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default GeneralInfoCard;