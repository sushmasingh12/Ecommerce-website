import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    
  ],
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.variant === newItem.variant
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },
    removeItem: (state, action) => {
      const { id, variant } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.variant === variant)
      );
    },
    updateQuantity: (state, action) => {
      const { id, variant, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.variant === variant
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  toggleDrawer, 
  setDrawerOpen, 
  clearCart 
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectIsDrawerOpen = (state) => state.cart.isDrawerOpen;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
