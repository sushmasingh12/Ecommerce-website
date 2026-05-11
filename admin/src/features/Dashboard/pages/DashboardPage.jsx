import AIInsightCard from "../components/AIInsightCard";
import MetricCard from "../components/MetricCard";
import QuickActions from "../components/QuickActions";
import RecentOrdersTable from "../components/RecentOrdersTable";
import RevenueChart from "../components/RevenueChart";
import { useDashboard } from "../hooks/useDashboard";

const METRIC_CONFIGS = [
  {
    key: "totalSales",
    icon: "payments",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    label: "Total Sales",
    valueKey: "totalSales",
    badgeKey: "totalSalesChange",
    badgeType: "success",
  },
  {
    key: "conversionRate",
    icon: "ads_click",
    iconBg: "bg-secondary-container/50",
    iconColor: "text-secondary",
    label: "Conversion Rate",
    valueKey: "conversionRate",
    badgeKey: "conversionChange",
    badgeType: "success",
  },
  {
    key: "customerSentiment",
    icon: "mood",
    iconBg: "bg-tertiary-fixed/30",
    iconColor: "text-tertiary",
    label: "Customer Sentiment",
    valueKey: "customerSentiment",
    badgeType: "ai",
  },
  {
    key: "urgentStockAlerts",
    icon: "warning",
    iconBg: "bg-error-container/50",
    iconColor: "text-error",
    label: "Stock Alerts",
    valueKey: "urgentStockAlerts",
    badge: "Critical",
    badgeType: "error",
  },
];
const DashboardPage = () => {
    
  const { metrics, revenueChart, recentOrders, aiInsight, loading } = useDashboard();

  return (
    <main className="p-12 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <header className="mb-10">
        
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter text-on-surface">
              Precision Dashboard
            </h2>
            <p className="text-on-surface-variant mt-1">
              Real-time performance metrics and AI-curated commerce insights.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2 bg-surface-container-highest rounded-xl text-xs font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              Last 30 Days
              <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
            </div>
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {METRIC_CONFIGS.map((config) => (
          <MetricCard
            key={config.key}
            icon={config.icon}
            iconBg={config.iconBg}
            iconColor={config.iconColor}
            label={config.label}
            value={
              metrics
                ? config.valueKey === "urgentStockAlerts"
                  ? `${metrics[config.valueKey]} SKU`
                  : metrics[config.valueKey]
                : "—"
            }
            badge={
              config.badgeKey
                ? metrics?.[config.badgeKey]
                : config.badge
            }
            badgeType={config.badgeType}
            loading={loading.metrics}
          />
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Revenue Chart */}
        <RevenueChart data={revenueChart} loading={loading.revenueChart} />

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <QuickActions />
          <AIInsightCard insight={aiInsight} loading={loading.aiInsight} />
        </div>

        {/* Orders Table */}
        <RecentOrdersTable orders={recentOrders} loading={loading.recentOrders} />
      </div>
    </main>
  );
}

export default DashboardPage
