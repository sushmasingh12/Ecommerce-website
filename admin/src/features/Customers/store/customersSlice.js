// src/features/Customers/store/customersSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCustomersAPI,
  fetchCustomerDetailAPI,
  addCustomerAPI, } from "../services/customersService";


// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (filters, { rejectWithValue }) => {
    try {
      return await fetchCustomersAPI(filters);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCustomerDetail = createAsyncThunk(
  "customers/fetchCustomerDetail",
  async (customerId, { rejectWithValue }) => {
    try {
      return await fetchCustomerDetailAPI(customerId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customers/addCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      return await addCustomerAPI(customerData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  // List
  customers: [],
  total: 0,
  matches: 0,
  isListLoading: false,
  listError: null,

  // Filters
  search: "",
  activityFilter: "All Time",
  spentFilter: ">$500.00",
  ordersFilter: ">5",

  // Selection
  selectedCustomerIds: [],

  // Detail panel
  activeCustomerId: "cust-001",
  customerDetail: null,
  isDetailLoading: false,
  detailError: null,

  // Modal states
  isAddModalOpen: false,

  // Pagination
  currentPage: 1,
  pageSize: 24,
  totalPages: 52,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setActivityFilter(state, action) {
      state.activityFilter = action.payload;
      state.currentPage = 1;
    },
    setSpentFilter(state, action) {
      state.spentFilter = action.payload;
      state.currentPage = 1;
    },
    setOrdersFilter(state, action) {
      state.ordersFilter = action.payload;
      state.currentPage = 1;
    },
    setActiveCustomer(state, action) {
      state.activeCustomerId = action.payload;
      state.customerDetail = null;
    },
    toggleCustomerSelection(state, action) {
      const id = action.payload;
      const idx = state.selectedCustomerIds.indexOf(id);
      if (idx === -1) {
        state.selectedCustomerIds.push(id);
      } else {
        state.selectedCustomerIds.splice(idx, 1);
      }
    },
    toggleSelectAll(state, action) {
      const allIds = action.payload;
      if (state.selectedCustomerIds.length === allIds.length) {
        state.selectedCustomerIds = [];
      } else {
        state.selectedCustomerIds = allIds;
      }
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    clearFilters(state) {
      state.search = "";
      state.activityFilter = "All Time";
      state.spentFilter = null;
      state.ordersFilter = null;
      state.currentPage = 1;
    },
    setIsAddModalOpen(state, action) {
      state.isAddModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.isListLoading = true;
        state.listError = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.customers = action.payload.customers;
        state.total = action.payload.total;
        state.matches = action.payload.matches;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isListLoading = false;
        state.listError = action.payload;
      });

    builder
      .addCase(fetchCustomerDetail.pending, (state) => {
        state.isDetailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchCustomerDetail.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.customerDetail = action.payload;
      })
      .addCase(fetchCustomerDetail.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.detailError = action.payload;
      });
    builder
      .addCase(addCustomer.pending, (state) => {
        state.isListLoading = true;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.customers.unshift(action.payload);
        state.total += 1;
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.isListLoading = false;
        state.listError = action.payload;
      });
  },
});

export const {
  setSearch,
  setActivityFilter,
  setSpentFilter,
  setOrdersFilter,
  setActiveCustomer,
  toggleCustomerSelection,
  toggleSelectAll,
  setPage,
  clearFilters,
  setIsAddModalOpen,
} = customersSlice.actions;

export default customersSlice.reducer;