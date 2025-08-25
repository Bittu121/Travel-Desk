import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="h-screen flex fixed overflow-hidden w-full">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex-1 min-w-0">
          <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <main className="p-4 bg-gray-100 h-full overflow-x-auto overflow-y-scroll">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
