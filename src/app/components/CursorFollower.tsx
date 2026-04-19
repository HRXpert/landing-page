'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─── Per-section dot style ─────────────────────────────────────────────── */
interface DotStyle {
  width     : number;
  height    : number;
  borderRadius: string;
  background  : string;
  boxShadow   : string;
  rotate      : number; // degrees
}

const SECTION_STYLES: Record<string, DotStyle> = {
  hero: {
    width: 10, height: 10,
    borderRadius: '50%',
    background  : 'radial-gradient(circle, #c7d2fe 0%, #6366f1 100%)',
    boxShadow   : '0 0 10px #6366f1cc, 0 0 26px #6366f180, 0 0 48px #6366f138',
    rotate      : 0,
  },
  features: {
    width: 13, height: 13,
    borderRadius: '50%',
    background  : 'radial-gradient(circle, #a5f3fc 0%, #06b6d4 100%)',
    boxShadow   : '0 0 12px #06b6d4cc, 0 0 30px #06b6d478, 0 0 52px #06b6d430',
    rotate      : 0,
  },
  advantages: {
    width: 11, height: 11,
    borderRadius: '3px',          // diamond when rotated 45°
    background  : 'linear-gradient(135deg, #e879f9 0%, #7c3aed 100%)',
    boxShadow   : '0 0 12px #8b5cf6cc, 0 0 28px #8b5cf678, 0 0 48px #8b5cf630',
    rotate      : 45,
  },
  'job-seekers': {
    width: 22, height: 7,
    borderRadius: '9999px',       // pill
    background  : 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)',
    boxShadow   : '0 0 10px #10b98190, 0 0 22px #6366f170',
    rotate      : 0,
  },
  cta: {
    width: 14, height: 14,
    borderRadius: '50%',
    background  : 'radial-gradient(circle, #fde68a 0%, #f59e0b 100%)',
    boxShadow   : '0 0 14px #f59e0bcc, 0 0 32px #f59e0b80, 0 0 56px #f59e0b30',
    rotate      : 0,
  },
  footer: {
    width: 6, height: 6,
    borderRadius: '50%',
    background  : '#475569',
    boxShadow   : '0 0 6px #47556990',
    rotate      : 0,
  },
};

const DEFAULT_STYLE = SECTION_STYLES['hero'];

/* ─── Ring pulse keyframe — injected once ───────────────────────────────── */
const RING_CSS = `
  @keyframes dot-ring {
    0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.55; }
    100% { transform: translate(-50%,-50%) scale(2.8); opacity: 0; }
  }
  .cursor-ring {
    pointer-events: none;
    position: fixed;
    border-radius: 50%;
    border: 1px solid currentColor;
    animation: dot-ring 1.6s ease-out infinite;
    z-index: 9998;
  }
`;

/* ─── Component ─────────────────────────────────────────────────────────── */
const CursorFollower: React.FC = () => {
  const [pos,     setPos]     = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const [style,   setStyle]   = useState<DotStyle>(DEFAULT_STYLE);

  /* We lerp the dot position via RAF for extra-smooth following */
  const targetRef  = useRef({ x: -200, y: -200 });
  const currentRef = useRef({ x: -200, y: -200 });
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const cx = lerp(currentRef.current.x, targetRef.current.x, 0.18);
      const cy = lerp(currentRef.current.y, targetRef.current.y, 0.18);
      currentRef.current = { x: cx, y: cy };
      setPos({ x: cx, y: cy });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* Mouse tracking */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* IntersectionObserver — watch which data-section is ≥50% visible */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (best && best.intersectionRatio > 0.35) {
          const key = (best.target as HTMLElement).dataset.section ?? 'hero';
          setStyle(SECTION_STYLES[key] ?? DEFAULT_STYLE);
        }
      },
      { threshold: [0, 0.35, 0.5, 0.75, 1] }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Ring colour — first stop of background (rough parse) */
  const ringColor = style.background.includes('#')
    ? style.background.match(/#[0-9a-fA-F]{3,8}/)?.[0] ?? '#6366f1'
    : '#6366f1';

  const dotTransform =
    `translate(-50%, -50%) rotate(${style.rotate}deg)`;

  return (
    <>
      <style>{RING_CSS}</style>

      {/* Outer expanding ring */}
      <div
        className="cursor-ring"
        style={{
          left    : pos.x,
          top     : pos.y,
          width   : style.width * 2.5,
          height  : style.height * 2.5,
          color   : ringColor,
          opacity : visible ? 1 : 0,
          transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1), height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.25s',
        }}
      />

      {/* Main dot */}
      <div
        style={{
          pointerEvents: 'none',
          position     : 'fixed',
          left         : pos.x,
          top          : pos.y,
          zIndex       : 9999,
          opacity      : visible ? 1 : 0,
          width        : style.width,
          height       : style.height,
          borderRadius : style.borderRadius,
          background   : style.background,
          boxShadow    : style.boxShadow,
          transform    : dotTransform,
          transition   : [
            'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            'height 0.5s cubic-bezier(0.4,0,0.2,1)',
            'border-radius 0.5s cubic-bezier(0.4,0,0.2,1)',
            'background 0.5s ease',
            'box-shadow 0.5s ease',
            'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            'opacity 0.25s',
          ].join(', '),
        }}
      />
    </>
  );
};

export default CursorFollower;
