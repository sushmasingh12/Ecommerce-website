const GeographyBreakdown = ({ geography }) => {
  if (!geography) return null;

  return (
    <div className="col-span-12 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-on-surface tracking-tight">Revenue by Geography</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">Top markets this period</p>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant">public</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {geography.map((geo) => (
          <div
            key={geo.country}
            className="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-center"
          >
            <span className="text-3xl">{geo.flag}</span>
            <p className="text-xs font-semibold text-on-surface mt-2 truncate">{geo.country}</p>
            <p className="text-sm font-bold text-primary mt-1">{geo.revenue}</p>
            <p className="text-[10px] text-on-surface-variant">{geo.pct}% of total</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeographyBreakdown;
