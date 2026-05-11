// src/features/Customers/hooks/useCustomers.js

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCustomers,
  selectCustomersTotal,
  selectCustomersMatches,
  selectIsListLoading,
  selectCustomerDetail,
  selectIsDetailLoading,
  selectFilters,
  selectSelectedCustomerIds,
  selectAllSelected,
  selectActiveCustomerId,
  selectCurrentPage,
  selectTotalPages,
  selectIsPageLoading,
  selectIsAddModalOpen, } from "../store/customersSelectors";
import { fetchCustomers,
  fetchCustomerDetail,
  setSearch,
  setActivityFilter,
  setSpentFilter,
  setOrdersFilter,
  setActiveCustomer,
  toggleCustomerSelection,
  toggleSelectAll,
  setPage,
  clearFilters,
  setIsAddModalOpen,
  addCustomer, } from "../store/customersSlice";



export const useCustomers = () => {
  const dispatch = useDispatch();

  // ─── Selectors ──────────────────────────────────────────────────────────────
  const customers = useSelector(selectCustomers);
  const total = useSelector(selectCustomersTotal);
  const matches = useSelector(selectCustomersMatches);
  const isListLoading = useSelector(selectIsListLoading);
  const filters = useSelector(selectFilters);
  const selectedCustomerIds = useSelector(selectSelectedCustomerIds);
  const allSelected = useSelector(selectAllSelected);
  const activeCustomerId = useSelector(selectActiveCustomerId);
  const customerDetail = useSelector(selectCustomerDetail);
  const isDetailLoading = useSelector(selectIsDetailLoading);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isPageLoading = useSelector(selectIsPageLoading);
  const isAddModalOpen = useSelector(selectIsAddModalOpen);

  // ─── Fetch on filter change ──────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchCustomers(filters));
  }, [filters.search, filters.activityFilter, filters.spentFilter, filters.ordersFilter]);

  // ─── Fetch detail on active customer change ──────────────────────────────────
  useEffect(() => {
    if (activeCustomerId) {
      dispatch(fetchCustomerDetail(activeCustomerId));
    }
  }, [activeCustomerId]);

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleSearch = useCallback(
    (value) => dispatch(setSearch(value)),
    [dispatch]
  );

  const handleActivityFilter = useCallback(
    (value) => dispatch(setActivityFilter(value)),
    [dispatch]
  );
  
  const handleSpentFilter = useCallback(
    (value) => dispatch(setSpentFilter(value)),
    [dispatch]
  );
  
  const handleOrdersFilter = useCallback(
    (value) => dispatch(setOrdersFilter(value)),
    [dispatch]
  );

  const handleSelectCustomer = useCallback(
    (customerId) => dispatch(setActiveCustomer(customerId)),
    [dispatch]
  );

  const handleToggleCheck = useCallback(
    (customerId) => dispatch(toggleCustomerSelection(customerId)),
    [dispatch]
  );

  const handleToggleSelectAll = useCallback(() => {
    dispatch(toggleSelectAll(customers.map((c) => c.id)));
  }, [dispatch, customers]);

  const handlePageChange = useCallback(
    (page) => dispatch(setPage(page)),
    [dispatch]
  );

  const handleClearFilters = useCallback(
    () => dispatch(clearFilters()),
    [dispatch]
  );

  const handleSetIsAddModalOpen = useCallback(
    (isOpen) => dispatch(setIsAddModalOpen(isOpen)),
    [dispatch]
  );

  const handleAddCustomer = useCallback(
    (customerData) => dispatch(addCustomer(customerData)),
    [dispatch]
  );

  return {
    // Data
    customers,
    total,
    matches,
    customerDetail,
    activeCustomerId,
    // Loading
    isListLoading,
    isDetailLoading,
    isPageLoading,
    // Filters
    filters,
    // Selection
    selectedCustomerIds,
    allSelected,
    // Pagination
    currentPage,
    totalPages,
    // Modal
    isAddModalOpen,
    // Handlers
    handleSearch,
    handleActivityFilter,
    handleSpentFilter,
    handleOrdersFilter,
    handleSelectCustomer,
    handleToggleCheck,
    handleToggleSelectAll,
    handlePageChange,
    handleClearFilters,
    handleSetIsAddModalOpen,
    handleAddCustomer,
  };
};