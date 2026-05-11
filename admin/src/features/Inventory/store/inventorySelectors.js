// src/features/Inventory/store/inventorySelectors.js

// ─── Stats ────────────────────────────────────────────────────────────────────
export const selectStats = (state) => state.inventory.stats;
export const selectIsStatsLoading = (state) => state.inventory.isStatsLoading;

// ─── Alerts ───────────────────────────────────────────────────────────────────
export const selectAlerts = (state) => state.inventory.alerts;
export const selectIsAlertsLoading = (state) => state.inventory.isAlertsLoading;

// ─── AI Recommendation ────────────────────────────────────────────────────────
export const selectAIRecommendation = (state) => state.inventory.aiRecommendation;
export const selectIsAILoading = (state) => state.inventory.isAILoading;
export const selectAIDismissed = (state) => state.inventory.aiDismissed;

// ─── Items ────────────────────────────────────────────────────────────────────
export const selectInventoryItems = (state) => state.inventory.items;
export const selectInventoryTotal = (state) => state.inventory.total;
export const selectIsItemsLoading = (state) => state.inventory.isItemsLoading;
export const selectItemsError = (state) => state.inventory.itemsError;

// ─── Filters ──────────────────────────────────────────────────────────────────
export const selectStockFilter = (state) => state.inventory.stockFilter;
export const selectCategoryFilter = (state) => state.inventory.categoryFilter;
export const selectWarehouseFilter = (state) => state.inventory.warehouseFilter;
export const selectFilters = (state) => ({
  stockFilter: state.inventory.stockFilter,
  categoryFilter: state.inventory.categoryFilter,
  warehouseFilter: state.inventory.warehouseFilter,
});

// ─── Pagination ───────────────────────────────────────────────────────────────
export const selectCurrentPage = (state) => state.inventory.currentPage;
export const selectPageSize = (state) => state.inventory.pageSize;

// ─── Derived ──────────────────────────────────────────────────────────────────
export const selectIsPageLoading = (state) =>
  state.inventory.isStatsLoading ||
  state.inventory.isItemsLoading ||
  state.inventory.isAILoading;