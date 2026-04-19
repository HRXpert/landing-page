"use client";

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  href: string;
  isActive?: boolean;
}

interface RecruiterSidebarProps {
  title?: string;
  navigationItems: SidebarItem[];
  quickActions?: {
    title: string;
    icon: LucideIcon;
    href: string;
    color: string;
  }[];
  className?: string;
  isOpen?: boolean;
}

const RecruiterSidebar: React.FC<RecruiterSidebarProps> = ({
  navigationItems,
  quickActions = [],
  className = "",
  isOpen = false
}) => {
  return (
    <aside
      className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-800/95 border-r border-gray-700/50 backdrop-blur-sm transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${className}`}
    >
      <div className="p-6">
        
        {/* Navigation Menu */}
        <nav className="space-y-2">
          {navigationItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href} 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                item.isActive 
                  ? "text-white bg-indigo-600/20 border border-indigo-500/30" 
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        {quickActions.length > 0 && (
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
        )}
      </div>
    </aside>
  );
};

export default RecruiterSidebar;
