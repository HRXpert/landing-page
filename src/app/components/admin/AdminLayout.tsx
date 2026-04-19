"use client";

import React, { useState } from 'react';
import AdminHeader from '../AdminHeader';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  currentPage = 'dashboard' 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Top Navigation Bar */}
      <AdminHeader
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Menu */}
        <AdminSidebar currentPage={currentPage} isOpen={sidebarOpen} />

        {/* Mobile overlay only */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-16 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area — shifts right when sidebar is open */}
        <main
          className="flex-1 overflow-y-auto p-6 transition-all duration-300 ease-in-out"
          style={{ marginLeft: sidebarOpen ? '256px' : '0' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;