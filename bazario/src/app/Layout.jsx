import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';
import Sidebar from '../shared/components/Sidebar';
import CartDrawer from '../features/cart/components/CartDrawer';
import Footer from '../shared/components/Footer';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header openSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      <CartDrawer />
      <main className="pt-[108px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
