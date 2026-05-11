import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders,
  fetchOrderDetail,
  setSearch,
  setPaymentStatus,
  setFulfillmentStatus,
  setActiveOrder,
  toggleOrderSelection,
  toggleSelectAll,
  setPage,
  clearFilters, } from "../store/ordersSlice";
import { selectOrders,
  selectOrdersTotal,
  selectIsListLoading,
  selectOrderDetail,
  selectIsDetailLoading,
  selectFilters,
  selectSelectedOrderIds,
  selectAllSelected,
  selectActiveOrderId,
  selectCurrentPage,
  selectPageSize,
  selectIsPageLoading, } from "../store/ordersSelectors";


export const useOrders = () => {
  const dispatch = useDispatch();

  // ─── Selectors ─────────────────────────────────────────────────────────────
  const orders = useSelector(selectOrders);
  const total = useSelector(selectOrdersTotal);
  const isListLoading = useSelector(selectIsListLoading);
  const filters = useSelector(selectFilters);
  const selectedOrderIds = useSelector(selectSelectedOrderIds);
  const allSelected = useSelector(selectAllSelected);
  const activeOrderId = useSelector(selectActiveOrderId);
  const orderDetail = useSelector(selectOrderDetail);
  const isDetailLoading = useSelector(selectIsDetailLoading);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const isPageLoading = useSelector(selectIsPageLoading);

  // ─── Initial Load ───────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchOrders(filters));
  }, [filters.search, filters.paymentStatus, filters.fulfillmentStatus]);

  // ─── Load Detail on Active Order Change ────────────────────────────────────
  useEffect(() => {
    if (activeOrderId) {
      dispatch(fetchOrderDetail(activeOrderId));
    }
  }, [activeOrderId]);

  // ─── Action Handlers ────────────────────────────────────────────────────────
  const handleSearch = useCallback(
    (value) => dispatch(setSearch(value)),
    [dispatch]
  );

  const handlePaymentFilter = useCallback(
    (value) => dispatch(setPaymentStatus(value)),
    [dispatch]
  );

  const handleFulfillmentFilter = useCallback(
    (value) => dispatch(setFulfillmentStatus(value)),
    [dispatch]
  );

  const handleSelectOrder = useCallback(
    (orderId) => {
      dispatch(setActiveOrder(orderId));
    },
    [dispatch]
  );

  const handleToggleCheck = useCallback(
    (orderId) => dispatch(toggleOrderSelection(orderId)),
    [dispatch]
  );

  const handleToggleSelectAll = useCallback(() => {
    dispatch(toggleSelectAll(orders.map((o) => o.id)));
  }, [dispatch, orders]);

  const handlePageChange = useCallback(
    (page) => dispatch(setPage(page)),
    [dispatch]
  );

  const handleClearFilters = useCallback(
    () => dispatch(clearFilters()),
    [dispatch]
  );

  return {
    // Data
    orders,
    total,
    orderDetail,
    activeOrderId,
    // Loading states
    isListLoading,
    isDetailLoading,
    isPageLoading,
    // Filters
    filters,
    // Selection
    selectedOrderIds,
    allSelected,
    // Pagination
    currentPage,
    pageSize,
    // Handlers
    handleSearch,
    handlePaymentFilter,
    handleFulfillmentFilter,
    handleSelectOrder,
    handleToggleCheck,
    handleToggleSelectAll,
    handlePageChange,
    handleClearFilters,
  };
};