'use client';
import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function decodeRedirectData(encoded: string): any {
  // Convert from base64url to base64
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');

  // Pad with `=` if necessary
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');

  // Decode
  const json = Buffer.from(padded, 'base64').toString('utf-8');
  return JSON.parse(json);
}

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const data = searchParams ? searchParams.get('data') : null;
    const decodedData = data ? decodeRedirectData(data) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-gray-900 flex items-center justify-center text-white px-4">
      <div className="max-w-xl text-center p-10 bg-gray-900/80 border border-indigo-700 rounded-2xl shadow-lg shadow-indigo-500/20">
        <div className="flex flex-col items-center mb-6">
          <Sparkles className="w-8 h-8 text-indigo-400 mb-2" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Signup Successful!</h1>
          <p className="text-indigo-300 text-lg">Welcome to HRXpert 🚀</p>
        </div>
        <p className="text-sm text-gray-300 mb-8">
          Your account has been successfully created. Please check your email to verify your account before logging in.
          decodedData: {JSON.stringify(decodedData)}
        </p>
        <Link href="/signin">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full text-lg shadow-lg transition-all">
            Proceed to Login
          </button>
        </Link>
      </div>
    </div>
  );
}
