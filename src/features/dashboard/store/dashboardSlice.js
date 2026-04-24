import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setProducts, setCategories, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
