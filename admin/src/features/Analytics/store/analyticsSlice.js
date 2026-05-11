import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyticsService } from "../services/analyticsService";

export const fetchAnalyticsData = createAsyncThunk(
  "analytics/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const [overview, revenueBreakdown, topProducts, trafficSources, conversionFunnel, geography] =
        await Promise.all([
          analyticsService.fetchOverview(),
          analyticsService.fetchRevenueBreakdown(),
          analyticsService.fetchTopProducts(),
          analyticsService.fetchTrafficSources(),
          analyticsService.fetchConversionFunnel(),
          analyticsService.fetchGeography(),
        ]);
      return { overview, revenueBreakdown, topProducts, trafficSources, conversionFunnel, geography };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    activeRange: "7d",
  },
  reducers: {
    setActiveRange(state, action) {
      state.activeRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveRange } = analyticsSlice.actions;
export default analyticsSlice.reducer;
