import React from 'react';
import { ArrowRight, CheckCircle, Users, BarChart3, Zap, Shield, Star, TrendingUp } from 'lucide-react';

const KEYFRAMES = `
  @keyframes cta-card-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes cta-counter { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes cta-pulse-ring { 0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:0.7;transform:scale(1.06)} }
  @keyframes cta-stream { 0%{transform:translateY(0)}100%{transform:translateY(-50%)} }
  .cta-stream { animation: cta-stream 14s linear infinite; }
  .cta-pulse-ring { animation: cta-pulse-ring 3s ease-in-out infinite; }
`;

const TRUST = [
  { label: '10,000+ hires', icon: Users },
  { label: '4.9 â˜… rating', icon: Star },
  { label: 'SOC 2 certified', icon: Shield },
  { label: '75% faster hiring', icon: TrendingUp },
];

const CHECKS = [
  'Free 14-day trial no credit card',
  'Setup in under 15 minutes',
  'Cancel anytime, no lock-in',
  'GDPR & SOC 2 compliant',
  '24/7 dedicated support',
  'Works with your existing ATS',
];

const PIPE_STAGES = [
  { label: 'Applied',   count: 234, w: '96%', color: '#7c3aed' },
  { label: 'Screened',  count: 172, w: '73%', color: '#6366f1' },
  { label: 'Interview', count: 89,  w: '38%', color: '#818cf8' },
  { label: 'Offer',     count: 24,  w: '10%', color: '#10b981' },
];

const CANDIDATES = [
  { initials: 'JL', name: 'Jessica Liu',    role: 'Product Designer', score: 94, status: 'Offer sent',  sc: '#10b981', ic: '#6366f1' },
  { initials: 'MK', name: 'Marcus Kumar',   role: 'Backend Engineer', score: 88, status: 'Interview',   sc: '#f59e0b', ic: '#7c3aed' },
  { initials: 'AR', name: 'Aisha Rahman',   role: 'ML Engineer',      score: 91, status: 'Shortlisted', sc: '#06b6d4', ic: '#06b6d4' },
  { initials: 'DW', name: 'Derek Wang',     role: 'Data Analyst',     score: 85, status: 'Screened',    sc: '#a855f7', ic: '#a855f7' },
];

const CTASection: React.FC = () => {
  return (
    <section
      data-section="cta"
      className="relative overflow-hidden py-24"
      style={{ background: '#080c1a' }}
    >
      <style>{KEYFRAMES}</style>

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[60vw] h-[60vh]" style={{ background: 'radial-gradient(ellipse at 20% 10%,rgba(99,102,241,0.12) 0%,transparent 60%)' }} />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh]" style={{ background: 'radial-gradient(ellipse at 80% 90%,rgba(124,58,237,0.10) 0%,transparent 60%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* â”€â”€ Left copy + CTA â”€â”€ */}
          <div className="flex flex-col gap-7">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-5"
                style={{ color: '#818cf8', background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.28)' }}>
                Get Started Today
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Transform your hiring{' '}
                <span style={{ background: 'linear-gradient(90deg,#818cf8,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  from day one
                </span>
              </h2>
              <p className="text-slate-400 text-[15px] mt-4 leading-relaxed max-w-md">
                Join 500+ companies that cut hiring time by 75% in their first month. No complex
                onboarding start posting jobs and scoring candidates today.
              </p>
            </div>

            {/* Checklist */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CHECKS.map((c, i) => (
                <li key={i} className="flex items-center gap-2.5 text-slate-300 text-[13px]">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#818cf8' }} />
                  {c}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[14px] text-white group transition-all duration-200"
                style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}
              >
                Request a Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[14px] text-slate-300 transition-all duration-200 hover:text-white"
                style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
              >
                Start free trial
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              {TRUST.map(({ label, icon: Icon }, i) => (
                <div key={i} className="flex items-center gap-1.5 text-slate-400 text-[12px]">
                  <Icon className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* â”€â”€ Right animated dashboard mockup â”€â”€ */}
          <div className="relative flex items-center justify-center">
            {/* Glow ring */}
            <div className="absolute w-72 h-72 rounded-full cta-pulse-ring pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)' }} />

            <div
              className="relative rounded-2xl overflow-hidden w-full"
              style={{ maxWidth: 420, background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: '1px solid rgba(99,102,241,0.22)', boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.12)' }}
            >
              {/* Mac-style top bar */}
              <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
                <span className="ml-3 text-[11px] text-slate-500 font-mono">HRXpert Â· Pipeline</span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'cta-pulse-ring 2s ease-in-out infinite' }} />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-px p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                {[{ l: 'Active Jobs', v: '38', c: '#818cf8' }, { l: 'Candidates', v: '1,204', c: '#c084fc' }, { l: 'Hired (MTD)', v: '42', c: '#34d399' }].map(({ l, v, c }, i) => (
                  <div key={i} className="text-center px-2 py-2.5">
                    <div className="font-black text-[1.4rem] leading-tight" style={{ color: c }}>{v}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>

              {/* Pipeline bars */}
              <div className="px-4 pb-3">
                <div className="text-[10px] text-slate-500 mb-2 font-medium tracking-wide uppercase">Pipeline</div>
                {PIPE_STAGES.map(({ label, count, w, color }) => (
                  <div key={label} className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-slate-500 w-14 flex-shrink-0">{label}</span>
                    <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: w, background: color, opacity: 0.85 }} />
                    </div>
                    <span className="text-[10px] text-slate-500 w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>

              {/* Candidate stream */}
              <div className="px-4 pb-4" style={{ overflow: 'hidden', height: 188 }}>
                <div className="text-[10px] text-slate-500 mb-2 font-medium tracking-wide uppercase">Recent activity</div>
                <div className="cta-stream flex flex-col gap-2">
                  {[...CANDIDATES, ...CANDIDATES].map(({ initials, name, role, score, status, sc, ic }, i) => (
                    <div key={i} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                        style={{ background: `${ic}25`, color: ic }}>{initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-white font-medium truncate">{name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{role} Â· <span style={{ color: ic }}>{score}% match</span></div>
                      </div>
                      <span className="flex-shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${sc}20`, color: sc }}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating stat badges */}
            <div className="absolute -top-4 -left-4 px-3 py-1.5 rounded-xl flex items-center gap-2"
              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.35)', backdropFilter: 'blur(8px)' }}>
              <BarChart3 className="w-3 h-3 text-emerald-400" />
              <span className="text-[11px] font-semibold text-emerald-300">75% faster hire</span>
            </div>
            <div className="absolute -bottom-3 -right-4 px-3 py-1.5 rounded-xl flex items-center gap-2"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', backdropFilter: 'blur(8px)' }}>
              <Zap className="w-3 h-3 text-indigo-400" />
              <span className="text-[11px] font-semibold text-indigo-300">AI scored in 2s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
