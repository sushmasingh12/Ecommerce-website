import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as adminService from '../services/adminManagementService';

export const fetchAdminsThunk = createAsyncThunk(
  'adminManagement/fetchAdmins',
  async (filters, thunkAPI) => {
    try {
      return await adminService.getAdmins(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createAdminThunk = createAsyncThunk(
  'adminManagement/createAdmin',
  async (adminData, thunkAPI) => {
    try {
      return await adminService.createAdmin(adminData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAdminThunk = createAsyncThunk(
  'adminManagement/updateAdmin',
  async ({ id, data }, thunkAPI) => {
    try {
      return await adminService.updateAdmin(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAdminThunk = createAsyncThunk(
  'adminManagement/deleteAdmin',
  async (id, thunkAPI) => {
    try {
      await adminService.deleteAdmin(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleAdminStatusThunk = createAsyncThunk(
  'adminManagement/toggleStatus',
  async (id, thunkAPI) => {
    try {
      return await adminService.toggleAdminStatus(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const adminManagementSlice = createSlice({
  name: 'adminManagement',
  initialState: {
    admins: [],
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admins = action.payload.admins;
      })
      .addCase(fetchAdminsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createAdminThunk.fulfilled, (state, action) => {
        state.admins.unshift(action.payload.admin);
        state.successMessage = 'Admin created successfully';
      })
      // Update
      .addCase(updateAdminThunk.fulfilled, (state, action) => {
        const index = state.admins.findIndex(a => a._id === action.payload.admin._id);
        if (index !== -1) state.admins[index] = action.payload.admin;
        state.successMessage = 'Admin updated successfully';
      })
      // Delete
      .addCase(deleteAdminThunk.fulfilled, (state, action) => {
        state.admins = state.admins.filter(a => a._id !== action.payload);
        state.successMessage = 'Admin deleted successfully';
      })
      // Toggle Status
      .addCase(toggleAdminStatusThunk.fulfilled, (state, action) => {
        const index = state.admins.findIndex(a => a._id === action.payload.admin._id);
        if (index !== -1) state.admins[index] = action.payload.admin;
      });
  },
});

export const { clearMessages } = adminManagementSlice.actions;
export default adminManagementSlice.reducer;
