import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signinUser, signoutUser, fetchMe } from '../services/authService';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const signinThunk = createAsyncThunk('auth/signin', async (payload, thunkAPI) => {
  try {
    return await signinUser(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.message || 'Signin failed. Please try again.');
  }
});

export const fetchMeThunk = createAsyncThunk('auth/fetchMe', async (_, thunkAPI) => {
  try {
    return await fetchMe();
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.message || 'Session expired.');
  }
});

export const signoutThunk = createAsyncThunk('auth/signout', async (_, thunkAPI) => {
  try {
    return await signoutUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.message || 'Signout failed.');
  }
});

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState = {
  user: null,
  isInitialized: false,

  signin: {
    isLoading: false,
    isSuccess: false,
    error: null,
  },
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetSigninState: (state) => {
      state.signin = { isLoading: false, isSuccess: false, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Signin ───────────────────────────────────────────────────────────────
      .addCase(signinThunk.pending, (state) => {
        state.signin = { isLoading: true, isSuccess: false, error: null };
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.signin = { isLoading: false, isSuccess: true, error: null };
        state.user = action.payload?.user || null;
      })
      .addCase(signinThunk.rejected, (state, action) => {
        state.signin = { isLoading: false, isSuccess: false, error: action.payload || 'Signin failed.' };
      })

      // ── Fetch Me ─────────────────────────────────────────────────────────────
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.user = action.payload?.admin || null;
        state.isInitialized = true;
      })
      .addCase(fetchMeThunk.rejected, (state) => {
        state.user = null;
        state.isInitialized = true;
      })

      // ── Signout ──────────────────────────────────────────────────────────────
      .addCase(signoutThunk.fulfilled, (state) => {
        state.user = null;
        state.signin = { isLoading: false, isSuccess: false, error: null };
      });
  },
});

// ─── Actions ──────────────────────────────────────────────────────────────────

export const {
  resetSigninState,
} = authSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectUser = (state) => state.auth.user;
export const selectIsInitialized = (state) => state.auth.isInitialized;
export const selectSigninLoading = (state) => state.auth.signin.isLoading;
export const selectSigninSuccess = (state) => state.auth.signin.isSuccess;
export const selectSigninError = (state) => state.auth.signin.error;

export default authSlice.reducer;
