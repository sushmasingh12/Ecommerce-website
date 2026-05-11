
export const selectOrders = (state) => state.orders.orders;
export const selectOrdersTotal = (state) => state.orders.total;
export const selectIsListLoading = (state) => state.orders.isListLoading;
export const selectListError = (state) => state.orders.listError;

// ─── Filter Selectors ────────────────────────────────────────────────────────
export const selectSearch = (state) => state.orders.search;
export const selectPaymentStatus = (state) => state.orders.paymentStatus;
export const selectFulfillmentStatus = (state) => state.orders.fulfillmentStatus;
export const selectFilters = (state) => ({
  search: state.orders.search,
  paymentStatus: state.orders.paymentStatus,
  fulfillmentStatus: state.orders.fulfillmentStatus,
});

// ─── Selection Selectors ─────────────────────────────────────────────────────
export const selectSelectedOrderIds = (state) => state.orders.selectedOrderIds;
export const selectIsOrderSelected = (id) => (state) =>
  state.orders.selectedOrderIds.includes(id);
export const selectAllSelected = (state) =>
  state.orders.orders.length > 0 &&
  state.orders.selectedOrderIds.length === state.orders.orders.length;

// ─── Detail Selectors ────────────────────────────────────────────────────────
export const selectActiveOrderId = (state) => state.orders.activeOrderId;
export const selectOrderDetail = (state) => state.orders.orderDetail;
export const selectIsDetailLoading = (state) => state.orders.isDetailLoading;
export const selectDetailError = (state) => state.orders.detailError;

// ─── Pagination Selectors ────────────────────────────────────────────────────
export const selectCurrentPage = (state) => state.orders.currentPage;
export const selectPageSize = (state) => state.orders.pageSize;

// ─── Derived / Loading ───────────────────────────────────────────────────────
export const selectIsPageLoading = (state) =>
  state.orders.isListLoading || state.orders.isDetailLoading;