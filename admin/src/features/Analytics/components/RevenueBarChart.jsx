const RevenueBarChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-on-surface tracking-tight">Revenue Over Time</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">Monthly revenue vs order volume</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary-container inline-block" />
            Orders
          </span>
        </div>
      </div>

      <div className="flex items-end gap-3 h-44">
        {data.map((item) => {
          const heightPct = Math.round((item.revenue / maxRevenue) * 100);
          return (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full flex flex-col items-center gap-1 justify-end" style={{ height: "160px" }}>
                <span className="text-[10px] font-bold text-on-surface opacity-0 group-hover:opacity-100 transition-opacity">
                  ${(item.revenue / 1000).toFixed(0)}k
                </span>
                <div
                  className="w-full bg-primary rounded-t-md transition-all duration-300 group-hover:bg-primary/80"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className="text-[10px] font-medium text-on-surface-variant">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevenueBarChart;
