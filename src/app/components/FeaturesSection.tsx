'use client';

import React from 'react';
import {
  File, Zap, Target, Users, BarChart3, Clock, Lightbulb, Workflow,
  LucideIcon,
} from 'lucide-react';

const BG = '#080c1a';

const KEYFRAMES = `
  @keyframes mq-left-anim  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
  @keyframes mq-right-anim { from { transform: translateX(-50%); } to { transform: translateX(0); }    }
  .mq-left  { animation: mq-left-anim  38s linear infinite; }
  .mq-right { animation: mq-right-anim 34s linear infinite; }
  .mq-ftr-pause:hover .mq-left,
  .mq-ftr-pause:hover .mq-right { animation-play-state: paused; }
`;

interface FeatureItem { icon: LucideIcon; title: string; description: string; color: string }

const features: FeatureItem[] = [
  { icon: File,      color: '#6366f1', title: 'AI Resume Parsing',         description: 'Instantly extract & structure every key detail from any resume format. No manual copy-paste ever again.' },
  { icon: Zap,       color: '#06b6d4', title: 'AI-Powered Matching',       description: 'Semantic algorithms pair candidates to roles with precision, cutting manual screening by 80%.' },
  { icon: Workflow,  color: '#10b981', title: 'Automated Workflows',       description: 'No-code automations that trigger on any event â€” received, stage changed, interview done.' },
  { icon: BarChart3, color: '#f59e0b', title: 'Analytics Dashboard',       description: 'Live charts on pipeline health, source quality, and time-to-fill. Know exactly where to improve.' },
  // { icon: Users,     color: '#ec4899', title: 'Candidate Management',      description: 'Unified talent pool with smart tags, inline notes, and real-time team collaboration.' },
  { icon: Target,    color: '#8b5cf6', title: 'Smart Sourcing',            description: 'Aggregate signals across job boards, LinkedIn, GitHub, and internal DBs â€” all ranked instantly.' },
  { icon: Clock,     color: '#14b8a6', title: 'Real-time Tracking',        description: 'Every pipeline move surfaces immediately so stakeholders always know where candidates stand.' },
  { icon: Lightbulb, color: '#f97316', title: 'Insightful Candidate Data', description: 'Skills, Red flags, and predicted performance scores, all in one structured profile.' },
];

const FeatureCard: React.FC<{ item: FeatureItem }> = ({ item }) => {
  const Icon = item.icon;
  return (
    <div
      className="flex-shrink-0 rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{
        width     : 240,
        height    : 195,
        background: 'linear-gradient(145deg,#111228,#0d0f1e)',
        border    : `1px solid ${item.color}35`,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right,transparent 10%,${item.color}80 50%,transparent 90%)` }} />
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${item.color}18 0%,transparent 65%)` }} />
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${item.color}20`, border: `1px solid ${item.color}45` }}>
        <Icon size={19} style={{ color: item.color }} strokeWidth={1.6} />
      </div>
      <div>
        <h3 className="text-white font-semibold text-[14px] mb-1">{item.title}</h3>
        <p className="text-slate-400 text-[12px] leading-relaxed line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
};

const FeaturesSection: React.FC = () => (
  <section
    data-section="features"
    className="relative overflow-hidden py-20"
    style={{ background: BG }}
  >
    <style>{KEYFRAMES}</style>

    <div className="absolute inset-0 pointer-events-none" style={{
      background: 'radial-gradient(ellipse 80% 50% at 50% 0%,rgba(6,182,212,0.08) 0%,transparent 60%)',
    }} />
    <div className="absolute bottom-0 inset-x-0 pointer-events-none" style={{
      background: 'radial-gradient(ellipse 70% 55% at 50% 100%,rgba(99,102,241,0.07) 0%,transparent 60%)',
    }} />

    {/* Header */}
    <div className="relative text-center px-4 mb-12">
      <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4"
        style={{ color: '#67e8f9', background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.28)' }}>
        Platform Features
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
        Everything you need to{' '}
        <span style={{ background: 'linear-gradient(90deg,#67e8f9,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          hire smarter
        </span>
      </h2>
      <p className="text-slate-400 text-[15px] mt-3 max-w-xl mx-auto">
        8 AI-powered tools that eliminate manual work at every stage of your pipeline.
      </p>
    </div>

    {/* Dual-row horizontal marquee â€” padded so cards never touch the viewport edge */}
    <div className="mq-ftr-pause relative" style={{ isolation: 'isolate' }}>
      {/* Wide fade masks â€” cards emerge only from well inside the boundary */}
      <div className="absolute inset-y-0 left-0 z-10 pointer-events-none"
        style={{ width: '12vw', minWidth: 80, background: `linear-gradient(to right,${BG} 60%,transparent 100%)` }} />
      <div className="absolute inset-y-0 right-0 z-10 pointer-events-none"
        style={{ width: '12vw', minWidth: 80, background: `linear-gradient(to left,${BG} 60%,transparent 100%)` }} />

      <div className="flex flex-col gap-5 overflow-hidden py-2 px-4">
        {/* Row 1 â€” left */}
        <div className="overflow-hidden">
          <div className="mq-left flex gap-4 pl-8" style={{ width: 'max-content' }}>
            {[...features, ...features].map((f, i) => <FeatureCard key={i} item={f} />)}
          </div>
        </div>
        {/* Row 2 â€” right */}
        <div className="overflow-hidden">
          <div className="mq-right flex gap-4 pl-8" style={{ width: 'max-content' }}>
            {[...[...features].reverse(), ...[...features].reverse()].map((f, i) => <FeatureCard key={i} item={f} />)}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
