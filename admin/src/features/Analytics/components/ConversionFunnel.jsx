const ConversionFunnel = ({ funnel }) => {
  if (!funnel) return null;

  return (
    <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
      <h3 className="text-base font-semibold text-on-surface tracking-tight mb-1">Conversion Funnel</h3>
      <p className="text-xs text-on-surface-variant mb-5">From session to purchase</p>

      <div className="space-y-3">
        {funnel.map((step, i) => (
          <div key={step.stage} className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-on-surface">{step.stage}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-on-surface-variant">{step.count.toLocaleString()}</span>
                <span className="text-xs font-bold text-primary w-10 text-right">{step.pct}%</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className="h-full rounded-full bg-primary/70 transition-all duration-500"
                style={{ width: `${step.pct}%` }}
              />
            </div>
            {i < funnel.length - 1 && (
              <div className="absolute left-2.5 -bottom-2 w-px h-2 bg-outline-variant/50" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 p-3 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-xs font-semibold text-primary">
          Overall Conversion: {funnel[funnel.length - 1]?.pct}%
        </p>
        <p className="text-[11px] text-on-surface-variant mt-0.5">
          Industry average is ~3.5% — you're performing above average.
        </p>
      </div>
    </div>
  );
};

export default ConversionFunnel;
