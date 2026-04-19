'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import Loader from '@/app/components/loader';

interface RecruiterRouteGuardProps {
  children: React.ReactNode;
}

export default function RecruiterRouteGuard({ children }: RecruiterRouteGuardProps) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Wait for loading to complete before checking
    if (loading) return;

    // Check if user is authenticated
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

    if (userRole !== 'recruiter') {
      // User is not a recruiter, redirect based on their role
      switch (userRole) {
        case 'admin-recruiter':
          router.push('/admin-recruiter');
          break;
        case 'interviewer':
          router.push('/interviewer');
          break;
        case 'candidate':
          router.push('/candidate/dashboard');
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
  }, [user, loading, router]);

  // Show loading while checking authentication
  if (loading || !user) {
    return <Loader />;
  }

  // If user is not a recruiter, don't render children (redirect is happening)
  const userRole = (user as any).user?.role || user.role;
  if (userRole !== 'recruiter') {
    return <Loader />;
  }

  // User is authenticated and is a recruiter, render children
  return <>{children}</>;
}
