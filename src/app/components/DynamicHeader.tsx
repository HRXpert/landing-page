"use client";

import React from 'react';
import { useUser } from '../context/UserContext';
import RecruiterHeader from './recruiterHeader';
import AdminHeader from './AdminHeader';

/**
 * DynamicHeader component that renders the appropriate header based on user role
 * - Admin recruiters see AdminHeader
 * - Regular recruiters see RecruiterHeader
 * - Falls back to RecruiterHeader if role is not determined
 */
const DynamicHeader = () => {
  const { user } = useUser();

  // Handle nested user structure (result.data.user.role) or flat structure (user.role)
  const userRole = (user as any)?.user?.role || user?.role;

  // Render AdminHeader for admin-recruiter role
  if (userRole === 'admin-recruiter') {
    return <AdminHeader />;
  }

  // Default to RecruiterHeader for recruiter role or any other case
  return <RecruiterHeader />;
};

export default DynamicHeader;
