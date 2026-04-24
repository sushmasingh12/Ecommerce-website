import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from '../features/dashboard/pages/Dashboard'
import ProductsPage from '../features/products/pages/ProductsPage'
import ProductDetailPage from '../features/products/pages/ProductDetailPage';
import WishlistPage from '../features/wishlist/pages/WishlistPage';
import CartPage from '../features/cart/pages/CartPage';
import OrderHistory from '../features/orders/pages/OrderHistory';
import CheckoutPage from '../features/checkout/pages/CheckoutPage';
import ProfileOverview from '../features/account/pages/ProfileOverview';
import ProfileDetails from '../features/account/pages/ProfileDetails';
import SavedAddresses from '../features/account/pages/SavedAddresses';
import PaymentMethods from '../features/account/pages/PaymentMethods';
import AboutPage from '../features/footer/editorial/AboutPage'
import JournalPage from '../features/footer/editorial/JournalPage'
import ContactPage from '../features/footer/support/ContactPage'
import ShippingPage from '../features/footer/support/ShippingPage'
import ReturnsPage from '../features/footer/support/ReturnsPage'
import BoutiquesPage from '../features/footer/support/BoutiquesPage'
import AppointmentsPage from '../features/footer/support/AppointmentsPage'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />


            {/* Women */}
            <Route path="women" element={<ProductsPage category="women" />} />
            <Route path="women/:sub" element={<ProductsPage category="women" />} />

            {/* Men */}
            <Route path="men" element={<ProductsPage category="men" />} />
            <Route path="men/:sub" element={<ProductsPage category="men" />} />

            {/* Footwear */}
            <Route path="footwear" element={<ProductsPage category="footwear" />} />
            <Route path="footwear/:sub" element={<ProductsPage category="footwear" />} />

            {/* Accessories */}
            <Route path="accessories" element={<ProductsPage category="accessories" />} />
            <Route path="accessories/:sub" element={<ProductsPage category="accessories" />} />

            {/* Collections & New Arrivals — random mix of all categories */}
            <Route path="collections" element={<ProductsPage category="collections" />} />
            <Route path="new-arrivals" element={<ProductsPage category="new-arrivals" />} />
            <Route path="exclusive" element={<ProductsPage category="exclusive" />} />

            {/* Product Detail */}
            <Route path="product/:id" element={<ProductDetailPage />} />

            {/* User Pages */}
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />

            {/* Account */}
            <Route path="account" element={<ProfileOverview />} />
            <Route path="account/orders" element={<OrderHistory />} />
            <Route path="account/profile" element={<ProfileDetails />} />
            <Route path="account/addresses" element={<SavedAddresses />} />
            <Route path="account/payments" element={<PaymentMethods />} />

            {/*Editorial*/}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/boutiques" element={<BoutiquesPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
        </Route>
    )
)



export default router
