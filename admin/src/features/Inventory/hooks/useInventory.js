

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchInventoryStats,
  fetchInventoryAlerts,
  fetchAIRecommendation,
  fetchInventoryItems,
  setStockFilter,
  setCategoryFilter,
  setWarehouseFilter,
  setPage,
  dismissAIRecommendation,
  approveAIRecommendation, } from "../store/inventorySlice";
import { selectStats,
  selectIsStatsLoading,
  selectAlerts,
  selectIsAlertsLoading,
  selectAIRecommendation,
  selectIsAILoading,
  selectAIDismissed,
  selectInventoryItems,
  selectInventoryTotal,
  selectIsItemsLoading,
  selectFilters,
  selectCurrentPage,
  selectPageSize,
  selectIsPageLoading, } from "../store/inventorySelectors";

export const useInventory = () => {
  const dispatch = useDispatch();

  // ─── Selectors ──────────────────────────────────────────────────────────────
  const stats = useSelector(selectStats);
  const isStatsLoading = useSelector(selectIsStatsLoading);
  const alerts = useSelector(selectAlerts);
  const isAlertsLoading = useSelector(selectIsAlertsLoading);
  const aiRecommendation = useSelector(selectAIRecommendation);
  const isAILoading = useSelector(selectIsAILoading);
  const aiDismissed = useSelector(selectAIDismissed);
  const items = useSelector(selectInventoryItems);
  const total = useSelector(selectInventoryTotal);
  const isItemsLoading = useSelector(selectIsItemsLoading);
  const filters = useSelector(selectFilters);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const isPageLoading = useSelector(selectIsPageLoading);

  // ─── Initial load ────────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchInventoryStats());
    dispatch(fetchInventoryAlerts());
    dispatch(fetchAIRecommendation());
  }, []);

  // ─── Refetch items on filter change ─────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchInventoryItems(filters));
  }, [filters.stockFilter, filters.categoryFilter, filters.warehouseFilter]);

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleStockFilter = useCallback(
    (value) => dispatch(setStockFilter(value)),
    [dispatch]
  );

  const handleCategoryFilter = useCallback(
    (value) => dispatch(setCategoryFilter(value)),
    [dispatch]
  );

  const handleWarehouseFilter = useCallback(
    (value) => dispatch(setWarehouseFilter(value)),
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page) => dispatch(setPage(page)),
    [dispatch]
  );

  const handleDismissAI = useCallback(
    () => dispatch(dismissAIRecommendation()),
    [dispatch]
  );

  const handleApproveAI = useCallback(
    () => dispatch(approveAIRecommendation()),
    [dispatch]
  );

  return {
    // Data
    stats,
    alerts,
    aiRecommendation,
    aiDismissed,
    items,
    total,
    // Loading
    isStatsLoading,
    isAlertsLoading,
    isAILoading,
    isItemsLoading,
    isPageLoading,
    // Filters
    filters,
    // Pagination
    currentPage,
    pageSize,
    // Handlers
    handleStockFilter,
    handleCategoryFilter,
    handleWarehouseFilter,
    handlePageChange,
    handleDismissAI,
    handleApproveAI,
  };
};