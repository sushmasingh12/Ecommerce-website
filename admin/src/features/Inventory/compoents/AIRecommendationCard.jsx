// src/features/Inventory/components/AIRecommendationCard.jsx

const AISkeleton = () => (
  <div className="lg:col-span-2 glass-ai p-8 rounded-2xl shadow-xl border border-white/40 animate-pulse">
    <div className="h-4 w-40 bg-surface-container-high rounded mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-3">
        <div className="h-6 w-full bg-surface-container-high rounded" />
        <div className="h-4 w-full bg-surface-container-high rounded" />
        <div className="h-4 w-3/4 bg-surface-container-high rounded" />
        <div className="flex gap-4 mt-6">
          <div className="h-9 w-32 bg-surface-container-high rounded-lg" />
          <div className="h-9 w-20 bg-surface-container-high rounded-lg" />
        </div>
      </div>
      <div className="bg-white/40 rounded-xl p-5 space-y-4">
        <div className="h-2 w-full bg-surface-container-high rounded-full" />
        <div className="flex justify-between gap-4">
          <div className="h-8 w-16 bg-surface-container-high rounded" />
          <div className="h-8 w-16 bg-surface-container-high rounded" />
        </div>
      </div>
    </div>
  </div>
);

const AIRecommendationCard = ({
  aiRecommendation,
  isLoading,
  aiDismissed,
  onApprove,
  onDismiss,
}) => {
  if (isLoading) return <AISkeleton />;
  if (!aiRecommendation || aiDismissed) return null;

  return (
    <div className="lg:col-span-2 glass-ai p-8 rounded-2xl shadow-xl relative overflow-hidden border border-white/40">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-container text-primary">
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
          </span>
          <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1">
            AI Restock Intelligence
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left */}
          <div>
            <h4 className="text-xl font-bold text-on-surface leading-tight mb-2">
              {aiRecommendation.title}
            </h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {aiRecommendation.description}
            </p>
            <div className="mt-6 flex gap-4">
              <button
                className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-lg uppercase tracking-widest hover:shadow-lg hover:shadow-primary/30 transition-all"
                onClick={onApprove}
              >
                Approve &amp; Draft PO
              </button>
              <button
                className="px-6 py-2.5 text-on-surface-variant text-xs font-bold rounded-lg uppercase tracking-widest hover:bg-surface-container-high transition-all"
                onClick={onDismiss}
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="bg-white/40 rounded-xl p-5 border border-white/60">
            <div className="flex justify-between items-end mb-4">
              <p className="text-[10px] font-bold text-on-secondary-container uppercase">
                Forecast Confidence
              </p>
              <p className="text-sm font-bold text-primary">
                {aiRecommendation.confidence}%
              </p>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${aiRecommendation.confidence}%` }}
              />
            </div>
            <div className="mt-6 flex justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold text-on-secondary-container uppercase">
                  Avg. Daily Sales
                </p>
                <p className="text-lg font-bold text-on-surface">
                  {aiRecommendation.avgDailySales}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-secondary-container uppercase">
                  Days Remaining
                </p>
                <p className="text-lg font-bold text-on-surface">
                  {aiRecommendation.daysRemaining} Days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationCard;