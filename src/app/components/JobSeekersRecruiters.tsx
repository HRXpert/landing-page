'use client';

import React, { useState } from 'react';
import { Search, Building2, ArrowRight } from 'lucide-react';

type Panel = 'seeker' | 'recruiter' | null;

const JobSeekersRecruiters: React.FC = () => {
  const [hovered, setHovered] = useState<Panel>(null);

  /* flex-basis values: hovered card → 62%, other → 38% */
  const basis = (panel: Panel) => {
    if (hovered === null) return '50%';
    return hovered === panel ? '62%' : '38%';
  };

  return (
    <>
      <style>{`
        @keyframes card-glow {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 0.85; }
        }
        .panel-card {
          transition: flex-basis 0.5s cubic-bezier(0.4,0,0.2,1),
                      box-shadow  0.4s ease,
                      transform   0.4s ease;
        }
        .panel-card:hover { transform: translateY(-3px); }
      `}</style>

      <section
        data-section="job-seekers"
        className="relative overflow-hidden flex flex-col justify-center"
        style={{ background: '#080c1a' }}
      >
        {/* Subtle top atmosphere to connect with hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full py-10">

          {/* Section label */}
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-indigo-400/70 mb-2">
              Who it&apos;s for
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Built for every side of hiring
            </h2>
          </div>

          {/* Cards row */}
          <div
            className="flex gap-4 items-stretch flex-1"
            style={{ minHeight: 0 }}
            onMouseLeave={() => setHovered(null)}
          >

            {/* ── Job Seekers ─────────────────────────────────────────────── */}
            <div
              className="panel-card relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
              style={{
                flexBasis: basis('seeker'),
                background: 'linear-gradient(135deg, #131a3a 0%, #1a1547 60%, #1e1060 100%)',
                border: '1px solid rgba(99,102,241,0.28)',
                boxShadow:
                  hovered === 'seeker'
                    ? '0 0 48px rgba(99,102,241,0.22), 0 20px 60px rgba(0,0,0,0.5)'
                    : '0 4px 24px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={() => setHovered('seeker')}
            >
              {/* Corner glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  animation: 'card-glow 4s ease-in-out infinite',
                }}
              />
              {/* Left accent stripe */}
              <div
                className="absolute left-0 top-8 bottom-8 w-0.5 rounded-full"
                style={{ background: 'linear-gradient(to bottom, transparent, #6366f1, transparent)' }}
              />

              <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col justify-between">
                <div>
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(99,102,241,0.1))',
                      border: '1px solid rgba(99,102,241,0.4)',
                    }}
                  >
                    <Search className="w-5 h-5" style={{ color: '#818cf8' }} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-snug">
                    Find your next opportunity
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                    Discover jobs that match your skills, experience, and career goals.
                    Our AI-powered platform connects you with the right opportunities faster than ever.
                  </p>
                </div>

                <button
                  className="mt-7 self-start inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 group"
                  style={{
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    boxShadow: '0 4px 20px rgba(79,70,229,0.4)',
                  }}
                >
                  Start Applying Today
                  <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* ── Recruiters ──────────────────────────────────────────────── */}
            <div
              className="panel-card relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
              style={{
                flexBasis: basis('recruiter'),
                background: 'linear-gradient(135deg, #16102e 0%, #1f0e45 60%, #260a55 100%)',
                border: '1px solid rgba(139,92,246,0.28)',
                boxShadow:
                  hovered === 'recruiter'
                    ? '0 0 48px rgba(139,92,246,0.22), 0 20px 60px rgba(0,0,0,0.5)'
                    : '0 4px 24px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={() => setHovered('recruiter')}
            >
              {/* Corner glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  animation: 'card-glow 4s 2s ease-in-out infinite',
                }}
              />
              {/* Left accent stripe */}
              <div
                className="absolute left-0 top-8 bottom-8 w-0.5 rounded-full"
                style={{ background: 'linear-gradient(to bottom, transparent, #8b5cf6, transparent)' }}
              />

              <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col justify-between">
                <div>
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(139,92,246,0.1))',
                      border: '1px solid rgba(139,92,246,0.4)',
                    }}
                  >
                    <Building2 className="w-5 h-5" style={{ color: '#a78bfa' }} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-snug">
                    Hire the right talent faster
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                    Streamline your hiring process with intelligent automation, candidate matching,
                    and comprehensive analytics to build your dream team efficiently.
                  </p>
                </div>

                <button
                  className="mt-7 self-start inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 group"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                    boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                  }}
                >
                  Learn about Talent
                  <ArrowRight className="w-4 h-4 text-violet-200 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default JobSeekersRecruiters;
