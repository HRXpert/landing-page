'use client';

import { Suspense } from 'react';
import { UserProvider } from './context/UserContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </UserProvider>
  );
}
