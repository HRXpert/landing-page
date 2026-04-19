'use client';
import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  TrendingUp, Clock, Target, Award, CheckCircle,
  Brain, LineChart, Shield, Globe, ArrowRight, Sparkles
} from 'lucide-react';

const BG = '#080c1a';
const KF = `
  @keyframes why-up  { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
  @keyframes why-bar { from{width:0} to{width:var(--w)} }
  @keyframes why-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,0)} 50%{box-shadow:0 0 0 6px rgba(99,102,241,0.15)} }
  .why-reveal { opacity:0; }
  .why-reveal.visible { animation: why-up .55s ease forwards; }
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

const STATS = [
  { icon: TrendingUp, color: '#818cf8', v: '75%', l: 'Reduction in time-to-fill' },
  { icon: Clock,      color: '#67e8f9', v: '80%', l: 'Less manual screening time' },
  { icon: Target,     color: '#c084fc', v: '94%', l: 'AI interview accuracy' },
  { icon: Award,      color: '#34d399', v: '4',  l: 'More qualified shortlists' },
];

const WHY_SECTIONS = [
  { icon: Brain,     color: '#818cf8', title: 'AI-native by design',          body: 'Built from the ground up with AI  not bolted on. Every step from job description to offer letter uses machine intelligence to reduce human bias and speed up decisions.', bullets: ['GPT-powered JD writing', 'NLP resume extraction', 'AI interview scoring'] },
  { icon: Clock,     color: '#67e8f9', title: 'Decisions in days, not weeks',  body: 'Automated screening, async AI interviews, and smart scheduling collapse a 3-week hiring cycle into days without sacrificing quality.', bullets: ['Async video interviews', 'Auto-screening filters', 'Smart calendar sync'] },
  { icon: Target,    color: '#c084fc', title: 'Objective, bias-reduced scoring', body: "Consistent structured scoring rubrics replace gut-feel shortlisting. Every candidate is evaluated against the same criteria  every time.", bullets: ['Structured eval sheets', 'Blind-mode option', 'Audit trail included'] },
  { icon: LineChart, color: '#fbbf24', title: 'Hiring analytics you can act on', body: 'Live pipeline health, source ROI, time-per-stage, and diversity breakdowns. Know exactly where hiring is stuck before it becomes a problem.', bullets: ['40+ built-in reports', 'Custom dashboards', 'Export to CSV / PDF'] },
  { icon: Shield,    color: '#34d399', title: 'Enterprise-grade security',     body: 'SOC 2 aligned, GDPR-compliant candidate data handling, role-based permissions, and full audit logs. Built for regulated industries.', bullets: ['Role-based access', 'Data residency options', 'Deletion on request'] },
  { icon: Globe,     color: '#f472b6', title: 'Scales with your team',         body: 'From a 2-person startup to a 500-strong enterprise. Flat per-job pricing means your whole team is always included  no per-seat surprises.', bullets: ['Unlimited team members', 'Multi-brand workspaces', 'Priority onboarding'] },
];

const SEGMENTS = [
  { label: 'Startups',          score: 92, note: 'Speed-to-hire under 7 days' },
  { label: 'Growing SMBs',      score: 97, note: 'Scale without adding headcount' },
  { label: 'Enterprises',       score: 88, note: 'Governance and audit-ready' },
  { label: 'Recruiting Firms',  score: 95, note: 'Manage hundreds of roles at once' },
];


function WhyCard({ sec, delay }: { sec: typeof WHY_SECTIONS[0]; delay: number }) {
  const ref = useReveal();
  const Icon = sec.icon;
  return (
    <div ref={ref} className="why-reveal group" style={{ animationDelay: `${delay}ms` }}>
      <div className="relative rounded-2xl p-6 h-full flex flex-col gap-4 transition-all duration-300 group-hover:-translate-y-1"
        style={{ background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: `1px solid ${sec.color}25` }}>
        <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `linear-gradient(to right,transparent,${sec.color}55,transparent)` }} />
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at 25% 15%,${sec.color}0d,transparent 60%)` }} />
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${sec.color}18`, border: `1px solid ${sec.color}35` }}>
          <Icon size={18} style={{ color: sec.color }} strokeWidth={1.6} />
        </div>
        <div>
          <h3 className="text-white font-bold text-[15px] mb-1.5">{sec.title}</h3>
          <p className="text-slate-400 text-[12.5px] leading-relaxed">{sec.body}</p>
        </div>
        <ul className="space-y-1.5 mt-auto">
          {sec.bullets.map(b => (
            <li key={b} className="flex items-center gap-2 text-[12px]" style={{ color: sec.color }}>
              <CheckCircle size={11} strokeWidth={2.5} /> <span className="text-slate-300">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function WhyHRXpertPage() {
  const heroRef = useReveal();
  const statsRef = useReveal();
  const segRef = useReveal();
  const ctaRef = useReveal();

  return (
    <main style={{ background: BG, color: 'white', minHeight: '100vh' }}>
      <style>{KF}</style>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(124,58,237,0.17),transparent 65%)' }} />
        <div ref={heroRef} className="why-reveal relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
            style={{ color: '#c084fc', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.30)' }}>
            <Sparkles size={12} /> Why HRXpert
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Stop losing great candidates{' '}
            <span style={{ background: 'linear-gradient(90deg,#818cf8,#c084fc,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              to slow hiring.
            </span>
          </h1>
          <p className="text-slate-400 text-[16px] max-w-2xl mx-auto leading-relaxed">
            Traditional ATS tools were built for compliance, not for speed. HRXpert replaces a stack of disconnected tools with one AI-native platform built around how modern hiring teams actually work.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="why-reveal py-12 px-4" style={{ background: 'linear-gradient(90deg,rgba(99,102,241,0.07),rgba(124,58,237,0.09),rgba(6,182,212,0.07))' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map(({ icon: Icon, color, v, l }) => (
            <div key={l} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={16} style={{ color }} strokeWidth={1.6} />
              </div>
              <div className="font-black text-[2rem] leading-none text-white">{v}</div>
              <div className="text-slate-400 text-[12px]">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Six why cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[1.7rem] font-extrabold text-white mb-2">Six reasons teams choose HRXpert</h2>
            <p className="text-slate-500 text-[13px]">Not just another ATS.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_SECTIONS.map((sec, i) => <WhyCard key={sec.title} sec={sec} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section ref={segRef} className="why-reveal py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[1.7rem] font-extrabold text-white mb-2">Built for every stage of growth</h2>
          </div>
          <div className="space-y-4">
            {SEGMENTS.map(({ label, score, note }) => (
              <div key={label} className="rounded-xl px-6 py-4 flex items-center gap-4" style={{ background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: '1px solid rgba(99,102,241,0.16)' }}>
                <div className="w-24 flex-shrink-0">
                  <div className="text-white font-bold text-[13px]">{label}</div>
                  <div className="text-slate-500 text-[11px]">{note}</div>
                </div>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, background: 'linear-gradient(90deg,#6366f1,#a855f7)' }} />
                </div>
                <div className="font-black text-[1rem] w-12 text-right" style={{ color: '#818cf8' }}>{score}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="why-reveal py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4">See the difference yourself</h2>
          <p className="text-slate-400 mb-8 text-[15px]">Join 500+ companies hiring faster with HRXpert. 14-day free trial, no card required.</p>
          <button className="flex items-center gap-2.5 mx-auto px-8 py-4 rounded-xl font-bold text-white text-[14px] group"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#6366f1)', boxShadow: '0 8px 32px rgba(124,58,237,0.40)' }}>
            Start free trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}