import AIInsightsPanel from "../components/AIInsightsPanel";
import AIPredictedSales from "../components/AIPredictedSales";
import CustomerCohortAnalysis from "../components/CustomerCohortAnalysis";
import RecommendationEngine from "../components/RecommendationEngine";
import SummaryCards from "../components/SummaryCards";
import { useAIInsights } from "../hooks/useAIInsights";



const AIInsightsPage = () => {
  const { data, activeTab, status, handleTabChange } = useAIInsights();

  if (status === "loading" || !data) {
    return (
      <main className="ml-64 p-8">
        <div className="text-on-surface-variant text-sm">Loading AI Insights...</div>
      </main>
    );
  }

  return (
    <main className="p-8 space-y-8">
      {/* Hero Title Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          
          <h2 className="text-2xl font-semibold tracking-tighter text-on-surface">
            AI Insights <span className="text-primary">&amp;</span> Analytics
          </h2>
          <p className="text-on-surface-variant mt-2 max-w-lg">
            Advanced predictive modeling and behavioral analysis for the next quarter.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-high text-on-surface rounded-lg font-semibold hover:bg-surface-container-highest  flex  text-sm items-center gap-2 shadow-sm hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">download</span>
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-br from-primary to-primary-container text-on-primary rounded-lg font-semibold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">refresh</span>
            Re-run Models
          </button>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        <AIPredictedSales
          salesForecast={data.salesForecast}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <AIInsightsPanel
          insights={data.insights}
          proTip={data.proTip}
        />
        <RecommendationEngine recommendations={data.recommendationEngine} />
        <CustomerCohortAnalysis cohorts={data.cohorts} />
      </div>

      {/* Secondary Insights Grid */}
      <SummaryCards summaryCards={data.summaryCards} />
    </main>
  );
};

export default AIInsightsPage;