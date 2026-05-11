const TrafficSources = ({ sources }) => {
  if (!sources) return null;

  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
      <h3 className="text-base font-semibold text-on-surface tracking-tight mb-1">Traffic Sources</h3>
      <p className="text-xs text-on-surface-variant mb-5">Where your visitors come from</p>

      <div className="space-y-4">
        {sources.map((src) => (
          <div key={src.source}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-on-surface">{src.source}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant">{src.sessions.toLocaleString()}</span>
                <span className="text-xs font-bold text-primary">{src.pct}%</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div
                className={`h-full rounded-full ${src.color} transition-all duration-500`}
                style={{ width: `${src.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSources;
