const AIPredictedSales = ({ salesForecast, activeTab, onTabChange }) => {
  if (!salesForecast) return null;
  const { weeklyBars, confidenceScore, predictedGrowth, anomalies } = salesForecast;

  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-outline-variant/15 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold text-on-surface tracking-tight">AI Predicted Sales</h3>
          <p className="text-xs text-on-surface-variant">Demand forecasting based on current market velocity</p>
        </div>
        <div className="flex bg-surface-container-low p-1 rounded-lg">
          {["Weekly", "Monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === tab
                  ? "bg-white shadow-sm text-on-surface"
                  : "text-on-surface-variant"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[300px] relative flex items-end justify-center px-2">
  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
    <span className="material-symbols-outlined text-[120px]">show_chart</span>
  </div>

  <div className="w-[85%] h-full flex items-end gap-1 sm:gap-2">
    {weeklyBars.map((bar, index) => {
      if (bar.isDashed) {
        return (
          <div
            key={index}
            className="w-full border-2 border-dashed border-primary/30 rounded-t-md"
            style={{
              height: `${bar.height}%`,
              opacity: index === 7 ? 0.5 : index === 8 ? 0.4 : 0.3,
              borderColor:
                index === 7
                  ? "rgba(0,68,215,0.3)"
                  : index === 8
                  ? "rgba(0,68,215,0.2)"
                  : "rgba(0,68,215,0.1)",
            }}
          />
        );
      }

      return (
        <div
          key={index}
          className={`w-full rounded-t-md group relative ${
            bar.isHighlighted
              ? "bg-primary shadow-[0_0_20px_rgba(0,68,215,0.3)]"
              : ""
          }`}
          style={{
            height: `${bar.height}%`,
            backgroundColor: bar.isHighlighted
              ? undefined
              : `rgba(0,68,215,${bar.opacity / 100})`,
          }}
        >
          {bar.isHighlighted && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded whitespace-nowrap font-bold">
              {bar.value}
            </div>
          )}

          {bar.value && !bar.isHighlighted && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {bar.value}
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>

      {/* Footer Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-outline-variant/15">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-on-secondary-container font-bold mb-1">Confidence Score</p>
          <p className="text-xl font-bold text-on-surface">{confidenceScore}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-on-secondary-container font-bold mb-1">Predicted Growth</p>
          <p className="text-xl font-bold  text-green-600">{predictedGrowth}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-on-secondary-container font-bold mb-1">Anomalies</p>
          <p className="text-xl font-bold text-on-surface">{anomalies}</p>
        </div>
      </div>
    </div>
  );
};

export default AIPredictedSales;