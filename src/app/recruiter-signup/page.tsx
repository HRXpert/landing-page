'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { respondToInvitation } from '../api/recruiterInvitation/invitations';

const RecruiterSignUp: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get token from URL parameters (sent in the invitation email)
    const invitationToken = searchParams?.get('token');

    const validateForm = () => {
        if (!fullName || !username || !password || !confirmPassword) {
            setError('All fields are required');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Call the recruiter signup API
            const result = await respondToInvitation({
                token: invitationToken ?? '',
                response: "accepted",
                password: password,
                username: username,
                fullname: fullName
            });

            if (result.success) {
                setSuccess(true);
                setLoading(false);
                
                // Check if Google Calendar connection is required (for interviewers)
                if (result.data?.requiresGoogleCalendar && result.data?.googleCalendarAuthUrl) {
                    // Redirect to Google Calendar OAuth
                    setTimeout(() => {
                        window.location.href = result.data.googleCalendarAuthUrl;
                    }, 2000);
                } else {
                    // Regular recruiter - redirect to signin
                    setTimeout(() => {
                        router.push('/signin');
                    }, 3000);
                }
            } else {
                setError(result.message || 'Registration failed. Please try again.');
                setLoading(false);
            }
        } catch (err: any) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Registration error:', err);
            setLoading(false);
        }
    };

    // If no invitation token, show error
    if (!invitationToken) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4">
                <div className="w-full max-w-md bg-gray-900/90 border border-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 text-center">
                    <div className="text-red-500 text-xl mb-4">Invalid Invitation</div>
                    <p className="text-gray-300 mb-6">
                        This page can only be accessed through a valid invitation link.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    // Show success message after registration
    if (success) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4">
                <div className="w-full max-w-md bg-gray-900/90 border border-gray-800 rounded-2xl shadow-xl p-8 sm:p-10 text-center">
                    <div className="flex justify-center mb-6">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <div className="text-green-500 text-xl font-semibold mb-4">Registration Successful!</div>
                    <p className="text-gray-300 mb-6">
                        Your recruiter account has been created successfully. You will be redirected to the sign-in page shortly.
                    </p>
                    <div className="text-indigo-400 text-sm">
                        Redirecting in 3 seconds...
                    </div>
                </div>
            </div>
        );
    }

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
                    <span className="text-indigo-400 font-medium text-lg">Complete Your Recruiter Account</span>
                    <p className="text-gray-400 text-sm mt-2 text-center">
                        You have been invited to join as a recruiter. Please complete your registration below.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} aria-label="Recruiter registration form">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-indigo-200 mb-1">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            required
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-indigo-200 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Choose a username"
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
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Create a strong password"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Password must be at least 6 characters long
                        </p>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-200 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Show Password Toggle */}
                    <div className="flex items-center">
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
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg" role="alert">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {loading ? 'Creating Account...' : 'Complete Registration'}
                    </button>
                </form>

                <div className="mt-8 text-center text-indigo-200 text-sm">
                    Need help?{' '}
                    <Link href="/contact" className="text-indigo-400 hover:text-white font-medium transition-colors focus:outline-none focus:underline">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecruiterSignUp;