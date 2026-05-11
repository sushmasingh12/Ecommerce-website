import { useAnalytics } from "../hooks/useAnalytics";
import OverviewCards from "../components/OverviewCards";
import RevenueBarChart from "../components/RevenueBarChart";
import TrafficSources from "../components/TrafficSources";
import TopProducts from "../components/TopProducts";
import ConversionFunnel from "../components/ConversionFunnel";
import GeographyBreakdown from "../components/GeographyBreakdown";

const RANGES = [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "1Y", value: "1y" },
];

const AnalyticsPage = () => {
  const { data, status, activeRange, handleRangeChange } = useAnalytics();

  if (status === "loading" || status === "idle") {
    return (
      <main className="p-8">
        <div className="text-on-surface-variant text-sm">Loading analytics...</div>
      </main>
    );
  }

  return (
    <main className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter text-on-surface">
            Analytics
          </h2>
          <p className="text-on-surface-variant mt-1">
            Store performance, traffic breakdown, and conversion insights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Range Selector */}
          <div className="flex bg-surface-container-high rounded-lg p-0.5 gap-0.5">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => handleRangeChange(r.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeRange === r.value
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-lg text-sm font-semibold text-on-surface hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Overview KPIs */}
      <OverviewCards overview={data?.overview} />

      {/* Revenue Chart + Traffic Sources */}
      <div className="grid grid-cols-12 gap-6">
        <RevenueBarChart data={data?.revenueBreakdown} />
        <TrafficSources sources={data?.trafficSources} />
      </div>

      {/* Top Products + Conversion Funnel */}
      <div className="grid grid-cols-12 gap-6">
        <TopProducts products={data?.topProducts} />
        <ConversionFunnel funnel={data?.conversionFunnel} />
      </div>

      {/* Geography */}
      <div className="grid grid-cols-12 gap-6">
        <GeographyBreakdown geography={data?.geography} />
      </div>
    </main>
  );
};

export default AnalyticsPage;
