"use client";

import React from 'react';
import { Brain, Menu, X } from 'lucide-react';
import Link from 'next/link';

const JobsNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Brain className="h-8 w-8 text-indigo-400" />
            <span className="text-2xl font-bold text-white">HRXpert</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link href="/viewjobs" className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium">
              Browse Jobs
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-400"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-gray-900 border-b border-gray-800 shadow-lg rounded-b-lg px-4 pt-2 pb-4 flex flex-col space-y-2 animate-fade-in-down">
            <Link 
              href="/" 
              className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/viewjobs" 
              className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default JobsNavbar;

