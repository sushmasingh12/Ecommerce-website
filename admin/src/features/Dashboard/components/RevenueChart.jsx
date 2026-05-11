const RevenueChart = ({ data = [], loading = false }) => {
  const maxVal = Math.max(...data.map((d) => d.actual), 1);

  if (loading) {
    return (
      <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15 animate-pulse">
        <div className="w-48 h-5 bg-slate-100 rounded mb-2" />
        <div className="w-72 h-3 bg-slate-100 rounded mb-8" />
        <div className="h-72 bg-slate-50 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 pb-4 rounded-xl shadow-sm border border-outline-variant/15">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h4 className="text-lg font-bold text-on-surface">
            Revenue Forecast vs. Actual
          </h4>
          <p className="text-sm text-on-surface-variant">
            Projected growth based on historical trends and current velocity.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs font-medium text-on-surface-variant">
              Actual
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary/30" />
            <span className="text-xs font-medium text-on-surface-variant">
              Forecast
            </span>
          </div>
        </div>
      </div>

      {/* Chart Width Wrapper */}
      <div className="mx-auto w-full max-w-[92%]">
        {/* Bars */}
        <div className="relative h-72 w-full">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full border-t border-outline-variant/10" />
            ))}
          </div>

          {/* Bars */}
          <div className="relative z-10 h-full flex items-end justify-between px-2 gap-2">
            {data.map((bar) => {
              const heightPct = Math.round((bar.actual / maxVal) * 100);

              return (
                <div
                  key={bar.month}
                  className="relative flex-1 group cursor-pointer"
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      bar.forecast
                        ? "bg-primary-container/20 hover:bg-primary-container/40"
                        : "bg-primary hover:opacity-90"
                    }`}
                    style={{ height: `${heightPct}%` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-on-surface text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                      {bar.actual}k
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Month Labels */}
        <div className="flex justify-between mt-2 px-2 text-[10px] font-bold text-on-secondary-container uppercase tracking-widest">
          {data.map((d) => (
            <span key={d.month} className="flex-1 text-center">
              {d.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;