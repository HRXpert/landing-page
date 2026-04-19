"use client";

import React from 'react';
import { Brain, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Why HRXpert', href: '/whyHRXpert' },
  { 
    name: 'About Us', 
    href: '/aboutus',
    dropdown: [
      { name: 'Our Story', href: '/aboutus' },
      { name: 'Contact Us', href: '/contact' }
    ]
  },
  { name: 'Pricing', href: '/pricing' },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [aboutUsOpen, setAboutUsOpen] = React.useState(false);

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-400" />
            <span className="text-2xl font-bold text-white">HRXpert</span>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => setAboutUsOpen(true)}
                  onMouseLeave={() => setAboutUsOpen(false)}
                >
                  <button className="flex items-center space-x-1 text-indigo-400 hover:text-white transition-colors duration-200 font-medium">
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg transition-all duration-200 ${aboutUsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="py-2">
                      {link.dropdown.map((dropdownItem) => (
                        <Link key={dropdownItem.name} href={dropdownItem.href} passHref legacyBehavior>
                          <a className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
                            {dropdownItem.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                link.href.startsWith('/') ? (
                  <Link key={link.name} href={link.href} passHref legacyBehavior>
                    <a className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium">
                      {link.name}
                    </a>
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {link.name}
                  </a>
                )
              )
            ))}
          </nav>
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Link href="/GetStarted" passHref legacyBehavior>
              <a className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 lg:px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-indigo-500/30 shadow-md hover:shadow-lg hidden lg:block">
                Get Started
              </a>
            </Link>
            {/* Sign In link styled like nav links, placed to the right of Get Started */}
            <Link href="/signin" passHref legacyBehavior>
              <a className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium hidden lg:block">
                Sign In
              </a>
            </Link>
            {/* Hamburger for mobile */}
            <button
              className="lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-400"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-gray-900 border-b border-gray-800 shadow-lg rounded-b-lg px-4 pt-2 pb-4 flex flex-col space-y-2 animate-fade-in-down">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div key={link.name}>
                  <button 
                    className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium py-2 flex items-center justify-between w-full"
                    onClick={() => setAboutUsOpen(!aboutUsOpen)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutUsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {aboutUsOpen && (
                    <div className="ml-4 mt-2 space-y-1">
                      {link.dropdown.map((dropdownItem) => (
                        <Link key={dropdownItem.name} href={dropdownItem.href} passHref legacyBehavior>
                          <a className="block text-gray-400 hover:text-white transition-colors duration-200 py-1" onClick={() => setMobileOpen(false)}>
                            {dropdownItem.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                link.href.startsWith('/') ? (
                  <Link key={link.name} href={link.href} passHref legacyBehavior>
                    <a className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium py-2" onClick={() => setMobileOpen(false)}>
                      {link.name}
                    </a>
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )
            ))}
            <Link href="/GetStarted" passHref legacyBehavior>
              <a className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-indigo-500/30 shadow-md hover:shadow-lg self-start" onClick={() => setMobileOpen(false)}>
                Get Started
              </a>
            </Link>
            <Link href="/signin" passHref legacyBehavior>
              <a className="text-indigo-400 hover:text-white transition-colors duration-200 font-medium py-2" onClick={() => setMobileOpen(false)}>
                Sign In
              </a>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
