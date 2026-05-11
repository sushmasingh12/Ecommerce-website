import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrdersAPI, fetchOrderDetailAPI } from "../services/ordersService";


// ─── Async Thunks ────────────────────────────────────────────────────────────

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (filters, { rejectWithValue }) => {
    try {
      return await fetchOrdersAPI(filters);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchOrderDetail = createAsyncThunk(
  "orders/fetchOrderDetail",
  async (orderId, { rejectWithValue }) => {
    try {
      return await fetchOrderDetailAPI(orderId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const initialState = {
  // List
  orders: [],
  total: 0,
  isListLoading: false,
  listError: null,

  // Filters
  search: "",
  paymentStatus: "Payment Status",
  fulfillmentStatus: "Fulfillment Status",

  // Selection
  selectedOrderIds: [],

  // Detail panel
  activeOrderId: "ORD-94210",
  orderDetail: null,
  isDetailLoading: false,
  detailError: null,

  // Pagination
  currentPage: 1,
  pageSize: 10,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setPaymentStatus(state, action) {
      state.paymentStatus = action.payload;
    },
    setFulfillmentStatus(state, action) {
      state.fulfillmentStatus = action.payload;
    },
    setActiveOrder(state, action) {
      state.activeOrderId = action.payload;
      state.orderDetail = null;
    },
    toggleOrderSelection(state, action) {
      const id = action.payload;
      const idx = state.selectedOrderIds.indexOf(id);
      if (idx === -1) {
        state.selectedOrderIds.push(id);
      } else {
        state.selectedOrderIds.splice(idx, 1);
      }
    },
    toggleSelectAll(state, action) {
      const allIds = action.payload;
      if (state.selectedOrderIds.length === allIds.length) {
        state.selectedOrderIds = [];
      } else {
        state.selectedOrderIds = allIds;
      }
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    clearFilters(state) {
      state.search = "";
      state.paymentStatus = "Payment Status";
      state.fulfillmentStatus = "Fulfillment Status";
    },
  },
  extraReducers: (builder) => {
    // fetchOrders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isListLoading = true;
        state.listError = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isListLoading = false;
        state.listError = action.payload;
      });

    // fetchOrderDetail
    builder
      .addCase(fetchOrderDetail.pending, (state) => {
        state.isDetailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.orderDetail = action.payload;
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError = action.payload;
      });
  },
});

export const {
  setSearch,
  setPaymentStatus,
  setFulfillmentStatus,
  setActiveOrder,
  toggleOrderSelection,
  toggleSelectAll,
  setPage,
  clearFilters,
} = ordersSlice.actions;

export default ordersSlice.reducer;