'use client';

import React from 'react';
import {
  TrendingUp, Award, CheckCircle, Globe, Cpu, Heart, Star, Rocket,
  LucideIcon,
} from 'lucide-react';

const BG = '#080c1a';

const KEYFRAMES = `
  @keyframes mq-up-anim   { from { transform: translateY(0); }    to { transform: translateY(-50%); } }
  @keyframes mq-down-anim { from { transform: translateY(-50%); } to { transform: translateY(0); }    }
  .mq-adv-up   { animation: mq-up-anim   28s linear infinite; }
  .mq-adv-down { animation: mq-down-anim 32s linear infinite; }
  .mq-adv-pause:hover .mq-adv-up,
  .mq-adv-pause:hover .mq-adv-down { animation-play-state: paused; }
  @keyframes adv-bar { from { width: 0; } to { width: var(--w); } }
  @keyframes adv-pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
  @keyframes adv-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
`;

interface AdvantageItem { icon: LucideIcon; title: string; description: string; stat?: string; color: string }

const advantagesLeft: AdvantageItem[] = [
  { icon: TrendingUp,  color: '#7c3aed', stat: '75%', title: 'Faster Hiring',        description: 'Reduce time-to-hire from weeks to days with end-to-end intelligent automation.' },
  { icon: Award,       color: '#6366f1', stat: '40%', title: 'Higher Quality Hires', description: 'AI-driven scoring lifts offer-acceptance and 90-day retention rates measurably.' },
  { icon: Star,        color: '#a855f7', stat: '60%', title: 'Cost Efficiency',      description: 'Cut agency spend and automate repetitive sourcing tasks across every channel.' },
  { icon: CheckCircle, color: '#8b5cf6',              title: 'Reduced Bias',         description: 'Objective structured evaluation at every stage removes unconscious bias completely.' },
];

const advantagesRight: AdvantageItem[] = [
  { icon: Globe,  color: '#6d28d9', title: 'Centralised Dashboard', description: 'Every recruiter, candidate, and interview in one place zero tab-switching.' },
  { icon: Cpu,    color: '#7c3aed', title: 'Zero Setup Hassle',     description: 'Connect your ATS, import jobs, and start hiring in under 15 minutes, no IT needed.' },
  { icon: Heart,  color: '#a855f7', title: 'Enhanced Experience',   description: 'Candidates get timely, personal updates. Recruiters get clear, actionable queues.' },
  { icon: Rocket, color: '#8b5cf6', title: 'Scalable Growth',       description: 'From 5 hires a month to 500+, one platform scales with you without complexity.' },
];

const AdvantageCard: React.FC<{ item: AdvantageItem }> = ({ item }) => {
  const Icon = item.icon;
  return (
    <div
      className="flex-shrink-0 rounded-xl px-4 py-3.5 flex flex-col gap-2 relative overflow-hidden w-full"
      style={{
        height          : 148,
        background      : 'linear-gradient(145deg,#0e0c22,#0b0a1c)',
        borderLeft      : `3px solid ${item.color}`,
        border          : `1px solid ${item.color}28`,
        borderLeftColor : item.color,
        borderLeftWidth : 3,
        borderLeftStyle : 'solid',
      }}
    >
      {item.stat && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none"
          style={{ fontSize: '4.5rem', color: `${item.color}12`, letterSpacing: '-0.04em' }}>
          {item.stat}
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: `linear-gradient(to right,${item.color}70,transparent)` }} />

      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
          style={{ background: `${item.color}20`, border: `1px solid ${item.color}45` }}>
          <Icon size={13} style={{ color: item.color }} strokeWidth={1.7} />
        </div>
        {item.stat && (
          <span className="font-black text-[1.4rem] leading-none" style={{
            background: `linear-gradient(135deg,${item.color},#c084fc)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {item.stat}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-white font-semibold text-[12px] mb-0.5">{item.title}</h3>
        <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
};

/* â”€â”€ Inline SVG dashboard illustration for center column â”€â”€ */
const DashboardIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center" style={{ animation: 'adv-float 5s ease-in-out infinite' }}>
    <svg
      viewBox="0 0 220 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ maxWidth: 200, maxHeight: 400, filter: 'drop-shadow(0 0 32px rgba(139,92,246,0.4))' }}
    >
      {/* Phone frame */}
      <rect x="10" y="4" width="200" height="412" rx="28" fill="#0e0c22" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.7"/>
      <rect x="18" y="20" width="184" height="376" rx="20" fill="#120f2a"/>
      {/* Top notch */}
      <rect x="75" y="11" width="70" height="8" rx="4" fill="#1e1a3a"/>

      {/* Status bar */}
      <text x="26" y="40" fontSize="7" fill="#6366f1" fontWeight="600" fontFamily="monospace">HRXpert</text>
      <circle cx="188" cy="37" r="3.5" fill="#10b981" opacity="0.8"/>

      {/* Header bar */}
      <rect x="22" y="48" width="176" height="1" fill="#7c3aed" fillOpacity="0.3"/>

      {/* Stat cards row */}
      <rect x="26" y="56" width="50" height="38" rx="8" fill="#1a1540" stroke="#7c3aed" strokeWidth="0.8" strokeOpacity="0.5"/>
      <text x="32" y="70" fontSize="7" fill="#a78bfa">Hired</text>
      <text x="32" y="84" fontSize="12" fill="#c084fc" fontWeight="700">142</text>

      <rect x="85" y="56" width="50" height="38" rx="8" fill="#1a1540" stroke="#6366f1" strokeWidth="0.8" strokeOpacity="0.5"/>
      <text x="91" y="70" fontSize="7" fill="#818cf8">Active</text>
      <text x="91" y="84" fontSize="12" fill="#818cf8" fontWeight="700">89</text>

      <rect x="144" y="56" width="52" height="38" rx="8" fill="#1a1540" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.5"/>
      <text x="150" y="70" fontSize="7" fill="#34d399">Offers</text>
      <text x="150" y="84" fontSize="12" fill="#34d399" fontWeight="700">24</text>

      {/* Pipeline label */}
      <text x="26" y="110" fontSize="7.5" fill="#6b7280" fontWeight="500">Pipeline stages</text>

      {/* Pipeline bars */}
      <rect x="26" y="116" width="168" height="6" rx="3" fill="#1e1a3a"/>
      <rect x="26" y="116" width="148" height="6" rx="3" fill="url(#bar1)"/>

      <rect x="26" y="128" width="168" height="6" rx="3" fill="#1e1a3a"/>
      <rect x="26" y="128" width="110" height="6" rx="3" fill="url(#bar2)"/>

      <rect x="26" y="140" width="168" height="6" rx="3" fill="#1e1a3a"/>
      <rect x="26" y="140" width="75" height="6" rx="3" fill="url(#bar3)"/>

      <rect x="26" y="152" width="168" height="6" rx="3" fill="#1e1a3a"/>
      <rect x="26" y="152" width="44" height="6" rx="3" fill="url(#bar4)"/>

      <text x="26" y="172" fontSize="7" fill="#6b7280">Applied</text>
      <text x="26" y="184" fontSize="7" fill="#6b7280">Screened</text>
      <text x="26" y="196" fontSize="7" fill="#6b7280">Interview</text>
      <text x="26" y="208" fontSize="7" fill="#6b7280">Offer</text>

      <text x="182" y="172" fontSize="7" fill="#a78bfa" textAnchor="end">234</text>
      <text x="182" y="184" fontSize="7" fill="#818cf8" textAnchor="end">172</text>
      <text x="182" y="196" fontSize="7" fill="#67e8f9" textAnchor="end">89</text>
      <text x="182" y="208" fontSize="7" fill="#34d399" textAnchor="end">24</text>

      {/* Separator */}
      <rect x="22" y="216" width="176" height="1" fill="#7c3aed" fillOpacity="0.2"/>

      {/* Candidate cards */}
      <text x="26" y="230" fontSize="7.5" fill="#6b7280" fontWeight="500">Recent candidates</text>

      {/* Card 1 */}
      <rect x="26" y="236" width="168" height="46" rx="8" fill="#1a1540" stroke="#6366f180" strokeWidth="0.8"/>
      <circle cx="44" cy="259" r="10" fill="#6366f130"/>
      <text x="44" y="263" fontSize="8" fill="#818cf8" textAnchor="middle" fontWeight="700">JL</text>
      <text x="60" y="253" fontSize="8" fill="#e2e8f0" fontWeight="600">Jessica Liu</text>
      <text x="60" y="264" fontSize="6.5" fill="#6b7280">Product Designer Â· 94%</text>
      <rect x="130" y="252" width="40" height="14" rx="7" fill="#10b98130"/>
      <text x="150" y="262" fontSize="6" fill="#34d399" textAnchor="middle" fontWeight="600">Shortlisted</text>
      <rect x="60" y="268" width="50" height="3" rx="1.5" fill="#6366f140"/>
      <rect x="60" y="268" width="45" height="3" rx="1.5" fill="#6366f1"/>

      {/* Card 2 */}
      <rect x="26" y="288" width="168" height="46" rx="8" fill="#1a1540" stroke="#7c3aed80" strokeWidth="0.8"/>
      <circle cx="44" cy="311" r="10" fill="#7c3aed30"/>
      <text x="44" y="315" fontSize="8" fill="#a78bfa" textAnchor="middle" fontWeight="700">MK</text>
      <text x="60" y="305" fontSize="8" fill="#e2e8f0" fontWeight="600">Marcus K.</text>
      <text x="60" y="316" fontSize="6.5" fill="#6b7280">Backend Eng Â· 88%</text>
      <rect x="130" y="304" width="40" height="14" rx="7" fill="#f59e0b20"/>
      <text x="150" y="314" fontSize="6" fill="#fbbf24" textAnchor="middle" fontWeight="600">Interview</text>
      <rect x="60" y="320" width="50" height="3" rx="1.5" fill="#7c3aed40"/>
      <rect x="60" y="320" width="38" height="3" rx="1.5" fill="#7c3aed"/>

      {/* Card 3 */}
      <rect x="26" y="340" width="168" height="46" rx="8" fill="#1a1540" stroke="#06b6d480" strokeWidth="0.8"/>
      <circle cx="44" cy="363" r="10" fill="#06b6d430"/>
      <text x="44" y="367" fontSize="8" fill="#67e8f9" textAnchor="middle" fontWeight="700">AR</text>
      <text x="60" y="357" fontSize="8" fill="#e2e8f0" fontWeight="600">Aisha R.</text>
      <text x="60" y="368" fontSize="6.5" fill="#6b7280">ML Engineer Â· 91%</text>
      <rect x="130" y="356" width="40" height="14" rx="7" fill="#06b6d420"/>
      <text x="150" y="366" fontSize="6" fill="#67e8f9" textAnchor="middle" fontWeight="600">Offer sent</text>
      <rect x="60" y="372" width="50" height="3" rx="1.5" fill="#06b6d440"/>
      <rect x="60" y="372" width="49" height="3" rx="1.5" fill="#06b6d4"/>

      {/* Bottom nav bar */}
      <rect x="22" y="390" width="176" height="1" fill="#7c3aed" fillOpacity="0.25"/>
      <circle cx="65" cy="403" r="4" fill="#7c3aed60"/>
      <circle cx="110" cy="403" r="4" fill="#6366f1"/>
      <circle cx="155" cy="403" r="4" fill="#7c3aed60"/>

      <defs>
        <linearGradient id="bar1" x1="0" x2="1" y1="0" y2="0"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#6366f1"/></linearGradient>
        <linearGradient id="bar2" x1="0" x2="1" y1="0" y2="0"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#818cf8"/></linearGradient>
        <linearGradient id="bar3" x1="0" x2="1" y1="0" y2="0"><stop stopColor="#818cf8"/><stop offset="1" stopColor="#67e8f9"/></linearGradient>
        <linearGradient id="bar4" x1="0" x2="1" y1="0" y2="0"><stop stopColor="#10b981"/><stop offset="1" stopColor="#34d399"/></linearGradient>
      </defs>
    </svg>
    {/* Floating badge */}
    <div className="absolute -top-4 -right-2 px-2 py-1 rounded-lg flex items-center gap-1.5"
      style={{ background: 'rgba(99,102,241,0.25)', border: '1px solid rgba(99,102,241,0.45)', backdropFilter: 'blur(8px)', animation: 'adv-pulse 3s ease-in-out infinite' }}>
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <span className="text-[10px] font-semibold text-indigo-200">Live pipeline</span>
    </div>
    <div className="absolute -bottom-4 -left-4 px-2 py-1 rounded-lg flex items-center gap-1.5"
      style={{ background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.45)', backdropFilter: 'blur(8px)', animation: 'adv-pulse 3.5s ease-in-out 1s infinite' }}>
      <span className="text-[10px] font-semibold text-purple-200">AI scored âœ¦ 94%</span>
    </div>
  </div>
);

const AdvantagesBand: React.FC = () => (
  <section
    data-section="advantages"
    className="relative overflow-hidden py-16"
    style={{ background: BG }}
  >
    <style>{KEYFRAMES}</style>

    <div className="absolute inset-0 pointer-events-none" style={{
      background: 'radial-gradient(ellipse 80% 50% at 50% 50%,rgba(139,92,246,0.09) 0%,transparent 65%)',
    }} />

    {/* Header */}
    <div className="relative text-center px-4 mb-10">
      <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4"
        style={{ color: '#c084fc', background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.28)' }}>
        Proven Advantages
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
        Results you can{' '}
        <span style={{ background: 'linear-gradient(90deg,#c084fc,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          measure
        </span>
      </h2>
      <p className="text-slate-400 text-[15px] mt-3 max-w-xl mx-auto">
        Real metrics from teams that switched to HRXpert better hires, lower cost, faster close.
      </p>
    </div>

    {/* 3-column layout: left ticker | center illustration | right ticker */}
    <div
      className="mq-adv-pause relative mx-4 sm:mx-8 lg:mx-16"
      style={{ display: 'grid', gridTemplateColumns: '1fr 220px 1fr', gap: '2rem', height: 480, overflow: 'hidden' }}
    >
      {/* Fade top/bottom over both side columns */}
      <div className="absolute inset-x-0 top-0 z-10 pointer-events-none" style={{ height: 60, background: `linear-gradient(to bottom,${BG},transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: 60, background: `linear-gradient(to top,${BG},transparent)` }} />

      {/* Left column scrolls up */}
      <div className="overflow-hidden h-full flex flex-col">
        <div className="mq-adv-up flex flex-col gap-3 px-1">
          {[...advantagesLeft, ...advantagesLeft].map((a, i) => <AdvantageCard key={i} item={a} />)}
        </div>
      </div>

      {/* Center phone illustration */}
      <div className="relative flex items-center justify-center z-20" style={{ overflow: 'visible' }}>
        <DashboardIllustration />
      </div>

      {/* Right column scrolls down */}
      <div className="overflow-hidden h-full flex flex-col">
        <div className="mq-adv-down flex flex-col gap-3 px-1">
          {[...advantagesRight, ...advantagesRight].map((a, i) => <AdvantageCard key={i} item={a} />)}
        </div>
      </div>
    </div>
  </section>
);

export default AdvantagesBand;
