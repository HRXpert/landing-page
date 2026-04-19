"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Briefcase, Eye, BarChart3, Settings, LogOut, UserCircle, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '../context/UserContext';

interface RecruiterHeaderProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

const RecruiterHeader = ({ onToggleSidebar, sidebarOpen }: RecruiterHeaderProps = {}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      // await logoutUser();
      // Clear user context
      setUser(null);
      // Clear local storage
      localStorage.removeItem('token');
      // Redirect to signin
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear user and redirect
      setUser(null);
      localStorage.removeItem('token');
      router.push('/signin');
    }
  };

  const navLinks = [
    { href: '/common-recruiter-functions/create-job', label: 'Create Job', icon: Briefcase },
    { href: '/common-recruiter-functions/view-jobs', label: 'View Jobs', icon: Eye },
    { href: '/common-recruiter-functions/organization-applications', label: 'Organization Applications', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-900 border-b border-gray-700/50"
      style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
    >
      <div className="w-full px-4">
        <div className="relative flex items-center h-16">

          {/* Sidebar hamburger — extreme left */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="mr-5 flex items-center justify-center w-9 h-9 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Logo — far left */}
          <div className="flex-shrink-0">
            <Link
              href="/recruiter-dashboard"
              className="flex items-center space-x-2 text-white hover:text-indigo-400 transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              <span className="text-xl font-bold tracking-tight">HRXpert Recruiter</span>
            </Link>
          </div>

          {/* Desktop Nav — centred absolutely */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${isActive(href)
                    ? 'text-white'
                    : 'text-gray-400/70 hover:text-gray-200'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side — profile dropdown + mobile hamburger */}
          <div className="ml-auto flex items-center space-x-3">

            {/* Profile avatar — desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Profile menu"
              >
                <UserCircle className="w-6 h-6" />
              </button>

              {/* Dropdown — stays open until logout */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg bg-gray-800 border border-gray-700/60 shadow-lg z-50 overflow-hidden">
                  <Link
                    href="/recruiter-dashboard/profile"
                    className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-200 hover:bg-gray-700 transition-colors duration-150"
                  >
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>My Profile</span>
                  </Link>
                  <div className="border-t border-gray-700/60" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800/50 rounded-lg mt-2 border border-gray-700/50">
              <Link
                href="/recruiter-dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                  ${isActive('/recruiter-dashboard') ? 'text-white' : 'text-gray-400/70 hover:text-gray-200'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                    ${isActive(href) ? 'text-white' : 'text-gray-400/70 hover:text-gray-200'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-700/60 my-1" />

              {/* Profile link (mobile) */}
              <Link
                href="/recruiter-dashboard/profile"
                className="flex items-center space-x-2 text-gray-400/70 hover:text-gray-200 transition-colors duration-200 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Link>

              {/* Logout (mobile) */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200 px-3 py-2 rounded-md text-base font-medium w-full"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default RecruiterHeader;
