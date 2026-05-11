export const selectMetrics        = (state) => state.dashboard.metrics;
export const selectRevenueChart   = (state) => state.dashboard.revenueChart;
export const selectRecentOrders   = (state) => state.dashboard.recentOrders;
export const selectAIInsight      = (state) => state.dashboard.aiInsight;

export const selectLoading        = (state) => state.dashboard.loading;
export const selectErrors         = (state) => state.dashboard.error;

// Derived selectors
export const selectIsPageLoading  = (state) =>
  Object.values(state.dashboard.loading).some(Boolean);