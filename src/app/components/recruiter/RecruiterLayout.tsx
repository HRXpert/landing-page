"use client";

import React, { useState } from 'react';
import RecruiterHeader from '../recruiterHeader';
import RecruiterSidebar from './RecruiterSidebar';
import { 
  BarChart3, 
  Briefcase, 
  Settings,
  Eye,
  Plus
} from 'lucide-react';

interface RecruiterLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const RecruiterLayout: React.FC<RecruiterLayoutProps> = ({ children, currentPage = 'dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { title: 'Dashboard', icon: BarChart3, href: '/recruiter-dashboard', isActive: currentPage === 'dashboard' },
    { title: 'Job Management', icon: Briefcase, href: '/recruiter-dashboard/jobs', isActive: currentPage === 'jobs' },
    { title: 'Settings', icon: Settings, href: '/recruiter-dashboard/settings', isActive: currentPage === 'settings' },
  ];

  const quickActions = [
    { title: 'Create Job', icon: Plus, href: '/common-recruiter-functions/create-job', color: 'bg-blue-600 hover:bg-blue-700' },
    { title: 'View Jobs', icon: Eye, href: '/common-recruiter-functions/view-jobs', color: 'bg-purple-600 hover:bg-purple-700' },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Top Navigation Bar */}
      <RecruiterHeader
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Menu */}
        <RecruiterSidebar 
          navigationItems={navigationItems}
          quickActions={quickActions}
          isOpen={sidebarOpen}
        />

        {/* Mobile overlay only */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-16 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area — shifts right when sidebar is open */}
        <main
          className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out"
          style={{ marginLeft: sidebarOpen ? '256px' : '0' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
