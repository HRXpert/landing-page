'use client';
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { resendVerificationEmail } from '@/app/api/auth/auth';

export function decodeRedirectData(encoded: string): any {
    // Convert from base64url to base64
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');

    // Pad with `=` if necessary
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');

    // Decode
    const json = Buffer.from(padded, 'base64').toString('utf-8');
    return JSON.parse(json);
}

export default function VerificationFailed() {
      const [Msg, setMsg] = useState('');
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-gray-900 flex items-center justify-center text-white px-4">
            <div className="max-w-xl text-center p-10 bg-gray-900/80 border border-indigo-700 rounded-2xl shadow-lg shadow-indigo-500/20">
                <div className="flex flex-col items-center mb-6">
                    <Sparkles className="w-8 h-8 text-indigo-400 mb-2" />
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Verification Failed</h1>
                    <p className="text-indigo-300 text-lg">Need to verify you account</p>
                </div>
                <p className="text-sm text-gray-300 mb-8">
                    Please check your email to verify your account before logging in.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full text-lg shadow-lg transition-all"
                    onClick={async () => { 
                        const res = await resendVerificationEmail();
                        if (res.success) {
                            console.log('Verification email sent successfully');
                            setMsg(res.message);
                        } else {
                            setMsg(res.message);
                            console.error('Failed to send verification email:', res.message);
                        }
                     }}>
                    Resend Verification Email
                </button>
                {Msg && <p className="mt-4 text-indigo-300">{Msg}</p>}
                
            </div>
        </div>
    );
}
