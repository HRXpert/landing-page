'use client';

import React, { useState } from 'react';
import { Mail, Download, CheckCircle, ArrowRight } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail]         = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setEmail(''); }, 3000);
    }
  };

  const perks = [
    { title: 'AI Recruitment Strategies', sub: 'Latest techniques and best practices' },
    { title: 'Ready-to-Use Templates',    sub: 'Job descriptions, interview guides'   },
    { title: 'Industry Benchmarks',       sub: 'Data-driven insights and metrics'     },
  ];

  return (
    <>
      <style>{`
        @keyframes nl-orb {
          0%,100% { transform: scale(1) translate(0,0); }
          50%      { transform: scale(1.12) translate(10px,-8px); }
        }
        .nl-input:focus { outline: none; box-shadow: 0 0 0 2px #6366f1; }
      `}</style>

      <section className="py-14 relative overflow-hidden" style={{ background: '#080c1a' }}>

        {/* Atmosphere */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(99,102,241,0.10) 0%, transparent 70%)' }} />
        <div className="absolute top-6 left-12 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', filter: 'blur(32px)', animation: 'nl-orb 14s ease-in-out infinite' }} />
        <div className="absolute bottom-6 right-12 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)', filter: 'blur(28px)', animation: 'nl-orb 18s 2s ease-in-out infinite' }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 lg:p-10"
            style={{
              background: 'linear-gradient(145deg, #0f1528 0%, #131a35 100%)',
              border: '1px solid rgba(99,102,241,0.25)',
              boxShadow: '0 0 60px rgba(99,102,241,0.08), 0 24px 64px rgba(0,0,0,0.5)',
            }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.35), rgba(99,102,241,0.12))',
                  border: '1px solid rgba(99,102,241,0.45)',
                }}
              >
                <Download className="w-5 h-5" style={{ color: '#818cf8' }} strokeWidth={1.8} />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                Get Your Free Ultimate Hiring Guide
              </h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                Download our comprehensive guide packed with AI-powered recruitment strategies,
                templates, and industry insights — plus weekly tips delivered to your inbox.
              </p>
            </div>

            {/* Perks */}
            <div className="grid sm:grid-cols-3 gap-3 mb-7">
              {perks.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-2.5 rounded-xl p-3"
                  style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)' }}
                >
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#34d399' }} strokeWidth={2} />
                  <div>
                    <div className="text-white text-[13px] font-semibold leading-snug">{p.title}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5 leading-snug">{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form / Success */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: '#475569' }}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      required
                      className="nl-input w-full pl-9 pr-3 py-2.5 rounded-lg text-sm text-white placeholder-slate-500"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(99,102,241,0.3)',
                        transition: 'box-shadow 0.2s',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-lg whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 group"
                    style={{
                      background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                      boxShadow: '0 4px 20px rgba(79,70,229,0.38)',
                    }}
                  >
                    Download Guide
                    <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div
                  className="rounded-xl p-3.5 flex items-center justify-center gap-3"
                  style={{ background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.35)' }}
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#34d399' }} />
                  <span className="text-white text-sm font-semibold">
                    Success! Check your email for the download link.
                  </span>
                </div>
              </div>
            )}

            <p className="text-center text-slate-600 text-[11px] mt-4">
              No spam, ever. Unsubscribe anytime. By signing up, you agree to our privacy policy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterSignup;
