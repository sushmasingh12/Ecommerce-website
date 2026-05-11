import AIRecommendationCard from "../compoents/AIRecommendationCard";
import CriticalAlerts from "../compoents/CriticalAlerts";
import InventoryFilters from "../compoents/InventoryFilters";
import InventoryStatsGrid from "../compoents/InventoryStatsGrid";
import InventoryTable from "../compoents/InventoryTable";
import { useInventory } from "../hooks/useInventory";



const InventoryPage = () => {
  const {
    stats,
    isStatsLoading,
    alerts,
    isAlertsLoading,
    aiRecommendation,
    isAILoading,
    aiDismissed,
    items,
    total,
    isItemsLoading,
    filters,
    currentPage,
    pageSize,
    handleStockFilter,
    handleCategoryFilter,
    handleWarehouseFilter,
    handlePageChange,
    handleDismissAI,
    handleApproveAI,
  } = useInventory();

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-end justify-between">
        <div>
          
          <h2 className="text-2xl font-semibold tracking-tight text-on-surface">
            Inventory Command
          </h2>
          <p className="text-xs font-bold text-on-secondary-container tracking-widest uppercase mb-1">
            Global Operations
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-low px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-on-surface-variant">
              Systems Nominal
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <InventoryStatsGrid isLoading={isStatsLoading} stats={stats} />

      {/* Alerts + AI Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CriticalAlerts alerts={alerts} isLoading={isAlertsLoading} />
        <AIRecommendationCard
          aiDismissed={aiDismissed}
          aiRecommendation={aiRecommendation}
          isLoading={isAILoading}
          onApprove={handleApproveAI}
          onDismiss={handleDismissAI}
        />
      </section>

      {/* Filters */}
      <InventoryFilters
        filters={filters}
        onCategoryFilter={handleCategoryFilter}
        onStockFilter={handleStockFilter}
        onWarehouseFilter={handleWarehouseFilter}
      />

      {/* Table */}
      <InventoryTable
        currentPage={currentPage}
        isLoading={isItemsLoading}
        items={items}
        pageSize={pageSize}
        total={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default InventoryPage;