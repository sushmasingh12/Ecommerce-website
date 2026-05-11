import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchProducts,
  fetchQuickStats,
  fetchAIInsight,
  deleteProduct,
  setSearch,
  setCategory,
  setStatus,
  setPage,
  toggleSelectProduct,
  toggleSelectAll,
  clearSelection, } from "../store/productsSlice";
import {  selectProducts,
  selectTotal,
  selectTotalPages,
  selectFilters,
  selectSelectedIds,
  selectQuickStats,
  selectProductsAIInsight,
  selectProductsLoading,
  selectProductsError,
  selectIsAllSelected,
  selectSelectedCount, } from "../store/productsSelectors";


export const useProducts = ()  =>{
  const dispatch = useDispatch();

  const products    = useSelector(selectProducts);
  const total       = useSelector(selectTotal);
  const totalPages  = useSelector(selectTotalPages);
  const filters     = useSelector(selectFilters);
  const selectedIds = useSelector(selectSelectedIds);
  const quickStats  = useSelector(selectQuickStats);
  const aiInsight   = useSelector(selectProductsAIInsight);
  const loading     = useSelector(selectProductsLoading);
  const errors      = useSelector(selectProductsError);
  const isAllSelected  = useSelector(selectIsAllSelected);
  const selectedCount  = useSelector(selectSelectedCount);

  // Re-fetch whenever filters change
  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  // One-time fetches
  useEffect(() => {
    dispatch(fetchQuickStats());
    dispatch(fetchAIInsight());
  }, [dispatch]);

  // Actions
  const handleSearch   = useCallback((val) => dispatch(setSearch(val)), [dispatch]);
  const handleCategory = useCallback((val) => dispatch(setCategory(val)), [dispatch]);
  const handleStatus   = useCallback((val) => dispatch(setStatus(val)), [dispatch]);
  const handlePage     = useCallback((val) => dispatch(setPage(val)), [dispatch]);
  const handleDelete   = useCallback((id) => dispatch(deleteProduct(id)), [dispatch]);
  const handleToggleSelect    = useCallback((id) => dispatch(toggleSelectProduct(id)), [dispatch]);
  const handleToggleSelectAll = useCallback(
    () => dispatch(toggleSelectAll(products.map((p) => p.id))),
    [dispatch, products]
  );
  const handleClearSelection  = useCallback(() => dispatch(clearSelection()), [dispatch]);

  return {
    products,
    total,
    totalPages,
    filters,
    selectedIds,
    quickStats,
    aiInsight,
    loading,
    errors,
    isAllSelected,
    selectedCount,
    handleSearch,
    handleCategory,
    handleStatus,
    handlePage,
    handleDelete,
    handleToggleSelect,
    handleToggleSelectAll,
    handleClearSelection,
  };
}