'use client';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Sparkles, Linkedin, Mail, ExternalLink, Heart, Lightbulb, Shield, Users, Zap, Globe } from 'lucide-react';

const BG = '#080c1a';
const KF = `
  @keyframes ab-up       { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ab-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes ab-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ab-pulse    { 0%,100%{opacity:.7} 50%{opacity:1} }
  @keyframes ab-tl-slide { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
  @keyframes ab-tl-pop   { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
  .ab-reveal { opacity:0; }
  .ab-reveal.visible { animation: ab-up .55s ease forwards; }
  .ab-tl { opacity:0; }
  .ab-tl.visible { animation: ab-tl-slide .5s ease forwards; }
  .ab-tl-dot { opacity:0; }
  .ab-tl-dot.visible { animation: ab-tl-pop .45s ease forwards; }
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

const TEAM = [
  {
    name: 'Shehryar Ehsan', role: 'Product Owner', initials: 'SE',
    color: '#818cf8', accent: '#6366f1',
    bio: 'Shapes the product vision and translates business goals into a roadmap that ships. Obsessed with building software people actually want to use.',
    linkedin: '#', mail: 'shehryar@hrxpert.io', github: '#', portfolio: '#',
  },
  {
    name: 'Umar Farooq', role: 'Product Manager', initials: 'UF',
    color: '#c084fc', accent: '#a855f7',
    bio: 'Bridges between users and engineers. Defines requirements, leads sprint planning, and makes sure every feature ships on time and on spec.',
    linkedin: '#', mail: 'umar@hrxpert.io', github: '#', portfolio: '#',
  },
  {
    name: 'Sara Adnan', role: 'AI Engineer', initials: 'SA',
    color: '#67e8f9', accent: '#06b6d4',
    bio: 'Designs and trains the AI models powering resume scoring and structured interviews. Turns raw NLP research into production-ready hiring intelligence.',
    linkedin: '#', mail: 'sara@hrxpert.io', github: '#', portfolio: '#',
  },
  {
    name: 'Jaweria Manahil', role: 'DevOps Engineer', initials: 'JM',
    color: '#34d399', accent: '#10b981',
    bio: 'Keeps the platform fast, secure, and always on. Manages CI/CD pipelines, Kubernetes infra, and everything that lets the team ship with confidence.',
    linkedin: '#', mail: 'jaweria@hrxpert.io', github: '#', portfolio: '#',
  },
];

const TIMELINE = [
  { year: '2023', title: 'The Idea', desc: 'Team met at a hackathon and identified a massive gap in AI-native hiring tools for growing companies.' },
  { year: '2024 Q1', title: 'First Prototype', desc: 'Built the resume parsing and scoring engine. First beta users processed 10,000 resumes in week one.' },
  { year: '2024 Q3', title: 'AI Interviews', desc: 'Launched async video interviews with AI transcription. Adoption grew 300% MoM during launch quarter.' },
  { year: '2025', title: 'Series Seed', desc: 'Closed seed funding with 200+ paying customers and expanded the team to 12 across 3 countries.' },
  { year: '2026', title: 'Platform Expansion', desc: 'Launched full workforce analytics, offer management, and enterprise SSO. Now serving 500+ companies.' },
];

const VALUES = [
  { icon: Heart, color: '#f472b6', title: 'Candidate-first', body: 'Great hiring experiences attract great people. We design for candidates as much as recruiters.' },
  { icon: Lightbulb, color: '#fbbf24', title: 'Bold by default', body: 'We ship ambitious features, iterate quickly, and are never satisfied with "good enough".' },
  { icon: Shield, color: '#34d399', title: 'Privacy as a right', body: 'Candidate data belongs to candidates. We make compliance automatic, not optional.' },
  { icon: Users, color: '#818cf8', title: 'Team over ego', body: 'The best hiring platform is built collaboratively  across disciplines, time zones, and backgrounds.' },
  { icon: Zap, color: '#c084fc', title: 'Speed matters', body: 'Hiring decisions have real consequences. We relentlessly reduce time-to-hire without cutting corners.' },
  { icon: Globe, color: '#67e8f9', title: 'Global by design', body: 'Built for teams hiring across borders. Multi-language, multi-currency, multi-timezone from day one.' },
];

function TeamCard({ member, delay }: { member: typeof TEAM[0]; delay: number }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} className="ab-reveal" style={{ animationDelay: `${delay}ms` }}>
      <div
        className="relative rounded-2xl pb-6 flex flex-col items-center text-center transition-all duration-300"
        style={{
          background: 'linear-gradient(145deg,#111228,#0d0f1e)',
          border: `1px solid ${hovered ? member.color + '55' : member.color + '22'}`,
          transform: hovered ? 'translateY(-7px)' : 'translateY(0)',
          boxShadow: hovered ? `0 24px 48px ${member.color}16` : 'none',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* glow overlay */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse 80% 50% at 50% 0%,${member.color}10,transparent 70%)` }} />

        {/* Avatar band at top */}
        <div className="w-full flex flex-col items-center pt-8 pb-5 px-6" style={{ borderBottom: `1px solid ${member.color}18` }}>
          {/* Avatar circle with spinning gradient ring */}
          <div className="relative w-28 h-28 mb-4">
            {/* spinning ring */}
            <div className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${member.color},${member.accent},${member.color}44,${member.accent},${member.color})`,
                animation: hovered ? 'ab-spin 2.5s linear infinite' : undefined,
                opacity: hovered ? 1 : 0.35,
                transition: 'opacity 0.4s',
                padding: '3px',
              }} />
            {/* inner circle */}
            <div className="absolute inset-[3px] rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg,#1a1a3e,#0d0f1e)`, border: `1px solid ${member.color}30` }}>
              {/* placeholder image area — swap src later */}
              <span className="font-black text-[1.6rem] select-none" style={{ color: member.color }}>
                {member.initials}
              </span>
            </div>
          </div>
          <div className="text-white font-bold text-[16px] leading-tight">{member.name}</div>
          <div className="text-[12px] font-semibold mt-1" style={{ color: member.color }}>{member.role}</div>
        </div>

        {/* Body */}
        <div className="px-6 pt-4 flex flex-col gap-4 w-full">
          <p className="text-slate-400 text-[12.5px] leading-relaxed">{member.bio}</p>

          {/* Social + Portfolio links */}
          <div className="flex justify-center gap-2.5">
            {[
              { icon: Linkedin,     href: member.linkedin, label: 'LinkedIn' },
              { icon: Mail,         href: `mailto:${member.mail}`, label: 'Email' },
              { icon: ExternalLink, href: member.portfolio ?? '#', label: 'Portfolio' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} title={label}
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ border: `1px solid ${hovered ? member.color + '40' : 'rgba(255,255,255,0.09)'}`, background: hovered ? `${member.color}10` : 'rgba(255,255,255,0.03)' }}>
                <Icon size={13} style={{ color: hovered ? member.color : '#64748b' }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ item, delay }: { item: typeof TIMELINE[0]; delay: number }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targets = [lineRef.current, dotRef.current].filter(Boolean) as HTMLDivElement[];
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        targets.forEach((t, i) => {
          setTimeout(() => { t.classList.add('visible'); }, i * 80);
        });
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    if (lineRef.current) obs.observe(lineRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="relative flex gap-6 items-start pl-14">
      <div ref={dotRef} className="ab-tl-dot absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-[9px] font-extrabold flex-shrink-0"
        style={{ animationDelay: `${delay + 60}ms`, background: 'linear-gradient(135deg,#1a1040,#1a1a3e)', border: '2px solid rgba(99,102,241,0.55)', color: '#818cf8', zIndex: 1 }}>
        {item.year.replace(/\s+Q\d/, '')}
      </div>
      <div ref={lineRef} className="ab-tl rounded-xl p-4 flex-1" style={{ animationDelay: `${delay}ms`, background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: '1px solid rgba(99,102,241,0.14)' }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-bold text-[14px]">{item.title}</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-indigo-400 bg-indigo-900/30">{item.year}</span>
        </div>
        <p className="text-slate-400 text-[12.5px] leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  const heroRef = useReveal();
  const missionRef = useReveal();
  const statsRef = useReveal();
  const valuesRef = useReveal();
  const ctaRef = useReveal();

  return (
    <main style={{ background: BG, color: 'white', minHeight: '100vh' }}>
      <style>{KF}</style>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(124,58,237,0.16),transparent 65%)' }} />
        <div ref={heroRef} className="ab-reveal relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
            style={{ color: '#818cf8', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.30)' }}>
            <Sparkles size={12} /> About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            We are building the{' '}
            <span style={{ background: 'linear-gradient(90deg,#818cf8,#c084fc,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              future of hiring
            </span>
          </h1>
          <p className="text-slate-400 text-[16px] max-w-2xl mx-auto leading-relaxed">
            HRXpert was born from a simple frustration  hiring is too slow, too biased, and too manual. We are a small team with a big mission: make hiring intelligent, fast, and fair for every team on earth.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="ab-reveal py-12 px-4" style={{ background: 'linear-gradient(90deg,rgba(99,102,241,0.07),rgba(124,58,237,0.09),rgba(6,182,212,0.07))' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { v: '500+', l: 'Companies hiring on HRXpert' },
            { v: '50K+', l: 'Resumes processed / month' },
            { v: '94%', l: 'AI scoring accuracy' },
          ].map(({ v, l }) => (
            <div key={l} className="flex flex-col items-center gap-1">
              <div className="font-black text-[2rem] leading-none" style={{ background: 'linear-gradient(135deg,#818cf8,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
              <div className="text-slate-400 text-[12px]">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="ab-reveal py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Mission', color: '#818cf8', body: 'To eliminate the friction, bias, and inefficiency from hiring  so every team can find the right person faster, and every candidate gets a fair shot.' },
            { label: 'Vision', color: '#67e8f9', body: 'A world where hiring is intelligent enough to match the right human to the right role every time  no matter where in the world they are or what their background looks like.' },
          ].map(({ label, color, body }) => (
            <div key={label} className="rounded-2xl p-7" style={{ background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: `1px solid ${color}25` }}>
              <div className="text-[11px] font-extrabold tracking-widest uppercase mb-3" style={{ color }}>{label}</div>
              <p className="text-slate-300 text-[14px] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[1.8rem] font-extrabold text-white mb-2">The team behind HRXpert</h2>
            <p className="text-slate-500 text-[13px]">Small team. Big ideas. Hover to learn more.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => <TeamCard key={member.name} member={member} delay={i * 100} />)}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(180deg,#080c1a,#0c0e20 50%,#080c1a)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[1.8rem] font-extrabold text-white mb-2">Our journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg,rgba(99,102,241,0.6),rgba(168,85,247,0.6),rgba(6,182,212,0.3))' }} />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <TimelineItem key={i} item={item} delay={i * 120} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="ab-reveal py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[1.8rem] font-extrabold text-white mb-2">What we believe in</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, color, title, body }, i) => (
              <div key={i} className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: `1px solid ${color}20` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon size={15} style={{ color }} strokeWidth={1.7} />
                </div>
                <h3 className="text-white font-bold text-[14px] mb-1.5">{title}</h3>
                <p className="text-slate-400 text-[12.5px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="ab-reveal py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4">Want to work with us?</h2>
          <p className="text-slate-400 mb-8 text-[15px]">We are always looking for people who care deeply about building great software and even greater hiring experiences.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white text-[14px] group"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#6366f1)', boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}>
              View open roles <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-7 py-3.5 rounded-xl font-semibold text-slate-300 text-[14px] hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
              Contact us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
