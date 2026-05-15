import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as productService from '../services/productService';

// ── Helper ────────────────────────────────────────────────────
const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const mapProduct = (p) => ({
  ...p,
  id: p._id,
  name: p.title,
  price: formatINR(p.basePrice),
  image: p.images?.[0]?.url || null,
  stockStatus:
    p.stock > 10 ? 'IN STOCK' : p.stock > 0 ? 'LOW STOCK' : 'OUT OF STOCK',
});

// ── Async Thunks ──────────────────────────────────────────────
export const fetchAdminProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, thunkAPI) => {
    try {
      return await productService.getAdminProducts(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Alias so existing code using fetchProducts still works
export const fetchProducts = fetchAdminProducts;

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, thunkAPI) => {
    try {
      // Step 1: Images alag karo
      const { images, ...rest } = productData;

      // Step 2: Pehle product create karo (JSON, no images)
      const result = await productService.createProduct(rest);
      const productId = result.product._id;

      // Step 3: Agar images hain toh Cloudinary pe upload karo
      if (images && images.length > 0) {
        // Files processing
        const files = images
          .map((img) => img.file)
          .filter(Boolean);

        if (files.length > 0) {
          await productService.uploadProductImages(productId, files);
        }

        // URLs processing
        const urls = images
          .filter((img) => img.isExternal && img.url)
          .map((img) => img.url);

        if (urls.length > 0) {
          await Promise.all(
            urls.map((url) => productService.uploadProductImageByUrl(productId, url))
          );
        }
      }

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, thunkAPI) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchQuickStats = createAsyncThunk(
  'products/fetchQuickStats',
  async (_, thunkAPI) => {
    try {
      return await productService.getAdminProducts({ limit: 1000 }).then((res) => {
        const products = res.products;
        return {
          totalActive: products.filter((p) => p.status === 'Active').length,
          lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
          avgRating:
            products.length > 0
              ? (products.reduce((s, p) => s + (p.ratings || 0), 0) / products.length).toFixed(1)
              : '—',
        };
      });
    } catch {
      return { totalActive: 0, lowStock: 0, avgRating: '—' };
    }
  }
);

export const fetchAIInsight = createAsyncThunk('products/fetchAIInsight', async () => {
  // Placeholder – replace with real AI endpoint when available
  return {
    title: 'Restock recommended for Accessories.',
    description:
      'Based on current sales velocity, your <strong>Bags & Watches</strong> category has seen a 35% surge this week. Consider restocking before the weekend.',
    cta: 'Apply Recommendation',
  };
});

// ── Slice ─────────────────────────────────────────────────────
const initialState = {
  items: [],
  total: 0,
  totalPages: 1,
  filters: {
    page: 1,
    search: '',
    category: 'All',
    status: 'All',
  },
  selectedIds: [],
  quickStats: null,
  aiInsight: null,
  loading: {
    products: false,
    submitting: false,
    quickStats: false,
    aiInsight: false,
  },
  error: {
    products: null,
    submitting: null,
  },
  submitSuccess: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch: (state, { payload }) => { state.filters.search = payload; state.filters.page = 1; },
    setCategory: (state, { payload }) => { state.filters.category = payload; state.filters.page = 1; },
    setStatus: (state, { payload }) => { state.filters.status = payload; state.filters.page = 1; },
    setPage: (state, { payload }) => { state.filters.page = payload; },
    toggleSelectProduct: (state, { payload: id }) => {
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((i) => i !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    toggleSelectAll: (state, { payload: ids }) => {
      state.selectedIds =
        state.selectedIds.length === ids.length ? [] : ids;
    },
    clearSelection: (state) => { state.selectedIds = []; },
    resetSubmit: (state) => {
      state.submitSuccess = false;
      state.error.submitting = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Fetch Products ────────────────────────────
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading.products = true;
        state.error.products = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, { payload }) => {
        state.loading.products = false;
        state.items = (payload.products || []).map(mapProduct);
        state.total = payload.productsCount ?? payload.count ?? 0;
        state.totalPages = Math.max(1, Math.ceil(state.total / 10));
      })
      .addCase(fetchAdminProducts.rejected, (state, { payload }) => {
        state.loading.products = false;
        state.error.products = payload;
      })

      // ── Add Product ──────────────────────────────
      .addCase(addProduct.pending, (state) => { state.loading.submitting = true; })
      .addCase(addProduct.fulfilled, (state) => { state.loading.submitting = false; state.submitSuccess = true; })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.loading.submitting = false;
        state.error.submitting = payload;
      })

      // ── Update Product ───────────────────────────
      .addCase(updateProduct.pending, (state) => { state.loading.submitting = true; })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loading.submitting = false;
        const updated = mapProduct(payload.product);
        const idx = state.items.findIndex((p) => p.id === updated.id);
        if (idx !== -1) state.items[idx] = updated;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loading.submitting = false;
        state.error.submitting = payload;
      })

      // ── Delete Product ───────────────────────────
      .addCase(deleteProduct.fulfilled, (state, { payload: id }) => {
        state.items = state.items.filter((p) => p.id !== id);
        state.total = Math.max(0, state.total - 1);
      })

      // ── Quick Stats ──────────────────────────────
      .addCase(fetchQuickStats.pending, (state) => { state.loading.quickStats = true; })
      .addCase(fetchQuickStats.fulfilled, (state, { payload }) => {
        state.loading.quickStats = false;
        state.quickStats = payload;
      })
      .addCase(fetchQuickStats.rejected, (state) => { state.loading.quickStats = false; })

      // ── AI Insight ───────────────────────────────
      .addCase(fetchAIInsight.pending, (state) => { state.loading.aiInsight = true; })
      .addCase(fetchAIInsight.fulfilled, (state, { payload }) => {
        state.loading.aiInsight = false;
        state.aiInsight = payload;
      })
      .addCase(fetchAIInsight.rejected, (state) => { state.loading.aiInsight = false; });
  },
});

export const {
  setSearch, setCategory, setStatus, setPage,
  toggleSelectProduct, toggleSelectAll, clearSelection, resetSubmit,
} = productsSlice.actions;

export default productsSlice.reducer;
