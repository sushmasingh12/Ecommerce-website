import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './Layout'
import LoadingScreen from '../shared/components/LoadingScreen';

// Lazy loaded components
const Dashboard = lazy(() => import('../features/dashboard/pages/Dashboard'));
const ProductsPage = lazy(() => import('../features/products/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('../features/products/pages/ProductDetailPage'));
const WishlistPage = lazy(() => import('../features/wishlist/pages/WishlistPage'));
const CartPage = lazy(() => import('../features/cart/pages/CartPage'));
const OrderHistory = lazy(() => import('../features/account/pages/Orderhistory'));
const CheckoutPage = lazy(() => import('../features/checkout/pages/CheckoutPage'));
const ProfileOverview = lazy(() => import('../features/account/pages/ProfileOverview'));
const ProfileDetails = lazy(() => import('../features/account/pages/ProfileDetails'));
const SavedAddresses = lazy(() => import('../features/account/pages/SavedAddresses'));
const PaymentMethods = lazy(() => import('../features/account/pages/PaymentMethods'));
const AboutPage = lazy(() => import('../features/footer/editorial/AboutPage'));
const JournalPage = lazy(() => import('../features/footer/editorial/JournalPage'));
const ContactPage = lazy(() => import('../features/footer/support/ContactPage'));
const ShippingPage = lazy(() => import('../features/footer/support/ShippingPage'));
const ReturnsPage = lazy(() => import('../features/footer/support/ReturnsPage'));
const BoutiquesPage = lazy(() => import('../features/footer/support/BoutiquesPage'));
const AppointmentsPage = lazy(() => import('../features/footer/support/AppointmentsPage'));
const Settings = lazy(() => import('../features/account/pages/Settings'));
const HelpSupport = lazy(() => import('../features/account/pages/Helpsupport '));
const SignIn = lazy(() => import('../features/auth/pages/SignIn'));
const SignUp = lazy(() => import('../features/auth/pages/SignUp'));
const NotFound = lazy(() => import('../shared/pages/NotFound'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={
            <Suspense fallback={<LoadingScreen />}>
                <Layout />
            </Suspense>
        }>
            <Route index element={<Dashboard />} />

            {/* Auth */}
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />

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
            <Route path="account/settings" element={<Settings />} />
            <Route path="account/help" element={<HelpSupport />} />

            {/*Editorial*/}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/boutiques" element={<BoutiquesPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
)



export default router
