export const selectProducts       = (state) => state.products.items;
export const selectTotal          = (state) => state.products.total;
export const selectTotalPages     = (state) => state.products.totalPages;
export const selectFilters        = (state) => state.products.filters;
export const selectSelectedIds    = (state) => state.products.selectedIds;
export const selectQuickStats     = (state) => state.products.quickStats;
export const selectProductsAIInsight = (state) => state.products.aiInsight;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError  = (state) => state.products.error;
export const selectSubmitting    = (state) => state.products.loading.submitting;
export const selectSubmitSuccess = (state) => state.products.submitSuccess;
export const selectSubmitError   = (state) => state.products.error.submitting;

// Derived
export const selectIsAllSelected  = (state) => {
  const ids = state.products.items.map((p) => p.id);
  return ids.length > 0 && ids.every((id) => state.products.selectedIds.includes(id));
};

export const selectSelectedCount  = (state) => state.products.selectedIds.length;