'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import { Loader2 } from 'lucide-react';

interface CandidateRouteGuardProps {
  children: React.ReactNode;
}

export default function CandidateRouteGuard({ children }: CandidateRouteGuardProps) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is a candidate
    if (!user) {
      // User not logged in, redirect to signin
      router.push('/signin');
      return;
    }

    // Handle nested user structure (result.data.user.role) or flat structure (user.role)
    const userRole = (user as any).user?.role || user.role;
    const isVerified = (user as any).isVerified !== undefined 
      ? (user as any).isVerified 
      : (user as any).user?.isVerified !== undefined 
        ? (user as any).user.isVerified 
        : true;

    if (userRole !== 'candidate') {
      // User is not a candidate, redirect based on their role
      switch (userRole) {
        case 'admin-recruiter':
          router.push('/admin-recruiter');
          break;
        case 'recruiter':
          router.push('/recruiter-dashboard');
          break;
        default:
          router.push('/');
      }
      return;
    }

    // Check if user is verified
    if (!isVerified) {
      router.push('/signin/verification-failed');
      return;
    }
  }, [user, router]);

  // Show loading while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not a candidate, don't render children (redirect is happening)
  const userRole = (user as any).user?.role || user.role;
  if (userRole !== 'candidate') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          <p className="text-gray-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is authenticated and is a candidate, render children
  return <>{children}</>;
}

