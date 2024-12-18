import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow border-r border-stone-200 bg-white pt-5 pb-4">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-stone-50 p-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="relative z-50 md:hidden">
          <div className="fixed inset-0 bg-stone-900/80" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 bg-white">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
