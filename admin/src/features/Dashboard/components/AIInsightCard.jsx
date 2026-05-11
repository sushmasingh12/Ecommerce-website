import { Link } from "react-router-dom";

const AIInsightCard = ({ insight, loading = false }) =>{
  if (loading) {
    return (
      <div className="p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-white to-secondary-container/20 animate-pulse">
        <div className="w-32 h-4 bg-slate-100 rounded mb-4" />
        <div className="w-full h-3 bg-slate-100 rounded mb-2" />
        <div className="w-3/4 h-3 bg-slate-100 rounded mb-4" />
        <div className="w-28 h-3 bg-slate-100 rounded" />
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="p-6 rounded-xl border border-primary/20 bg-gradient-to-br from-white to-secondary-container/20 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="material-symbols-outlined text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
        <h5 className="font-bold text-on-surface text-sm uppercase tracking-wider">
          Curator Insights
        </h5>
      </div>

      <p
        className="text-sm text-on-surface-variant leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: insight.message }}
      />

      
        <Link Link
        onClick={(e) => e.preventDefault()}
        className="text-primary font-bold text-xs flex items-center gap-1 hover:underline"
      >
        {insight.cta}
        <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
      </Link>
    </div>
  );
}

export default  AIInsightCard