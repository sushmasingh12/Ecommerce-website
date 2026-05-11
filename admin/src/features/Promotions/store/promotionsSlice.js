// src/features/Promotions/store/promotionsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPromotionsData } from "../services/promotionsService";

export const loadPromotions = createAsyncThunk(
  "promotions/loadPromotions",
  async () => {
    const data = await fetchPromotionsData();
    return data;
  }
);

const promotionsSlice = createSlice({
  name: "promotions",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    cartRecoveryEnabled: false,
  },
  reducers: {
    enableCartRecovery(state) {
      state.cartRecoveryEnabled = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPromotions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadPromotions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(loadPromotions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { enableCartRecovery } = promotionsSlice.actions;
export default promotionsSlice.reducer;