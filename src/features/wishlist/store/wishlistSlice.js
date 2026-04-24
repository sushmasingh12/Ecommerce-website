import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../../products/data/products';

// Pick 4 random in-stock products as initial wishlist items
const getInitialWishlistItems = () => {
  const all = getAllProducts().filter((p) => p.inStock);
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4).map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.material || 'The Curator',
    price: `₹${new Intl.NumberFormat('en-IN').format(p.price)}`,
    image: p.image,
    alt: p.alt || p.name,
  }));
};

// Pick 6 random products for "Curated for You" section
const getInitialCurated = () => {
  const all = getAllProducts().filter((p) => p.inStock);
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 6).map((p) => ({
    id: p.id,
    name: p.name,
    edit: p.subCategory || p.category,
    image: p.image,
    alt: p.alt || p.name,
    productId: p.id,
  }));
};

const initialState = {
  items: getInitialWishlistItems(),
  isPublic: true,
  curatedRecommendations: getInitialCurated(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const exists = state.items.find((item) => item.id === newItem.id);
      if (!exists) {
        state.items.push(newItem);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    togglePrivacy: (state) => {
      state.isPublic = !state.isPublic;
    },
    moveToBag: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem, togglePrivacy, moveToBag } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsWishlistPublic = (state) => state.wishlist.isPublic;
export const selectWishlistItemsCount = (state) => state.wishlist.items.length;

export default wishlistSlice.reducer;
