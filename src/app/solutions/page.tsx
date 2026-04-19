'use client';
import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Briefcase, FileSearch, Users, Mic, LayoutDashboard,
  GitMerge, CalendarCheck, BarChart3, ArrowRight, Sparkles,
  Zap, CheckCircle
} from 'lucide-react';

const BG = '#080c1a';
const KF = `
  @keyframes sol-up     { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes sol-flare  { 0%,100%{opacity:0.25;background-position:0% 50%} 50%{opacity:0.9;background-position:100% 50%} }
  @keyframes sol-shine  { 0%{transform:translateX(-120%) skewX(-15deg)} 100%{transform:translateX(220%) skewX(-15deg)} }
  .sol-reveal { opacity:0; }
  .sol-reveal.visible { animation: sol-up .55s ease forwards; }
`;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const MODULES = [
  { icon: Briefcase,       color: '#818cf8', label: 'Job Creation',       desc: 'AI-assisted job descriptions, multi-channel posting, smart templates, and approval workflows.', stat: '3× faster posting',   outcome: 'Reduce time to publish a role from hours to minutes with AI-generated descriptions.' },
  { icon: FileSearch,      color: '#fbbf24', label: 'Resume Parsing',     desc: 'Parse thousands of resumes in seconds. Structured extraction of skills, experience, education and more.', stat: '50K+ resumes/day', outcome: 'Never read a resume manually again - structured data extracted instantly at scale.' },
  // { icon: Users,           color: '#67e8f9', label: 'Candidate Pipeline', desc: 'Drag-and-drop Kanban pipeline with custom stages, tagging, bulk actions, and real-time collaboration.', stat: 'Custom stages',       outcome: 'Every recruiter sees the same live view - no more spreadsheet chaos.' },
  { icon: Mic,             color: '#a78bfa', label: 'AI Interviews',      desc: 'Async video interviews powered by AI. Auto-transcription, sentiment analysis, and structured scoring.', stat: '94% accuracy',        outcome: 'Screen 10× more candidates in the same time with zero interviewer scheduling.' },
  // { icon: LayoutDashboard, color: '#34d399', label: 'Dashboards',         desc: 'Real-time hiring dashboards showing pipeline health, time-to-hire, source analytics, and team KPIs.', stat: 'Real-time',           outcome: 'Spot bottlenecks the moment they appear - not weeks later in a spreadsheet.' },
  // { icon: GitMerge,        color: '#f472b6', label: 'Collaboration',      desc: 'Role-based permissions, @mentions, shared evaluation sheets, and approval chains for your whole team.', stat: 'Unlimited seats',     outcome: 'Hire together - no context lost between recruiter, hiring manager, and interviewer.' },
  // { icon: CalendarCheck,   color: '#fbbf24', label: 'Smart Scheduling',   desc: 'Calendar sync, automated reminder emails, rescheduling flows, and interviewer availability management.', stat: '80% fewer no-shows', outcome: 'Candidates self-book into real slots - no back-and-forth emails ever.' },
  { icon: BarChart3,       color: '#fb923c', label: 'Analytics & Reports', desc: 'Deep-dive into sourcing ROI, diversity metrics, quality-of-hire scores and custom report exports.', stat: '40+ reports',         outcome: 'Prove hiring ROI and DEI progress with data your board can actually read.' },
];

const STATS = [
  { v: '75%', l: 'Reduction in time-to-hire' },
  { v: '80%', l: 'Less manual screening' },
  { v: '4', l: 'More qualified shortlists' },
  { v: '500+', l: 'Companies using HRXpert' },
];

const INTEGRATIONS = ['LinkedIn', 'Indeed', 'Google Meet', 'Zoom', 'Slack', 'Greenhouse', 'Workday', 'Google Calendar', 'Outlook'];

const FEATURES = [
  { icon: Zap,         color: '#fbbf24', title: 'Setup in under 15 minutes', body: 'Connect your ATS, import existing jobs, and start posting with AI-generated descriptions on day one.' },
  { icon: CheckCircle, color: '#34d399', title: 'No per-seat pricing',        body: 'Add your entire hiring team, recruiters, and hiring managers at no extra cost. Prices are per job slot.' },
  { icon: BarChart3,   color: '#818cf8', title: 'SOC 2 & GDPR aligned',       body: 'All candidate data is encrypted, stored in your region, and deletable on request. Full audit logs included.' },
];

function FeatureCard({ feat, delay }: { feat: typeof FEATURES[0]; delay: number }) {
  const ref = useReveal();
  const Icon = feat.icon;
  return (
    <div ref={ref} className="sol-reveal rounded-2xl p-6" style={{ animationDelay: `${delay}ms`, background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <Icon size={20} style={{ color: feat.color }} strokeWidth={1.6} className="mb-3" />
      <h3 className="text-white font-bold text-[14px] mb-2">{feat.title}</h3>
      <p className="text-slate-400 text-[12.5px] leading-relaxed">{feat.body}</p>
    </div>
  );
}

function ModuleCard({ mod, delay }: { mod: typeof MODULES[0]; delay: number }) {
  const ref = useReveal();
  const Icon = mod.icon;
  return (
    <div ref={ref} className="sol-reveal group cursor-default" style={{ animationDelay: `${delay}ms` }}>
      <div className="relative h-full rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 group-hover:-translate-y-1 overflow-hidden"
        style={{ background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: `1px solid ${mod.color}25` }}>
        {/* hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at 30% 20%, ${mod.color}0e, transparent 65%)` }} />
        {/* animated shimmer sweep - unique to solutions */}
        <div className="absolute top-0 left-0 w-1/3 h-full pointer-events-none opacity-0 group-hover:opacity-100"
          style={{ background: `linear-gradient(105deg,transparent 40%,${mod.color}12 50%,transparent 60%)`, animation: 'sol-shine 0.8s ease forwards' }} />
        {/* top flare line - breathing */}
        <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg,transparent,${mod.color},transparent)`, backgroundSize: '200% 100%', animation: `sol-flare ${3 + delay / 500}s ease-in-out infinite` }} />
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}35` }}>
            <Icon size={18} style={{ color: mod.color }} strokeWidth={1.6} />
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: mod.color, background: `${mod.color}15`, border: `1px solid ${mod.color}30` }}>
            {mod.stat}
          </span>
        </div>
        <div>
          <h3 className="text-white font-bold text-[15px] mb-1">{mod.label}</h3>
          <p className="text-slate-400 text-[12.5px] leading-relaxed">{mod.desc}</p>
        </div>
        {/* outcome insight replacing tags */}
        <div className="mt-auto pt-3 flex items-start gap-2" style={{ borderTop: `1px solid ${mod.color}18` }}>
          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: mod.color }} />
          <p className="text-[11.5px] leading-relaxed" style={{ color: mod.color + 'cc' }}>{mod.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  const heroRef = useReveal();
  const statsRef = useReveal();
  const intRef = useReveal();
  const ctaRef = useReveal();

  return (
    <main style={{ background: BG, color: 'white', minHeight: '100vh' }}>
      <style>{KF}</style>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(99,102,241,0.18),transparent 65%)' }} />
        <div ref={heroRef} className="sol-reveal relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
            style={{ color: '#818cf8', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.30)' }}>
            <Sparkles size={12} /> Platform Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Every hiring tool{' '}
            <span style={{ background: 'linear-gradient(90deg,#818cf8,#c084fc,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              in one place
            </span>
          </h1>
          <p className="text-slate-400 text-[16px] max-w-xl mx-auto mb-8 leading-relaxed">
            HRXpert is a unified AI hiring platform  from job creation to signed offer letter. Eight deep modules. Zero switching between tools.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-[13px] group"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#6366f1)', boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}>
              Explore the platform <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 rounded-xl font-semibold text-slate-300 text-[13px] hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
              Watch demo
            </button>
          </div>
        </div>
      </section>

      {/* Workflow flow strip */}
      <div className="relative py-4 mb-2" style={{ borderTop: '1px solid rgba(99,102,241,0.12)', borderBottom: '1px solid rgba(99,102,241,0.12)' }}>
        <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-2 px-6 text-[12px] font-semibold text-slate-400">
          {[
            { label: '📋 Post Job', arrow: false },
            { label: '→', arrow: true },
            { label: '🤖 Parse Resumes', arrow: false },
            { label: '→', arrow: true },
            { label: '📊 Score & Rank', arrow: false },
            { label: '→', arrow: true },
            { label: '🎥 AI Interview', arrow: false },
            { label: '→', arrow: true },
            { label: '📅 Schedule', arrow: false },
            { label: '→', arrow: true },
            { label: '✅ Offer Letter', arrow: false },
          ].map(({ label, arrow }, i) => (
            <span key={i} style={{ color: arrow ? 'rgba(139,92,246,0.6)' : undefined }}>{label}</span>
          ))}
        </div>
      </div>

      {/* Module cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MODULES.map((mod, i) => <ModuleCard key={mod.label} mod={mod} delay={i * 70} />)}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section ref={statsRef} className="sol-reveal py-12 px-4" style={{ background: 'linear-gradient(90deg,rgba(99,102,241,0.08),rgba(124,58,237,0.10),rgba(6,182,212,0.08))' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map(({ v, l }) => (
            <div key={l} className="flex flex-col items-center gap-1">
              <div className="font-black text-[2rem] leading-none" style={{ background: 'linear-gradient(135deg,#818cf8,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
              <div className="text-slate-400 text-[12px]">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section ref={intRef} className="sol-reveal py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-500 text-[11px] uppercase tracking-widest font-bold mb-6">Integrates with your existing stack</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {INTEGRATIONS.map(name => (
              <span key={name} className="px-4 py-2 rounded-xl text-[12px] font-semibold text-slate-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="py-12 px-4" style={{ background: 'linear-gradient(180deg,transparent,rgba(99,102,241,0.06),transparent)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => <FeatureCard key={feat.title} feat={feat} delay={i * 100} />)}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="sol-reveal py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Ready to transform your hiring?</h2>
          <p className="text-slate-400 mb-8 text-[15px]">Start a 14-day free trial. No credit card required.</p>
          <button className="flex items-center gap-2 mx-auto px-8 py-4 rounded-xl font-bold text-white text-[14px] group"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#6366f1)', boxShadow: '0 8px 32px rgba(124,58,237,0.40)' }}>
            Get started free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
