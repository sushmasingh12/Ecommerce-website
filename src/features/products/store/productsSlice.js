import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCollection: {
    category: '',
    products: [],
    description: '',
  },
  selectedProduct: null,
  isLoading: false,
  error: null,
  filters: {
    sizes: [],
    materials: [],
    colors: [],
    occasions: [],
    ratings: [],
    priceRange: [0, 500000], // Default range in INR
    availability: 'all', // 'all', 'inStock'
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCollection: (state, action) => {
      state.currentCollection = action.payload;
      state.isLoading = false;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    toggleFilter: (state, action) => {
      const { type, value } = action.payload;
      const index = state.filters[type].indexOf(value);
      if (index === -1) {
        state.filters[type].push(value);
      } else {
        state.filters[type].splice(index, 1);
      }
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setAvailability: (state, action) => {
      state.filters.availability = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setLoading,
  setCollection,
  setSelectedProduct,
  setError,
  toggleFilter,
  setPriceRange,
  setAvailability,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
