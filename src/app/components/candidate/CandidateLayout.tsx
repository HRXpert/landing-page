"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  Briefcase,
  LogOut
} from 'lucide-react';
import { logoutUser } from '@/app/api/auth/auth';
import { useUser } from '@/app/context/UserContext';

interface CandidateLayoutProps {
  children: React.ReactNode;
}

const CandidateLayout: React.FC<CandidateLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Clear user context
      setUser(null);
      // Redirect to signin
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear user and redirect
      setUser(null);
      router.push('/signin');
    }
  };

  const navigationItems = [
    { 
      title: 'Dashboard', 
      icon: LayoutDashboard, 
      href: '/candidate/dashboard',
      description: 'Browse available jobs'
    },
    { 
      title: 'My Interviews', 
      icon: Calendar, 
      href: '/candidate/interviews',
      description: 'Scheduled interviews'
    },
    { 
      title: 'Profile', 
      icon: User, 
      href: '/candidate/profile',
      description: 'Manage your profile'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900/50 border-r border-gray-700/50 min-h-screen sticky top-0">
          <div className="p-6">
            <Link href="/candidate/dashboard" className="flex items-center space-x-2 mb-8">
              <Briefcase className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">HRXpert</span>
            </Link>
            
            
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;

