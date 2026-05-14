import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
import dashboardReducer from "../features/Dashboard/store/dashboardSlice";
import productsReducer from "../features/Products/store/productsSlice";
import ordersReducer from "../features/Orders/store/ordersSlice";
import customersReducer from "../features/Customers/store/customersSlice";
import inventoryReducer from "../features/Inventory/store/inventorySlice";
import aiInsightsReducer from "../features/AITools/store/aiInsightsSlice";
import settingsReducer from "../features/Settings/store/settingsSlice";
import promotionsReducer from "../features/Promotions/store/promotionsSlice";
import reviewsReducer from "../features/Reviews/store/reviewsSlice";
import analyticsReducer from "../features/Analytics/store/analyticsSlice";
import adminManagementReducer from "../features/AdminManagement/store/adminManagementSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    products: productsReducer,
    orders: ordersReducer,
    customers: customersReducer,
    inventory: inventoryReducer,
    aiInsights: aiInsightsReducer,
    settings: settingsReducer,
    promotions: promotionsReducer,
    reviews: reviewsReducer,
    analytics: analyticsReducer,
    adminManagement: adminManagementReducer,
  },
});