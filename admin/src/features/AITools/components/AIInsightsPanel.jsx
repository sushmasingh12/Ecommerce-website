const AIInsightsPanel = ({ insights, proTip }) => {
  if (!insights) return null;

  return (
    <div
      className="col-span-12 lg:col-span-4 rounded-xl p-6 shadow-xl ring-1 ring-primary/10 flex flex-col border border-white"
      style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <h3 className="text-md font-semibold text-on-surface tracking-tight">AI Insights</h3>
      </div>

      <div className="space-y-6 flex-1">
        {insights.map((item) => (
          <div key={item.id} className="space-y-3">
            <div
              className={`flex items-center gap-2 px-3 py-1 ${item.colorClass} rounded-full w-fit`}
            >
              <span className={`material-symbols-outlined ${item.textColorClass} text-sm`}>
                {item.icon}
              </span>
              <span className={`text-[10px] font-bold ${item.textColorClass} uppercase`}>
                {item.category}
              </span>
            </div>
            <p
              className="text-sm text-on-surface leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.message }}
            />
          </div>
        ))}

        {/* Pro Tip */}
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            <div>
              <p className="text-xs font-bold text-primary mb-1">PRO TIP</p>
              <p className="text-xs text-on-surface-variant leading-tight">{proTip}</p>
            </div>
          </div>
        </div>
      </div>

      <button className="mt-8 w-full py-3 bg-on-surface text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors">
        Ask AI Assistant
      </button>
    </div>
  );
};

export default AIInsightsPanel;