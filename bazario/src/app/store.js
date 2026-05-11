import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/dashboard/store/dashboardSlice'
import productsReducer from '../features/products/store/productsSlice'
import wishlistReducer from '../features/wishlist/store/wishlistSlice'
import cartReducer from '../features/cart/store/cartSlice'
import ordersReducer from '../features/orders/store/orderSlice'
import accountReducer from '../features/account/store/accountSlice'
import authReducer from '../features/auth/store/authSlice'
import { saveState } from '../shared/utils/persistence';

export const store = configureStore({
    reducer: {
        home: homeReducer,
        products: productsReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        orders: ordersReducer,
        account: accountReducer,
        auth: authReducer,
    },
});

// Persist state on every change
store.subscribe(() => {
  const state = store.getState();
  saveState('bazario_cart_items', state.cart.items);
  saveState('bazario_wishlist_items', state.wishlist.items);
  // Auth is already handled in authSlice for more granular control (login/logout)
});
