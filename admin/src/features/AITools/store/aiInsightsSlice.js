import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAIInsightsData } from "../services/aiInsightsService";

export const loadAIInsights = createAsyncThunk(
  "aiInsights/loadAIInsights",
  async () => {
    const data = await fetchAIInsightsData();
    return data;
  }
);

const aiInsightsSlice = createSlice({
  name: "aiInsights",
  initialState: {
    data: null,
    activeTab: "Weekly",
    status: "idle",
    error: null,
  },
  reducers: {
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAIInsights.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAIInsights.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(loadAIInsights.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setActiveTab } = aiInsightsSlice.actions;
export default aiInsightsSlice.reducer;