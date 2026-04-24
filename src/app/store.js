import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/store/dashboardSlice'
import productsReducer from '../features/products/store/productsSlice'
import wishlistReducer from '../features/wishlist/store/wishlistSlice'
import cartReducer from '../features/cart/store/cartSlice'
import ordersReducer from '../features/orders/store/orderSlice'
import accountReducer from '../features/account/store/accountSlice'

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        products: productsReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        orders: ordersReducer,
        account: accountReducer,
    },
});
