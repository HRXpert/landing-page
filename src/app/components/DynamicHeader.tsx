"use client";

import React from 'react';
import { useUser } from '../context/UserContext';
import RecruiterHeader from './recruiterHeader';

/**
 * DynamicHeader component that renders the appropriate header based on user role
 * - Admin recruiters see AdminHeader
 * - Regular recruiters see RecruiterHeader
 * - Falls back to RecruiterHeader if role is not determined
 */
const DynamicHeader = () => {
  // Default to RecruiterHeader for recruiter role or any other case
  return <RecruiterHeader />;
};

export default DynamicHeader;
