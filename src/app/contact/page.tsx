'use client';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowRight, Sparkles, Linkedin, Twitter, Github, ChevronDown, Check } from 'lucide-react';

const BG = '#080c1a';
const KF = `
  @keyframes ct-up   { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ct-ping { 0%{transform:scale(1);opacity:.8} 80%,100%{transform:scale(2.2);opacity:0} }
  @keyframes dd-open { from{opacity:0;transform:translateY(-6px) scaleY(0.96)} to{opacity:1;transform:translateY(0) scaleY(1)} }
  .ct-reveal { opacity:0; }
  .ct-reveal.visible { animation: ct-up .55s ease forwards; }
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

const INFO_CARDS = [
  { icon: Mail,    color: '#818cf8', label: 'Email us',      value: 'hello@hrxpert.io',   sub: 'We reply within 4 hours' },
  { icon: Phone,   color: '#67e8f9', label: 'Call us',       value: '+1 (800) 472-9378',  sub: 'Mon–Fri, 9am–6pm EST' },
  { icon: MapPin,  color: '#c084fc', label: 'Location',      value: 'NUST, Pakistan',      sub: 'National University of Sciences & Technology' },
  { icon: Clock,   color: '#34d399', label: 'Response time', value: '< 4 hours',           sub: 'On working days' },
];

const SUBJECTS = ['General inquiry', 'Sales / Pricing', 'Technical support', 'Partnership', 'Press / Media', 'Other'];

// Accent colors for each subject option
const SUBJECT_COLORS = ['#818cf8', '#67e8f9', '#c084fc', '#34d399', '#fbbf24', '#f87171'];

// Custom dropdown component
function SubjectDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedIndex = SUBJECTS.indexOf(value);
  const selectedColor = selectedIndex >= 0 ? SUBJECT_COLORS[selectedIndex] : '#6366f1';

  return (
    <div ref={ref} style={{ position: 'relative', userSelect: 'none' }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: open ? 'rgba(99,102,241,0.10)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${open ? 'rgba(99,102,241,0.55)' : 'rgba(99,102,241,0.22)'}`,
          borderRadius: '10px',
          padding: '10px 14px',
          color: value ? 'white' : 'rgba(148,163,184,0.7)',
          fontSize: '13px',
          cursor: 'pointer',
          outline: 'none',
          transition: 'border-color 0.2s, background 0.2s',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {value && (
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: selectedColor, flexShrink: 0,
              boxShadow: `0 0 6px ${selectedColor}`,
            }} />
          )}
          {value || 'Select a subject'}
        </span>
        <ChevronDown
          size={14}
          style={{
            color: '#6366f1',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'linear-gradient(145deg,#13163a,#0d0f24)',
          border: '1px solid rgba(99,102,241,0.35)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.10)',
          animation: 'dd-open 0.18s ease forwards',
          transformOrigin: 'top',
        }}>
          {/* Header strip */}
          <div style={{
            padding: '8px 14px 6px',
            borderBottom: '1px solid rgba(99,102,241,0.12)',
            color: 'rgba(148,163,184,0.6)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Select a subject
          </div>

          {SUBJECTS.map((s, i) => {
            const isSelected = value === s;
            const color = SUBJECT_COLORS[i];
            return (
              <button
                key={s}
                type="button"
                onClick={() => { onChange(s); setOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 14px',
                  background: isSelected
                    ? `linear-gradient(90deg,${color}18,transparent)`
                    : 'transparent',
                  border: 'none',
                  borderLeft: isSelected ? `2px solid ${color}` : '2px solid transparent',
                  color: isSelected ? 'white' : 'rgba(203,213,225,0.85)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.background = `rgba(99,102,241,0.08)`;
                    (e.currentTarget as HTMLButtonElement).style.color = 'white';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(203,213,225,0.85)';
                  }
                }}
              >
                {/* Color dot */}
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: color, flexShrink: 0,
                  boxShadow: isSelected ? `0 0 8px ${color}` : 'none',
                  opacity: isSelected ? 1 : 0.55,
                  transition: 'box-shadow 0.15s, opacity 0.15s',
                }} />
                <span style={{ flex: 1 }}>{s}</span>
                {isSelected && <Check size={12} style={{ color, flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const heroRef = useReveal();
  const formRef = useReveal();

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.subject) return; // subject required
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(99,102,241,0.22)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: 'white',
    fontSize: '13px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
    colorScheme: 'dark',
  };

  return (
    <main style={{ background: BG, color: 'white', minHeight: '100vh' }}>
      <style>{KF}</style>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-14 px-4 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(99,102,241,0.16),transparent 65%)' }} />
        <div ref={heroRef} className="ct-reveal relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
            style={{ color: '#818cf8', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.30)' }}>
            <Sparkles size={12} /> Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Let{'\u2019'}s{' '}
            <span style={{ background: 'linear-gradient(90deg,#818cf8,#c084fc,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              talk hiring
            </span>
          </h1>
          <p className="text-slate-400 text-[15px] leading-relaxed">
            Whether you have a question about pricing, need a demo, or just want to say hello — our team is here and ready to help.
          </p>
        </div>
      </section>

      {/* Info cards */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INFO_CARDS.map(({ icon: Icon, color, label, value, sub }, i) => (
            <div key={i} className="rounded-xl p-5 flex gap-3 items-start" style={{ background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: `1px solid ${color}22` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={15} style={{ color }} strokeWidth={1.6} />
              </div>
              <div>
                <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">{label}</div>
                <div className="text-white font-semibold text-[12.5px] mt-0.5">{value}</div>
                <div className="text-slate-500 text-[11px]">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left sidebar */}
          <div ref={formRef} className="ct-reveal lg:col-span-2 space-y-6">
            <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: '1px solid rgba(99,102,241,0.18)' }}>
              <h3 className="text-white font-bold text-[15px] mb-4">How we can help</h3>
              <ul className="space-y-3">
                {[
                  { color: '#818cf8', t: 'Book a personalised product demo' },
                  { color: '#c084fc', t: 'Get a custom pricing quote for your team' },
                  { color: '#67e8f9', t: 'Technical questions about integrations' },
                  { color: '#34d399', t: 'Explore partnership opportunities' },
                  { color: '#fbbf24', t: 'Press, media, or speaking requests' },
                ].map(({ color, t }, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] text-slate-300">
                    <ArrowRight size={13} style={{ color, marginTop: 2, flexShrink: 0 }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-6 space-y-4" style={{ background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: '1px solid rgba(99,102,241,0.18)' }}>
              <div className="flex items-center gap-2">
                <div className="relative w-2.5 h-2.5">
                  <div className="absolute inset-0 rounded-full bg-emerald-400" style={{ animation: 'ct-ping 1.8s ease infinite' }} />
                  <div className="relative w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-emerald-400 text-[12px] font-semibold">We are online right now</span>
              </div>
              <p className="text-slate-400 text-[12.5px]">Typical response time is under 4 hours on working days. For urgent matters call us directly.</p>
              <div className="flex items-center gap-3 pt-1">
                {[Linkedin, Twitter, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                    style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
                    <Icon size={13} className="text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-7" style={{ background: 'linear-gradient(145deg,#111228,#0d0f1e)', border: '1px solid rgba(99,102,241,0.20)' }}>
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-white font-bold text-[16px] mb-2">Send us a message</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1.5">First name</label>
                      <input name="firstName" required style={inputStyle} value={form.firstName} onChange={handleChange} placeholder="Umar" />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1.5">Last name</label>
                      <input name="lastName" required style={inputStyle} value={form.lastName} onChange={handleChange} placeholder="Farooq" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1.5">Work email</label>
                    <input name="email" type="email" required style={inputStyle} value={form.email} onChange={handleChange} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1.5">Company (optional)</label>
                    <input name="company" style={inputStyle} value={form.company} onChange={handleChange} placeholder="Acme Corp" />
                  </div>

                  {/* ✅ Custom dark dropdown replaces native <select> */}
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1.5">Subject</label>
                    <SubjectDropdown
                      value={form.subject}
                      onChange={(v) => setForm(f => ({ ...f, subject: v }))}
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1.5">Message</label>
                    <textarea name="message" required rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." />
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white text-[13px] flex items-center justify-center gap-2 group transition-all"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#6366f1)', boxShadow: '0 8px 24px rgba(124,58,237,0.30)' }}>
                    Send message <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.40)' }}>
                    <CheckCircle size={28} className="text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div className="text-white font-bold text-[18px]">Message sent!</div>
                  <p className="text-slate-400 text-[13px] max-w-xs">Thanks for reaching out. We will get back to you within 4 hours on working days.</p>
                  <button onClick={() => setSent(false)} className="text-indigo-400 text-[12px] hover:text-indigo-300 transition-colors mt-2">Send another message</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
