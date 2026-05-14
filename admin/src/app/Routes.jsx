import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import Layout from './Layout';
import DashboardPage from '../features/Dashboard/pages/DashboardPage';
import Products from '../features/Products/pages/Products';
import OrdersPage from '../features/Orders/pages/OrdersPage';
import CreateOrderPage from '../features/Orders/pages/CreateOrderPage';
import OrderDetailsPage from '../features/Orders/pages/OrderDetailsPage';
import InventoryPage from '../features/Inventory/pages/InventoryPage';
import SettingsPage from '../features/Settings/pages/SettingsPage';
import PromotionsPage from '../features/Promotions/pages/PromotionsPage';
import CustomersPage from '../features/Customers/pages/CustomersPage';
import AIInsightsPage from '../features/AITools/pages/AIInsightsPage';
import SignInPage from '../features/auth/pages/SignInPage';
import ReviewsPage from '../features/Reviews/pages/ReviewsPage';
import AnalyticsPage from '../features/Analytics/pages/AnalyticsPage';
import AddProduct from '../features/Products/pages/AddProduct';
import ProductDetailsPage from '../features/Products/pages/ProductDetailsPage';
import EditProductPage from '../features/Products/pages/EditProductPage';
import AdminListPage from '../features/AdminManagement/pages/AdminListPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeThunk, selectIsInitialized, selectUser } from '../features/auth/store/authSlice';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const isInitialized = useSelector(selectIsInitialized);

  if (!isInitialized) return null; // Or a loading spinner
  if (!user) return <Navigate to="/signin" replace />;

  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
       <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route element={
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      }>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      <Route path='/admins' element={<AdminListPage/>}/>
      <Route path='/product/view/:id' element={<ProductDetailsPage/>}/>
      <Route path='/product/edit/:id' element={<EditProductPage/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/products/add' element={<AddProduct/>}/>
      <Route path='/orders' element={<OrdersPage/>}/>
      <Route path='/orders/create' element={<CreateOrderPage/>}/>
      <Route path='/orders/:id' element={<OrderDetailsPage/>}/>
      <Route path='/inventory' element={<InventoryPage/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      <Route path='/ai-tools' element={<AIInsightsPage/>}/>
      <Route path='/customers' element={<CustomersPage/>}/>
      <Route path='/promotions' element={<PromotionsPage/>}/>
      <Route path='/reviews' element={<ReviewsPage/>}/>
      <Route path='/analytics' element={<AnalyticsPage/>}/>

      </Route>
    </>
  )
);

export default router
