// src/features/Inventory/store/inventorySlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchInventoryStatsAPI,
  fetchInventoryAlertsAPI,
  fetchAIRecommendationAPI,
  fetchInventoryItemsAPI, } from "../services/inventoryService";


// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchInventoryStats = createAsyncThunk(
  "inventory/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchInventoryStatsAPI();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchInventoryAlerts = createAsyncThunk(
  "inventory/fetchAlerts",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchInventoryAlertsAPI();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAIRecommendation = createAsyncThunk(
  "inventory/fetchAIRecommendation",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAIRecommendationAPI();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchInventoryItems = createAsyncThunk(
  "inventory/fetchItems",
  async (filters, { rejectWithValue }) => {
    try {
      return await fetchInventoryItemsAPI(filters);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  // Stats
  stats: null,
  isStatsLoading: false,

  // Alerts
  alerts: [],
  isAlertsLoading: false,

  // AI Recommendation
  aiRecommendation: null,
  isAILoading: false,
  aiDismissed: false,

  // Inventory Items
  items: [],
  total: 0,
  isItemsLoading: false,
  itemsError: null,

  // Filters
  stockFilter: "Stock Level: All",
  categoryFilter: "Category: All",
  warehouseFilter: "Warehouse: All",

  // Pagination
  currentPage: 1,
  pageSize: 4,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setStockFilter(state, action) {
      state.stockFilter = action.payload;
      state.currentPage = 1;
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
      state.currentPage = 1;
    },
    setWarehouseFilter(state, action) {
      state.warehouseFilter = action.payload;
      state.currentPage = 1;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    dismissAIRecommendation(state) {
      state.aiDismissed = true;
    },
    approveAIRecommendation(state) {
      state.aiDismissed = true;
    },
  },
  extraReducers: (builder) => {
    // Stats
    builder
      .addCase(fetchInventoryStats.pending, (state) => {
        state.isStatsLoading = true;
      })
      .addCase(fetchInventoryStats.fulfilled, (state, action) => {
        state.isStatsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchInventoryStats.rejected, (state) => {
        state.isStatsLoading = false;
      });

    // Alerts
    builder
      .addCase(fetchInventoryAlerts.pending, (state) => {
        state.isAlertsLoading = true;
      })
      .addCase(fetchInventoryAlerts.fulfilled, (state, action) => {
        state.isAlertsLoading = false;
        state.alerts = action.payload;
      })
      .addCase(fetchInventoryAlerts.rejected, (state) => {
        state.isAlertsLoading = false;
      });

    // AI Recommendation
    builder
      .addCase(fetchAIRecommendation.pending, (state) => {
        state.isAILoading = true;
      })
      .addCase(fetchAIRecommendation.fulfilled, (state, action) => {
        state.isAILoading = false;
        state.aiRecommendation = action.payload;
      })
      .addCase(fetchAIRecommendation.rejected, (state) => {
        state.isAILoading = false;
      });

    // Items
    builder
      .addCase(fetchInventoryItems.pending, (state) => {
        state.isItemsLoading = true;
        state.itemsError = null;
      })
      .addCase(fetchInventoryItems.fulfilled, (state, action) => {
        state.isItemsLoading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchInventoryItems.rejected, (state, action) => {
        state.isItemsLoading = false;
        state.itemsError = action.payload;
      });
  },
});

export const {
  setStockFilter,
  setCategoryFilter,
  setWarehouseFilter,
  setPage,
  dismissAIRecommendation,
  approveAIRecommendation,
} = inventorySlice.actions;

export default inventorySlice.reducer;