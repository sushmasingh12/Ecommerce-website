const SummaryCards = ({ summaryCards }) => {
  if (!summaryCards) return null;
  const { efficiencyScore, modelReliability, sentimentMap } = summaryCards;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* AI Efficiency Score */}
      <div className="bg-primary text-white p-6 rounded-xl relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-[100px]">trending_up</span>
        </div>
        <h4 className="text-sm font-bold opacity-80 mb-1">AI Efficiency Score</h4>
        <div className="text-2xl font-extrabold mb-4">
          {efficiencyScore}
          <span className="text-md opacity-60">/100</span>
        </div>
        <p className="text-xs leading-relaxed opacity-80">
          Operational workflows are 12% more efficient than last month due to predictive logistics.
        </p>
      </div>

      {/* Model Reliability */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-on-surface-variant mb-4">Model Reliability</h4>
          <div className="flex items-center gap-2 mb-2">
            {modelReliability.bars.map((filled, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${filled ? "bg-green-500" : "bg-slate-300"}`}
              />
            ))}
          </div>
          <p className="text-[10px] text-on-surface-variant uppercase font-bold">
            Stable ({modelReliability.precision} Precision)
          </p>
        </div>
        <button className="mt-4 text-primary text-xs font-bold flex items-center gap-1">
          Diagnostics{" "}
          <span className="material-symbols-outlined text-sm">settings_suggest</span>
        </button>
      </div>

      {/* AI Sentiment Map */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 overflow-hidden">
        <h4 className="text-sm font-bold text-on-surface-variant mb-4">AI Sentiment Map</h4>
        <div className="flex gap-2 h-16 items-end">
          {sentimentMap.map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${height}%`,
                backgroundColor: `rgba(0,68,215,${height / 100})`,
              }}
            />
          ))}
        </div>
        <p className="text-[10px] mt-3 font-bold text-on-surface-variant uppercase text-center">
          Brand perception is peaking in "Lifestyle" categories.
        </p>
      </div>
    </section>
  );
};

export default SummaryCards;