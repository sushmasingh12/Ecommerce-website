// src/features/Reviews/hooks/useReviews.js

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReviews,
  setActiveFilter,
  setActiveRating,
  setPage,
  approveReview,
  rejectReview,
  flagAsSpam,
  deleteReview, } from "../store/reviewsSlice";


export const useReviews = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.reviews);

  useEffect(() => {
    if (state.status === "idle") dispatch(loadReviews());
  }, [dispatch, state.status]);

  // Client-side filter
  const filteredReviews = state.reviews.filter((r) => {
    const filterMatch =
      state.activeFilter === "All Reviews" ||
      (state.activeFilter === "Pending" && r.status === "pending") ||
      (state.activeFilter === "Approved" && r.status === "approved") ||
      (state.activeFilter === "Spam" && r.status === "spam");

    const ratingMatch =
      state.activeRating === null || r.rating === state.activeRating;

    return filterMatch && ratingMatch;
  });

  return {
    ...state,
    filteredReviews,
    handleFilterChange: (f) => dispatch(setActiveFilter(f)),
    handleRatingChange: (r) => dispatch(setActiveRating(r)),
    handlePageChange: (p) => dispatch(setPage(p)),
    handleApprove: (id) => dispatch(approveReview(id)),
    handleReject: (id) => dispatch(rejectReview(id)),
    handleFlagSpam: (id) => dispatch(flagAsSpam(id)),
    handleDelete: (id) => dispatch(deleteReview(id)),
  };
};