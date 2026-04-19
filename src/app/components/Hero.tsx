'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

/* ─── Floating particles ─────────────────────────────────────────────────── */
interface Particle {
  id: number; x: number; y: number;
  size: number; duration: number; delay: number; opacity: number;
}

const FloatingParticles: React.FC = () => {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.35 + 0.08,
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-indigo-400"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Animated counter ───────────────────────────────────────────────────── */
interface CounterProps { target: number; suffix: string; label: string; delay: number; }

const AnimatedCounter: React.FC<CounterProps> = ({ target, suffix, label, delay }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        setTimeout(() => {
          let v = 0;
          const step = target / 60;
          const iv = setInterval(() => {
            v += step;
            if (v >= target) { setCount(target); clearInterval(iv); }
            else setCount(Math.floor(v));
          }, 16);
        }, delay);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, delay, started]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[11px] text-indigo-300/65 mt-0.5 font-medium tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
};

/* ─── Hero ───────────────────────────────────────────────────────────────── */
const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-22px) scale(1.25); }
        }
        @keyframes orb-a {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(24px,-16px) scale(1.08); }
          66%     { transform: translate(-16px,20px) scale(0.95); }
        }
        @keyframes orb-b {
          0%,100% { transform: translate(0,0) scale(1); }
          40%     { transform: translate(-20px,16px) scale(1.06); }
          70%     { transform: translate(14px,-12px) scale(0.93); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes slide-up {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes badge-pop {
          0%   { opacity:0; transform:scale(0.82) translateY(8px); }
          70%  { transform:scale(1.04) translateY(-2px); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        .shimmer-text {
          background: linear-gradient(90deg,#818cf8 0%,#c7d2fe 40%,#6366f1 60%,#818cf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .cta-primary { position:relative; overflow:hidden; }
        .cta-primary::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 60%);
          opacity:0; transition:opacity 0.3s;
        }
        .cta-primary:hover::before { opacity:1; }
      `}</style>

      {/*
        KEY CHANGES vs original:
        - Removed min-h-[92vh]  →  height is purely content-driven
        - py-24 lg:py-36  →  py-14 lg:py-20  (much tighter vertical padding)
        - h1 text-5xl…7xl →  text-3xl…5xl   (2 steps smaller)
        - "recruitment intelligence" line text-4xl…6xl → text-2xl…4xl
        - mb-6 on h1 → mb-3, mb-14 on p → mb-8, mb-20 on CTA row → mb-10
        - Orbs repositioned to fit compact layout
      */}
      <section
        data-section="hero"
        className="relative bg-gray-950 overflow-hidden flex flex-col justify-center"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(67,56,202,0.20) 0%, transparent 70%)' }} />

        {/* Orbs — smaller, tighter */}
        <div className="absolute top-8 right-[12%] w-64 h-64 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(99,102,241,0.22) 0%,transparent 70%)', filter:'blur(36px)', animation:'orb-a 18s ease-in-out infinite' }} />
        <div className="absolute bottom-8 left-[10%] w-48 h-48 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(139,92,246,0.20) 0%,transparent 70%)', filter:'blur(30px)', animation:'orb-b 22s ease-in-out infinite' }} />

        <FloatingParticles />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/60 backdrop-blur-sm text-indigo-300 text-xs font-medium mb-6"
            style={{ animation: mounted ? 'badge-pop 0.55s ease forwards' : 'none', opacity: 0 }}
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            AI-Powered Recruitment Platform
            <span className="ml-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Heading — 2 steps smaller, tighter line-height */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-[1.1] tracking-tight"
            style={{ animation: mounted ? 'slide-up 0.7s 0.12s ease both' : 'none', opacity: 0 }}
          >
            <span className="shimmer-text">HRXpert</span>
            {' '}
            <span className="text-white/90">- where automation meets</span>
            <br />
            <span className="text-indigo-200/80 text-2xl sm:text-3xl lg:text-4xl font-semibold">
              recruitment intelligence
            </span>
          </h1>

          {/* Sub-heading */}
          <p
            className="text-base sm:text-lg text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ animation: mounted ? 'slide-up 0.7s 0.28s ease both' : 'none', opacity: 0 }}
          >
            Empowering teams to hire better and faster with intelligent automation,
            seamless workflows, and data-driven insights.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
            style={{ animation: mounted ? 'slide-up 0.7s 0.42s ease both' : 'none', opacity: 0 }}
          >
            <Link href="/signup" passHref legacyBehavior>
              <a className="cta-primary group inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0">
                Get Started Free
                <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Link>

            <button className="group inline-flex items-center gap-2 text-slate-400 hover:text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-950/40 hover:-translate-y-0.5 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
              </span>
              Watch Preview
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 divide-x divide-indigo-500/20 max-w-sm mx-auto"
            style={{ animation: mounted ? 'slide-up 0.7s 0.58s ease both' : 'none', opacity: 0 }}
          >
            <AnimatedCounter target={12000} suffix="+" label="Hires made"   delay={100} />
            <AnimatedCounter target={98}    suffix="%" label="Satisfaction" delay={200} />
            <AnimatedCounter target={3}     suffix="x" label="Faster hiring" delay={300} />
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
      </section>
    </>
  );
};

export default Hero;
