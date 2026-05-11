const StoreProfileSection = ({ storeProfile, onNameChange, onEmailChange }) => (
  <section
    id="store-profile"
    className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm"
  >
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-on-surface">Store Profile</h2>
        <p className="text-xs text-on-secondary-container font-semibold uppercase tracking-wider mt-1">
          Core Identity &amp; Branding
        </p>
      </div>
      <div className="bg-secondary-container/30 px-3 py-1.5 rounded-full flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
        <span className="text-[10px] font-bold text-primary uppercase">AI Optimized</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-on-secondary-container uppercase tracking-widest pl-1">
            Store Name
          </label>
          <input
            type="text"
            value={storeProfile.storeName}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 outline-none placeholder:text-outline-variant"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-on-secondary-container uppercase tracking-widest pl-1">
            Support Email
          </label>
          <input
            type="email"
            value={storeProfile.supportEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 outline-none"
          />
        </div>
      </div>

      {/* Logo Upload */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 bg-surface-container-low/50">
        <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-primary">add_a_photo</span>
        </div>
        <p className="text-sm font-semibold text-on-surface">Upload Store Logo</p>
        <p className="text-[10px] text-on-surface-variant mt-1">PNG, JPG or SVG up to 10MB</p>
      </div>
    </div>
  </section>
);

export default StoreProfileSection;