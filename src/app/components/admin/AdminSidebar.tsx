"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Calendar,
  User,
  Settings
} from 'lucide-react';

interface SidebarItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isActive?: boolean;
}

interface QuickAction {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
}

interface AdminSidebarProps {
  currentPage?: string;
  className?: string;
  isOpen?: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  currentPage = 'dashboard',
  className = '',
  isOpen = false
}) => {
  const navigationItems: SidebarItem[] = [
    { title: 'Dashboard', icon: TrendingUp, href: '/admin-recruiter', isActive: currentPage === 'dashboard' },
    { title: 'Recruiter Management', icon: Users, href: '/admin-recruiter/manage', isActive: currentPage === 'manage' },
    { title: 'Billing', icon: Calendar, href: '/admin-recruiter/billing', isActive: currentPage === 'billing' },
    { title: 'Job Management', icon: Briefcase, href: '/admin-recruiter/jobs', isActive: currentPage === 'jobs' },
    // { title: 'Analytics', icon: BarChart3, href: '/admin-recruiter/analytics', isActive: currentPage === 'analytics' },
    // { title: 'Reports', icon: FileText, href: '/admin-recruiter/reports', isActive: currentPage === 'reports' },
    { title: 'Settings', icon: Settings, href: '/admin-recruiter/settings', isActive: currentPage === 'settings' },
  ];

  const quickActions: QuickAction[] = [
    { title: 'Billing & Plans', icon: Calendar, href: '/admin-recruiter/billing', color: 'bg-indigo-700 hover:bg-indigo-600 border border-indigo-600' },
    { title: 'Create Job', icon: Briefcase, href: '/common-recruiter-functions/create-job', color: 'bg-emerald-700 hover:bg-emerald-600 border border-emerald-600' },
    { title: 'View Analytics', icon: TrendingUp, href: '/admin-recruiter/analytics', color: 'bg-violet-700 hover:bg-violet-600 border border-violet-600' },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-800/95 border-r border-gray-700/50 backdrop-blur-sm transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${className}`}
    >
      <div className="p-6">
        
        {/* Navigation Menu */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                item.isActive 
                  ? 'text-white bg-indigo-600/20 border border-indigo-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Link 
                key={index}
                href={action.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-white text-sm transition-colors ${action.color}`}
              >
                <action.icon className="w-4 h-4" />
                <span>{action.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;