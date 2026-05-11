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
import SignUpPage from '../features/auth/pages/SignUpPage';
import VerifyEmailPage from '../features/auth/pages/VerifyEmailPage';
import ReviewsPage from '../features/Reviews/pages/ReviewsPage';
import AnalyticsPage from '../features/Analytics/pages/AnalyticsPage';
import AddProduct from '../features/Products/pages/AddProduct';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
       <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/verify_Email" element={<VerifyEmailPage />} />
      <Route element={<Layout/>}>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/products/addrpoduct' element={<AddProduct/>}/>
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
