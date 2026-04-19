'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LucideIcon } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface CardData {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Carousel3DProps {
  title: string;
  accent: 'indigo' | 'violet' | string;
  cards: CardData[];
  /** ms per full revolution */
  autoSpeed?: number;
  pauseOnHover?: boolean;
  /** Background colour of the parent section – must match so edge-fade is seamless */
  bgColor?: string;
}

/* ─── Accent palette ─────────────────────────────────────────────────────── */
const ACCENT: Record<string, string> = {
  indigo: '#6366f1',
  violet: '#8b5cf6',
};

/* ─────────────────────────────────────────────────────────────────────────── */
const Carousel3D: React.FC<Carousel3DProps> = ({
  title,
  accent,
  cards,
  autoSpeed = 20000,
  pauseOnHover = true,
  bgColor = '#080c1a',
}) => {
  const n = cards.length;
  const glowColor = ACCENT[accent] ?? '#6366f1';

  /* continuous angle in card-index units */
  const angleRef = useRef(0);
  const [displayAngle, setDisplayAngle] = useState(0);

  const pausedRef     = useRef(false);
  const lastTsRef     = useRef<number | null>(null);
  const rafRef        = useRef<number>(0);
  const draggingRef   = useRef(false);
  const dragStartX    = useRef(0);
  const dragStartAng  = useRef(0);

  /* RAF loop */
  const tick = useCallback((ts: number) => {
    if (!pausedRef.current && !draggingRef.current) {
      if (lastTsRef.current !== null) {
        angleRef.current += ((ts - lastTsRef.current) / autoSpeed) * n;
      }
      lastTsRef.current = ts;
    } else {
      lastTsRef.current = null;
    }
    setDisplayAngle(angleRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [autoSpeed, n]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  /* Pointer drag */
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    dragStartX.current  = e.clientX;
    dragStartAng.current = angleRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    angleRef.current = dragStartAng.current - (e.clientX - dragStartX.current) / 180;
  };
  const onPointerUp = () => { draggingRef.current = false; };

  /* Per-card style computation */
  const SLOT_GAP = 235; // px between card centres
  const VISIBLE  = 2.7; // how many card-widths visible each side

  function getCardProps(i: number) {
    // signed distance from current front, wrapped to [-n/2, n/2]
    const d = ((i - displayAngle) % n + n + n / 2) % n - n / 2;

    const absd  = Math.abs(d);
    // Scale: front=1, d=1→0.83, d=2→0.72 — stays readable
    const scale = Math.max(0.65, 1 - absd * 0.18);
    // Opacity: front=1, d=1→0.90, d=2→0.76 — side cards still clear
    const opacity = Math.max(0, 1 - (absd / VISIBLE) * 0.68);
    // Brightness: gentle drop, min 0.80 keeps text legible
    const brightness = Math.max(0.80, 1 - absd * 0.08);

    return {
      d,
      translateX : d * SLOT_GAP,
      scale,
      zIndex     : Math.round(100 - absd * 20),
      opacity,
      brightness,
      rotateY    : -d * 7,
    };
  }

  return (
    <div className="w-full select-none">

      {/* Section label */}
      <div className="flex items-center gap-3 mb-10 px-1">
        <span
          className="text-[11px] font-bold tracking-[0.22em] uppercase px-3.5 py-1.5 rounded-full border"
          style={{
            color: glowColor,
            borderColor: `${glowColor}55`,
            background: `${glowColor}18`,
          }}
        >
          {title}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(to right, ${glowColor}55, transparent)` }}
        />
      </div>

      {/* Stage — no wrapper box, cards sit directly on section bg */}
      <div
        className="relative w-full cursor-grab active:cursor-grabbing"
        style={{ height: 290, perspective: '1400px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onMouseEnter={() => { if (pauseOnHover) pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {/* Edge fade — matches exact section bg so there's zero "box" border effect */}
        <div
          className="absolute inset-y-0 left-0 w-48 z-50 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${bgColor} 0%, transparent 100%)` }}
        />
        <div
          className="absolute inset-y-0 right-0 w-48 z-50 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${bgColor} 0%, transparent 100%)` }}
        />

        {/* Cards */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {Array.from({ length: n }, (_, i) => {
            const { d, translateX, scale, zIndex, opacity, brightness, rotateY } = getCardProps(i);
            if (opacity < 0.04) return null;

            const card    = cards[i];
            const Icon    = card.icon;
            const isFront = Math.abs(d) < 0.55;

            return (
              <div
                key={i}
                style={{
                  position  : 'absolute',
                  transform : `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  zIndex,
                  opacity,
                  filter    : `brightness(${brightness})`,
                  width     : 248,
                  willChange: 'transform, opacity, filter',
                }}
              >
                <div
                  className="rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden"
                  style={{
                    height    : 272,
                    background: isFront
                      ? `linear-gradient(145deg, #1f1c52 0%, #17173e 100%)`
                      : `linear-gradient(145deg, #141628 0%, #0f1224 100%)`,
                    border    : `1px solid ${isFront ? glowColor + '72' : glowColor + '30'}`,
                    boxShadow : isFront
                      ? `0 0 52px ${glowColor}25, 0 24px 64px rgba(0,0,0,0.55)`
                      : `0 4px 28px rgba(0,0,0,0.35)`,
                  }}
                >
                  {/* Inner glow — front card only */}
                  {isFront && (
                    <div
                      className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${glowColor}45 0%, transparent 70%)`,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${glowColor}38, ${glowColor}12)`,
                      border    : `1px solid ${glowColor}48`,
                    }}
                  >
                    <Icon size={20} style={{ color: glowColor }} strokeWidth={1.7} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1.5">
                    <h3
                      className="font-semibold leading-snug"
                      style={{
                        fontSize: isFront ? 15 : 14,
                        // side cards use near-white for full readability
                        color: isFront ? '#ffffff' : '#dde5f4',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="leading-relaxed line-clamp-4"
                      style={{
                        fontSize: 13,
                        // side card descriptions are slate-300-ish, not slate-500
                        color: isFront ? '#94a3b8' : '#8a9bbf',
                      }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${glowColor}${isFront ? '75' : '40'}, transparent)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-7">
        {cards.map((_, i) => {
          const active = ((i - Math.round(displayAngle)) % n + n) % n === 0;
          return (
            <button
              key={i}
              onClick={() => { angleRef.current = i; }}
              className="rounded-full transition-all duration-500"
              style={{
                width     : active ? 22 : 6,
                height    : 6,
                background: active ? glowColor : '#1e2d42',
                border    : active ? 'none' : '1px solid #2a3f58',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel3D;
