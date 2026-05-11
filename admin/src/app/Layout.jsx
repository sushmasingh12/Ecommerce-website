import { Outlet } from "react-router-dom";
import Sidebar from "../shared/components/Layout/Sidebar";
import Navbar from "../shared/components/Layout/Navbar";

const Layout = () =>{
  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout