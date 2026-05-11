import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardService } from "../services/dashboardService";

// ── Thunks ──────────────────────────────────────────────
export const fetchDashboardMetrics = createAsyncThunk(
  "dashboard/fetchMetrics",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchMetrics();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchRevenueChart = createAsyncThunk(
  "dashboard/fetchRevenueChart",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchRevenueChart();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchRecentOrders = createAsyncThunk(
  "dashboard/fetchRecentOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchRecentOrders();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAIInsight = createAsyncThunk(
  "dashboard/fetchAIInsight",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchAIInsight();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ── Slice ────────────────────────────────────────────────
const initialState = {
  metrics: null,
  revenueChart: [],
  recentOrders: [],
  aiInsight: null,
  loading: {
    metrics: false,
    revenueChart: false,
    recentOrders: false,
    aiInsight: false,
  },
  error: {
    metrics: null,
    revenueChart: null,
    recentOrders: null,
    aiInsight: null,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    // Metrics
    builder
      .addCase(fetchDashboardMetrics.pending, (state) => {
        state.loading.metrics = true;
        state.error.metrics = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        state.loading.metrics = false;
        state.metrics = action.payload;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading.metrics = false;
        state.error.metrics = action.payload;
      });

    // Revenue Chart
    builder
      .addCase(fetchRevenueChart.pending, (state) => {
        state.loading.revenueChart = true;
        state.error.revenueChart = null;
      })
      .addCase(fetchRevenueChart.fulfilled, (state, action) => {
        state.loading.revenueChart = false;
        state.revenueChart = action.payload;
      })
      .addCase(fetchRevenueChart.rejected, (state, action) => {
        state.loading.revenueChart = false;
        state.error.revenueChart = action.payload;
      });

    // Recent Orders
    builder
      .addCase(fetchRecentOrders.pending, (state) => {
        state.loading.recentOrders = true;
        state.error.recentOrders = null;
      })
      .addCase(fetchRecentOrders.fulfilled, (state, action) => {
        state.loading.recentOrders = false;
        state.recentOrders = action.payload;
      })
      .addCase(fetchRecentOrders.rejected, (state, action) => {
        state.loading.recentOrders = false;
        state.error.recentOrders = action.payload;
      });

    // AI Insight
    builder
      .addCase(fetchAIInsight.pending, (state) => {
        state.loading.aiInsight = true;
        state.error.aiInsight = null;
      })
      .addCase(fetchAIInsight.fulfilled, (state, action) => {
        state.loading.aiInsight = false;
        state.aiInsight = action.payload;
      })
      .addCase(fetchAIInsight.rejected, (state, action) => {
        state.loading.aiInsight = false;
        state.error.aiInsight = action.payload;
      });
  },
});

export const { clearErrors } = dashboardSlice.actions;
export default dashboardSlice.reducer;