// src/features/Customers/store/customersSelectors.js

// ─── List ─────────────────────────────────────────────────────────────────────
export const selectCustomers = (state) => state.customers.customers;
export const selectCustomersTotal = (state) => state.customers.total;
export const selectCustomersMatches = (state) => state.customers.matches;
export const selectIsListLoading = (state) => state.customers.isListLoading;
export const selectListError = (state) => state.customers.listError;

// ─── Filters ──────────────────────────────────────────────────────────────────
export const selectSearch = (state) => state.customers.search;
export const selectActivityFilter = (state) => state.customers.activityFilter;
export const selectSpentFilter = (state) => state.customers.spentFilter;
export const selectOrdersFilter = (state) => state.customers.ordersFilter;
export const selectFilters = (state) => ({
  search: state.customers.search,
  activityFilter: state.customers.activityFilter,
  spentFilter: state.customers.spentFilter,
  ordersFilter: state.customers.ordersFilter,
});

// ─── Selection ────────────────────────────────────────────────────────────────
export const selectSelectedCustomerIds = (state) =>
  state.customers.selectedCustomerIds;
export const selectAllSelected = (state) =>
  state.customers.customers.length > 0 &&
  state.customers.selectedCustomerIds.length ===
    state.customers.customers.length;

// ─── Detail ───────────────────────────────────────────────────────────────────
export const selectActiveCustomerId = (state) =>
  state.customers.activeCustomerId;
export const selectCustomerDetail = (state) => state.customers.customerDetail;
export const selectIsDetailLoading = (state) =>
  state.customers.isDetailLoading;
export const selectDetailError = (state) => state.customers.detailError;
export const selectIsAddModalOpen = (state) => state.customers.isAddModalOpen;

// ─── Pagination ───────────────────────────────────────────────────────────────
export const selectCurrentPage = (state) => state.customers.currentPage;
export const selectPageSize = (state) => state.customers.pageSize;
export const selectTotalPages = (state) => state.customers.totalPages;

// ─── Derived ──────────────────────────────────────────────────────────────────
export const selectIsPageLoading = (state) =>
  state.customers.isListLoading || state.customers.isDetailLoading;