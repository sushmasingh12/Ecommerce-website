const CustomerCohortAnalysis = ({ cohorts }) => {
  if (!cohorts) return null;

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-sm ring-1 ring-outline-variant/15 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-md font-bold text-on-surface tracking-tight">Customer Cohort Analysis</h3>
        <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
          View Detailed Matrix{" "}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      {/* Header */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="text-[10px] font-bold text-on-secondary-container uppercase">Cohort Group</div>
        <div className="text-[10px] font-bold text-on-secondary-container uppercase">Retention</div>
        <div className="text-[10px] font-bold text-on-secondary-container uppercase">LTV (Avg)</div>
        <div className="text-[10px] font-bold text-on-secondary-container uppercase">Sentiment</div>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {cohorts.map((cohort) => (
          <div
            key={cohort.id}
            className={`grid grid-cols-4 items-center p-3 hover:bg-surface-bright rounded-lg transition-colors border-l-4 ${cohort.borderColor}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${cohort.iconBg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${cohort.iconColor} text-lg`}>
                  {cohort.icon}
                </span>
              </div>
              <span className="text-sm font-semibold">{cohort.name}</span>
            </div>
            <div className="text-sm font-medium">{cohort.retention}</div>
            <div className={`text-sm font-bold ${cohort.ltvColor}`}>{cohort.ltv}</div>
            <div>
              <span className={`px-2 py-0.5 ${cohort.sentimentClass} text-[10px] font-bold rounded-full`}>
                {cohort.sentiment}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerCohortAnalysis;