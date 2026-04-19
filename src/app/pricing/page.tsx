'use client';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, X, Star, Zap, Crown, Sparkles, ArrowRight, ChevronDown, Users, BarChart3, Shield, Rocket, LucideIcon } from 'lucide-react';

const BG = '#080c1a';
const KF = `
  @keyframes pr-up   { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pr-glow { 0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,0)} 50%{box-shadow:0 0 36px 4px rgba(124,58,237,0.22)} }
  .pr-reveal { opacity:0; }
  .pr-reveal.visible { animation: pr-up .55s ease forwards; }
  .faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease;
    opacity: 0;
  }
  .faq-body.open {
    grid-template-rows: 1fr;
    opacity: 1;
  }
  .faq-inner { overflow: hidden; }
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

interface PlanFeature { t: string; inc: boolean; }
interface Plan {
  name: string; icon: LucideIcon; color: string;
  monthly: number | null; annual: number | null;
  subtitle: string; features: PlanFeature[];
  cta: string; popular: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Hero', icon: Zap, color: '#818cf8', monthly: 75, annual: 63,
    subtitle: 'Hiring essentials for small teams',
    features: [
      { t: '3 active jobs (+$9/job/mo)', inc: true },
      { t: 'AI job description writer', inc: true },
      { t: 'Multi-channel job posting', inc: true },
      { t: 'Basic candidate pipeline', inc: true },
      { t: 'Resume parsing (50/mo)', inc: true },
      { t: 'AI resume scoring', inc: false },
      { t: 'AI-powered interviews', inc: false },
      { t: 'Analytics dashboard', inc: false },
      { t: 'Approval workflows', inc: false },
      { t: 'Dedicated account manager', inc: false },
    ],
    cta: 'Start free trial', popular: false,
  },
  {
    name: 'Plus', icon: Star, color: '#c084fc', monthly: 269, annual: 227,
    subtitle: 'Scale your hiring smarter and faster',
    features: [
      { t: '200 active jobs included', inc: true },
      { t: 'AI job description writer', inc: true },
      { t: 'Multi-channel job posting', inc: true },
      { t: 'Advanced pipeline & CRM', inc: true },
      { t: 'Unlimited resume parsing & scoring', inc: true },
      { t: 'AI-powered interviews', inc: true },
      { t: 'Analytics dashboard', inc: true },
      { t: 'Approval workflows', inc: true },
      { t: 'Team collaboration tools', inc: true },
      { t: 'Dedicated account manager', inc: false },
    ],
    cta: 'Start free trial', popular: true,
  },
  {
    name: 'Pro', icon: Crown, color: '#67e8f9', monthly: null, annual: null,
    subtitle: 'Enterprise-grade, custom-priced',
    features: [
      { t: 'Unlimited active jobs', inc: true },
      { t: 'AI job description writer', inc: true },
      { t: 'Multi-channel job posting', inc: true },
      { t: 'Advanced pipeline & CRM', inc: true },
      { t: 'Unlimited resume parsing & scoring', inc: true },
      { t: 'AI-powered interviews (unlimited)', inc: true },
      { t: 'Custom analytics & reports', inc: true },
      { t: 'Custom approval workflows', inc: true },
      { t: 'eSignature & offer letters', inc: true },
      { t: 'Dedicated account manager', inc: true },
    ],
    cta: 'Contact Sales', popular: false,
  },
];

const FEATURES_TABLE = [
  { category: 'Core', items: [
    { name: 'Active job postings', hero: '3', plus: '200', pro: 'Unlimited' },
    { name: 'Team members', hero: '3', plus: '15', pro: 'Unlimited' },
    { name: 'Multi-channel posting', hero: true, plus: true, pro: true },
  ]},
  { category: 'AI', items: [
    { name: 'Resume parsing', hero: '50/mo', plus: 'Unlimited', pro: 'Unlimited' },
    { name: 'AI scoring & ranking', hero: false, plus: true, pro: true },
    { name: 'AI-powered interviews', hero: false, plus: true, pro: true },
    { name: 'Sentiment analysis', hero: false, plus: true, pro: true },
  ]},
  { category: 'Analytics', items: [
    { name: 'Basic pipeline view', hero: true, plus: true, pro: true },
    { name: 'Analytics dashboard', hero: false, plus: true, pro: true },
    { name: 'Custom report builder', hero: false, plus: false, pro: true },
    { name: 'DEI metrics', hero: false, plus: true, pro: true },
  ]},
  { category: 'Compliance', items: [
    { name: 'GDPR-aligned policies', hero: true, plus: true, pro: true },
    { name: 'Audit logs', hero: false, plus: true, pro: true },
    { name: 'Role-based permissions', hero: 'Basic', plus: true, pro: 'Advanced' },
    { name: 'SSO / SAML', hero: false, plus: false, pro: true },
  ]},
];

const FAQ_ITEMS = [
  { q: 'Is there a free trial?',            a: 'Yes - 14 days free on Hero and Plus, no credit card required. Cancel anytime.' },
  { q: 'Can I switch plans later?',          a: 'Absolutely. Upgrade or downgrade at any time from billing settings. Prorated charges apply.' },
  { q: 'How does the $9/job add-on work?',   a: 'On Hero, 3 base job slots are included. Extra active slots cost $9 per slot per month.' },
  { q: 'What payment methods are accepted?', a: 'All major credit/debit cards. Enterprise invoicing is available on Pro.' },
  { q: 'Is candidate data secure?',          a: 'All data is encrypted at rest and in transit, GDPR-aligned, with full audit logs on Plus and Pro.' },
  { q: 'What counts as an AI interview?',    a: 'Each candidate sent a structured async video interview session counts as one. Plus includes 500/mo; Pro is unlimited.' },
];

type CellValue = boolean | string;
function CellVal({ v }: { v: CellValue }) {
  if (v === true)  return <span style={{ color: '#10b981' }} className="font-bold">✓</span>;
  if (v === false) return <span style={{ color: '#334155' }}>✕</span>;
  return <span style={{ color: '#94a3b8' }} className="text-[12px]">{v}</span>;
}

function PlanCard({ plan, annual, delay }: { plan: Plan; annual: boolean; delay: number }) {
  const ref = useReveal();
  const Icon = plan.icon;
  const price = annual ? plan.annual : plan.monthly;
  return (
    <div ref={ref} className="pr-reveal" style={{ animationDelay: `${delay}ms` }}>
      <div className="relative rounded-2xl p-7 flex flex-col gap-5 h-full"
        style={{
          background: plan.popular ? 'linear-gradient(145deg,#171040,#140e35)' : 'linear-gradient(145deg,#111228,#0d0f1e)',
          border: `1px solid ${plan.popular ? plan.color + '50' : plan.color + '28'}`,
          animation: plan.popular ? 'pr-glow 4s ease-in-out infinite' : undefined,
          transition: 'transform 0.3s',
        }}>
        <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(to right,transparent,${plan.color}65,transparent)` }} />
        {plan.popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-extrabold tracking-widest uppercase px-3.5 py-1 rounded-full whitespace-nowrap"
            style={{ background: `linear-gradient(135deg,${plan.color},#818cf8)`, color: '#0d0f1e' }}>
            Most Popular
          </div>
        )}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}40` }}>
            <Icon size={16} style={{ color: plan.color }} strokeWidth={1.7} />
          </div>
          <div>
            <div className="text-white font-extrabold text-[17px]">{plan.name}</div>
            <p className="text-slate-500 text-[11px] leading-tight">{plan.subtitle}</p>
          </div>
        </div>
        <div>
          {price !== null ? (
            <div className="flex items-baseline gap-1">
              <span className="font-black text-[2.4rem] leading-none text-white">${price}</span>
              <span className="text-slate-500 text-[13px]">/ month</span>
            </div>
          ) : (
            <div className="font-black text-[1.7rem] text-white">Custom pricing</div>
          )}
          {annual && price && <div className="text-emerald-400 text-[11.5px] mt-0.5">Saving 16% vs monthly</div>}
        </div>
        <button className="w-full py-3 rounded-xl font-bold text-[13px] transition-all"
          style={plan.popular
            ? { background: `linear-gradient(135deg,${plan.color},#818cf8)`, color: '#0d0f1e', boxShadow: `0 8px 24px ${plan.color}30` }
            : { background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}>
          {plan.cta}
        </button>
        <ul className="space-y-2.5">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[12.5px]" style={{ color: f.inc ? '#cbd5e1' : '#475569' }}>
              {f.inc ? <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} /> : <X size={12} className="mt-0.5 flex-shrink-0" style={{ color: '#374151' }} />}
              {f.t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pr-reveal">
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: `1px solid ${open ? 'rgba(99,102,241,0.40)' : 'rgba(99,102,241,0.18)'}`,
          background: 'linear-gradient(145deg,#111228,#0d0f1e)',
          transition: 'border-color 0.3s ease',
        }}
      >
        <button
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
          onClick={onToggle}
        >
          <span className="text-white font-semibold text-[14px]">{q}</span>
          <ChevronDown
            size={15}
            className="text-slate-400 flex-shrink-0 ml-4"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        </button>

        {/* Smooth height + fade via CSS grid trick */}
        <div className={`faq-body${open ? ' open' : ''}`}>
          <div className="faq-inner">
            <div
              className="px-5 pt-3 pb-5 text-slate-400 text-[13px] leading-relaxed"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              {a}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useReveal();

  return (
    <main style={{ background: BG, color: 'white', minHeight: '100vh' }}>
      <style>{KF}</style>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 55% at 50% 0%,rgba(124,58,237,0.16),transparent 65%)' }} />
        <div ref={heroRef} className="pr-reveal relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
            style={{ color: '#c084fc', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.30)' }}>
            <Sparkles size={12} /> Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Simple pricing,{' '}
            <span style={{ background: 'linear-gradient(90deg,#c084fc,#818cf8,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              serious results
            </span>
          </h1>
          <p className="text-slate-400 text-[16px] max-w-xl mx-auto mb-10 leading-relaxed">
            No hidden fees. No per-user surprises. Flat plans that include everything your team needs.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
            <button onClick={() => setAnnual(false)} className={`text-[13px] font-semibold px-3 py-1 rounded-full transition-all ${!annual ? 'text-white bg-indigo-600' : 'text-slate-400'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)}  className={`text-[13px] font-semibold px-3 py-1 rounded-full transition-all ${annual  ? 'text-white bg-indigo-600' : 'text-slate-400'}`}>Annual</button>
            {annual && <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/15 px-2 py-0.5 rounded-full">Save 16%</span>}
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, idx) => <PlanCard key={plan.name} plan={plan} annual={annual} delay={idx * 100} />)}
        </div>
      </section>

      {/* Trust strip */}
      <div style={{ borderTop: '1px solid rgba(99,102,241,0.12)', borderBottom: '1px solid rgba(99,102,241,0.12)' }}>
        <div className="max-w-5xl mx-auto px-4 py-9 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {([
            { I: Shield,    c: '#10b981', v: 'GDPR',    l: 'Compliant by default' },
            { I: Rocket,    c: '#818cf8', v: '<15 min', l: 'Setup time' },
            { I: Users,     c: '#06b6d4', v: '500+',    l: 'Companies trust us' },
            { I: BarChart3, c: '#a855f7', v: '99.9%',   l: 'Uptime SLA' },
          ] as const).map(({ I, c, v, l }, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <I size={18} style={{ color: c }} strokeWidth={1.5} className="mb-1" />
              <div className="font-extrabold text-[1.2rem] text-white">{v}</div>
              <div className="text-slate-500 text-[11.5px]">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature comparison */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(180deg,#080c1a,#0c0e20 50%,#080c1a)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[1.75rem] font-extrabold text-white mb-2">Full feature comparison</h2>
            <p className="text-slate-400 text-[14px]">See exactly what is included at every tier.</p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.20)', background: 'linear-gradient(145deg,#111228,#0d0f1e)' }}>
            <div className="grid grid-cols-4 px-6 py-3 text-[11px] font-extrabold uppercase tracking-widest"
              style={{ borderBottom: '1px solid rgba(99,102,241,0.15)', background: 'rgba(99,102,241,0.06)' }}>
              <div className="text-slate-400">Feature</div>
              {PLANS.map(p => <div key={p.name} className="text-center" style={{ color: p.color }}>{p.name}</div>)}
            </div>
            {FEATURES_TABLE.map(({ category, items }) => (
              <React.Fragment key={category}>
                <div className="px-6 py-2 text-[10px] font-extrabold tracking-widest uppercase text-slate-600"
                  style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  {category}
                </div>
                {items.map(({ name, hero, plus, pro }, i) => (
                  <div key={i} className="grid grid-cols-4 px-6 py-3 items-center"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.03)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : undefined }}>
                    <div className="text-slate-300 text-[13px]">{name}</div>
                    <div className="text-center"><CellVal v={hero} /></div>
                    <div className="text-center"><CellVal v={plus} /></div>
                    <div className="text-center"><CellVal v={pro} /></div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[1.75rem] font-extrabold text-white mb-2">Frequently asked questions</h2>
            <p className="text-slate-400 text-[14px]">Everything you need to know before signing up.</p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <FaqItem key={i} q={q} a={a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%,rgba(124,58,237,0.14),transparent 70%)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4">Start hiring smarter today</h2>
          <p className="text-slate-400 mb-8 text-[15px]">14-day free trial on any plan. No credit card required.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white text-[14px] group"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#6366f1)', boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}>
              Start Free Trial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-7 py-3.5 rounded-xl font-semibold text-slate-300 text-[14px] hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
