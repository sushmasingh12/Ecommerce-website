export default function AIInsightBanner({ insight, loading = false }) {
  if (loading) {
    return (
      <div className="lg:col-span-2 bg-primary/5 border border-primary/10 rounded-2xl p-8 animate-pulse">
        <div className="w-32 h-4 bg-slate-200 rounded mb-4" />
        <div className="w-64 h-6 bg-slate-200 rounded mb-3" />
        <div className="w-full h-3 bg-slate-200 rounded mb-2" />
        <div className="w-3/4 h-3 bg-slate-200 rounded mb-6" />
        <div className="w-36 h-9 bg-slate-200 rounded" />
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="lg:col-span-2 bg-gradient-to-br from-primary/5 to-primary-container/5 border border-primary/10 rounded-2xl p-8 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            AI Predictive Insight
          </div>
        </div>
        <h4 className="text-xl font-bold text-on-surface mb-2">{insight.title}</h4>
        <p
          className="text-on-surface-variant max-w-lg mb-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: insight.description }}
        />
        <button className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all">
          {insight.cta}
        </button>
      </div>
      <span
        className="material-symbols-outlined absolute right-[-20px] bottom-[-20px] text-[160px] text-primary/5 select-none pointer-events-none"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        auto_awesome
      </span>
    </div>
  );
}