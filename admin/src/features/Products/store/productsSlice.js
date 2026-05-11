import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsService } from "../services/productsService";

// ── Thunks ───────────────────────────────────────────────
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      return await productsService.fetchProducts(params);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchQuickStats = createAsyncThunk(
  "products/fetchQuickStats",
  async (_, { rejectWithValue }) => {
    try {
      return await productsService.fetchQuickStats();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchAIInsight = createAsyncThunk(
  "products/fetchAIInsight",
  async (_, { rejectWithValue }) => {
    try {
      return await productsService.fetchAIInsight();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      return await productsService.deleteProduct(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      return await productsService.addProduct(productData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
// ── Slice ─────────────────────────────────────────────────
const initialState = {
  items: [],
  total: 0,
  totalPages: 1,

  // Filters
  filters: {
    search: "",
    category: "All",
    status: "All",
    page: 1,
  },

  // Selection
  selectedIds: [],

  // Sidebar data
  quickStats: null,
  aiInsight: null,

  loading: {
    products: false,
    quickStats: false,
    aiInsight: false,
    deleting: false,
    submitting: null,
  },
  error: {
    products: null,
    quickStats: null,
    aiInsight: null,
    deleting: null,
    submitting: null,
  },

  submitSuccess: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.filters.search = action.payload;
      state.filters.page = 1;
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
      state.filters.page = 1;
    },
    setStatus(state, action) {
      state.filters.status = action.payload;
      state.filters.page = 1;
    },
    setPage(state, action) {
      state.filters.page = action.payload;
    },
    toggleSelectProduct(state, action) {
      const id = action.payload;
      const idx = state.selectedIds.indexOf(id);
      if (idx === -1) state.selectedIds.push(id);
      else state.selectedIds.splice(idx, 1);
    },
    toggleSelectAll(state, action) {
      // action.payload = all current page ids
      const allIds = action.payload;
      const allSelected = allIds.every((id) => state.selectedIds.includes(id));
      if (allSelected) {
        state.selectedIds = state.selectedIds.filter(
          (id) => !allIds.includes(id),
        );
      } else {
        allIds.forEach((id) => {
          if (!state.selectedIds.includes(id)) state.selectedIds.push(id);
        });
      }
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
    clearErrors(state) {
      state.error = initialState.error;
    },
    resetSubmit(state) {
  state.submitSuccess = false;
  state.error.submitting = null;
},
  },
  extraReducers: (builder) => {
    // fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading.products = true;
        state.error.products = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading.products = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading.products = false;
        state.error.products = action.payload;
      });

    // fetchQuickStats
    builder
      .addCase(fetchQuickStats.pending, (state) => {
        state.loading.quickStats = true;
      })
      .addCase(fetchQuickStats.fulfilled, (state, action) => {
        state.loading.quickStats = false;
        state.quickStats = action.payload;
      })
      .addCase(fetchQuickStats.rejected, (state, action) => {
        state.loading.quickStats = false;
        state.error.quickStats = action.payload;
      });

    // fetchAIInsight
    builder
      .addCase(fetchAIInsight.pending, (state) => {
        state.loading.aiInsight = true;
      })
      .addCase(fetchAIInsight.fulfilled, (state, action) => {
        state.loading.aiInsight = false;
        state.aiInsight = action.payload;
      })
      .addCase(fetchAIInsight.rejected, (state, action) => {
        state.loading.aiInsight = false;
        state.error.aiInsight = action.payload;
      });

    // deleteProduct — optimistic removal
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading.deleting = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading.deleting = false;
        state.items = state.items.filter((p) => p.id !== action.payload.id);
        state.selectedIds = state.selectedIds.filter(
          (id) => id !== action.payload.id,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading.deleting = false;
        state.error.deleting = action.payload;
      });

    builder
      .addCase(addProduct.pending, (state) => {
        state.loading.submitting = true;
        state.error.submitting = null;
        state.submitSuccess = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading.submitting = false;
        state.submitSuccess = true;
        // Optimistically add to list
        state.items.unshift(action.payload.product);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading.submitting = false;
        state.error.submitting = action.payload;
      });
  },
});

export const {
  setSearch,
  setCategory,
  setStatus,
  setPage,
  toggleSelectProduct,
  toggleSelectAll,
  clearSelection,
  clearErrors,
  resetSubmit
} = productsSlice.actions;

export default productsSlice.reducer;
