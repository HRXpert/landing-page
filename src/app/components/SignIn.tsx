'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
// import { signInUser } from '../api/auth/auth';
// import { signInWithGoogle } from '../api/auth/OAuth';
import { useUser } from '../context/UserContext';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4">
      {/* Back navigation arrow - positioned at top-left */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="inline-flex items-center text-indigo-400 hover:text-white transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>
      
      <div className="w-full max-w-md bg-gray-900/90 border border-gray-800 rounded-2xl shadow-xl p-8 sm:p-10">
        <div className="flex flex-col items-center mb-8">
          <span className="text-3xl font-bold text-white tracking-tight mb-2">HRXpert</span>
          <span className="text-indigo-400 font-medium text-lg">Sign in to your account</span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} onKeyDown={handleKeyDown} aria-label="Sign in form">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-indigo-200 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Show Password Toggle + Forgot Password */}
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center text-indigo-200 text-sm">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(prev => !prev)}
                className="h-4 w-4 text-indigo-600 bg-gray-800 border-gray-700 rounded focus:ring-indigo-500"
              />
              <span className="ml-2">Show Password</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-indigo-400 hover:text-white text-sm font-medium transition-colors focus:outline-none focus:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {error && (
            <div className="text-red-500 text-sm text-center" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="mx-4 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 font-semibold py-3 rounded-lg shadow hover:bg-gray-100 transition-all duration-200 border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Sign in with Google"
          onClick={() => { }}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.86-6.86C36.68 2.7 30.77 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.99 6.21C12.13 13.13 17.56 9.5 24 9.5z" /><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.03l7.18 5.59C43.98 37.13 46.1 31.36 46.1 24.55z" /><path fill="#FBBC05" d="M10.68 28.3c-1.01-2.99-1.01-6.21 0-9.2l-7.99-6.21C.64 17.18 0 20.5 0 24s.64 6.82 2.69 11.11l7.99-6.21z" /><path fill="#EA4335" d="M24 48c6.77 0 12.48-2.24 16.64-6.09l-7.18-5.59c-2.01 1.35-4.59 2.16-7.46 2.16-6.44 0-11.87-3.63-14.32-8.81l-7.99 6.21C6.73 42.18 14.82 48 24 48z" /></g></svg>
          Continue with Google
        </button>

        <div className="mt-8 text-center text-indigo-200 text-sm">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-indigo-400 hover:text-white font-medium transition-colors focus:outline-none focus:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
