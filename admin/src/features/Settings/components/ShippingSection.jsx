import ToggleSwitch from "./ToggleSwitch";


const ShippingSection = ({ shipping, onToggleSmartTax, onCurrencyChange }) => (
  <section id="shipping" className="relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 pointer-events-none"></div>
    <div
      className="border border-white/40 p-10 rounded-[2rem] shadow-xl"
      style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tighter">
            Shipping &amp; Global Logistics
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Configure automated duties calculation and courier integration.
          </p>
        </div>
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-primary text-3xl">public</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          {/* Smart Tax Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">auto_fix</span>
              <span className="text-sm font-bold">Smart Tax Estimation</span>
            </div>
            <ToggleSwitch
              checked={shipping.smartTaxEnabled}
              onChange={onToggleSmartTax}
            />
          </div>

          {/* Active Zones */}
          <div className="p-4 bg-white/50 rounded-2xl border border-white/60">
            <p className="text-[10px] uppercase font-bold text-on-secondary-container mb-3 tracking-widest">
              Active Zones
            </p>
            <div className="flex flex-wrap gap-2">
              {shipping.activeZones.map((zone) => (
                <span
                  key={zone.label}
                  className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    zone.active
                      ? "bg-primary text-white"
                      : "bg-surface-container-high text-on-surface"
                  }`}
                >
                  {zone.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Currency Selector */}
        <div className="bg-white/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-bold mb-4">Default Currency</p>
          <div className="relative">
            <select
              value={shipping.selectedCurrency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="w-full appearance-none bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            >
              {shipping.currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ShippingSection;