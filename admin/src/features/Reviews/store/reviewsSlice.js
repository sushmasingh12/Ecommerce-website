// src/features/Reviews/store/reviewsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchReviewsData } from "../services/reviewsService";


export const loadReviews = createAsyncThunk(
  "reviews/loadReviews",
  async () => {
    const data = await fetchReviewsData();
    return data;
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    insights: [],
    reviews: [],
    pagination: null,
    activeFilter: "All Reviews",    // All Reviews | Pending | Approved | Spam
    activeRating: null,             // null | 1–5
    currentPage: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    setActiveFilter(state, action) {
      state.activeFilter = action.payload;
      state.currentPage = 1;
    },
    setActiveRating(state, action) {
      // Toggle — click same rating again to deselect
      state.activeRating =
        state.activeRating === action.payload ? null : action.payload;
      state.currentPage = 1;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    approveReview(state, action) {
      const review = state.reviews.find((r) => r.id === action.payload);
      if (review) review.status = "approved";
    },
    rejectReview(state, action) {
      const review = state.reviews.find((r) => r.id === action.payload);
      if (review) review.status = "rejected";
    },
    flagAsSpam(state, action) {
      const review = state.reviews.find((r) => r.id === action.payload);
      if (review) review.status = "spam";
    },
    deleteReview(state, action) {
      state.reviews = state.reviews.filter((r) => r.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.insights = action.payload.insights;
        state.reviews = action.payload.reviews;
        state.pagination = action.payload.pagination;
      })
      .addCase(loadReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setActiveFilter,
  setActiveRating,
  setPage,
  approveReview,
  rejectReview,
  flagAsSpam,
  deleteReview,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;