"use client";

import React from 'react';
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
  const navigationItems = [
    { title: 'Dashboard', icon: BarChart3, href: '/recruiter-dashboard', isActive: currentPage === 'dashboard' },
    { title: 'Job Management', icon: Briefcase, href: '/recruiter-dashboard/jobs', isActive: currentPage === 'jobs' },
    { title: 'Settings', icon: Settings, href: '/recruiter-dashboard/settings', isActive: currentPage === 'settings' },
  ];

  const quickActions = [
    { title: 'Create Job', icon: Plus, href: '/common-recruiter-functions/create-job', color: 'bg-blue-600 hover:bg-blue-700' },
    { title: 'View Jobs', icon: Eye, href: '/common-recruiter-functions/view-jobs', color: 'bg-green-600 hover:bg-green-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Top Navigation Bar */}
      <RecruiterHeader />

      <div className="flex">
        {/* Sidebar Menu */}
        <RecruiterSidebar 
          navigationItems={navigationItems}
          quickActions={quickActions}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
