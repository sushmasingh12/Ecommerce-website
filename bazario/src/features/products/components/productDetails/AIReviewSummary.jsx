import React from 'react';

const ReviewStat = ({ label, status, percentage, quote }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
      <span className="text-xs font-serif  text-secondary">{status}</span>
    </div>
    <div className="w-full h-px bg-outline-variant/30 relative">
      <div 
        className="absolute inset-y-0 left-0 bg-secondary transition-all duration-1000" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <p className="text-xs text-on-surface-variant ">{quote}</p>
  </div>
);

const AIReviewSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <section className="mt-16 px-12 py-20 bg-surface-container-low">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <h2 className="text-3xl font-serif tracking-tight">The Curator's Review Summary</h2>
        </div>
        {summary && typeof summary === 'object' && (summary.fabricQuality || summary.tailoredFit || summary.versatility) ? (
          <div className="grid md:grid-cols-3 gap-12">
            {summary.fabricQuality && <ReviewStat {...summary.fabricQuality} />}
            {summary.tailoredFit && <ReviewStat {...summary.tailoredFit} />}
            {summary.versatility && <ReviewStat {...summary.versatility} />}
          </div>
        ) : (
          <p className="text-lg font-serif  text-on-surface-variant leading-relaxed max-w-2xl">
            {typeof summary === 'string' ? summary : 'No summary available.'}
          </p>
        )}
      </div>
    </section>
  );
};

export default AIReviewSummary;
