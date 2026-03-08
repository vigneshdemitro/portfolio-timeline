import type { Metadata } from 'next';
import {
  GraduationCap, Code2, Layers, Star, PencilRuler,
  Ruler, Zap, Terminal, Award,
} from 'lucide-react';
import { getTimelineData } from './lib/timeline-data';
import { TimelineItem } from './components/TimelineItem';
import { ScrollReveal } from './components/ScrollReveal';
import { BackToTop } from './components/BackToTop';
import type { TimelineEntry } from './types';

// Icon map lives here now — page owns dot rendering
const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Code2, Layers, Star, PencilRuler,
  Ruler, Zap, Terminal, Award,
};

// Dot config — gradient bg via inline style, ring glow per type
const dotConfig = {
  work:      { dot: 'bg-gradient-to-br from-indigo-400 to-blue-500',   ring: 'ring-indigo-500/30',   shadow: 'shadow-indigo-500/40'  },
  education: { dot: 'bg-gradient-to-br from-violet-400 to-purple-600', ring: 'ring-violet-500/30',   shadow: 'shadow-violet-500/40'  },
  milestone: { dot: 'bg-gradient-to-br from-amber-300 to-orange-500',  ring: 'ring-amber-500/30',    shadow: 'shadow-amber-500/40'   },
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTimelineData();
  return {
    title: data.meta.siteTitle,
    description: data.meta.siteDescription,
  };
}

function isCurrentRole(entry: TimelineEntry): boolean {
  return (
    entry.type === 'work' &&
    Array.isArray(entry.positions) &&
    entry.positions[entry.positions.length - 1]?.endDate === null
  );
}

export default async function TimelinePage() {
  const data = await getTimelineData();
  const { meta } = data;

  const entries = [...data.timeline].reverse();

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="mb-16 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8 tracking-wider backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Professional Journey
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5 bg-gradient-to-r from-indigo-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
            Career Timeline
          </h1>
          <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">{meta.siteDescription}</p>
        </div>

        {/* ── Stats — minimal bold numbers ───────────────── */}
        <ScrollReveal direction="up" delay={100}>
          {(() => {
            const currentYear = new Date().getFullYear();
            const totalYears = currentYear - meta.careerStartYear;
            const itYears    = currentYear - meta.softwareCareerStartYear;
            return (
              <div className="flex items-center justify-center gap-10 mb-20">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent leading-none">
                    {totalYears}<span className="text-3xl">+</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2 uppercase tracking-widest">Years experience</div>
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent leading-none">
                    {itYears}<span className="text-3xl">+</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2 uppercase tracking-widest">Years in software</div>
                </div>
              </div>
            );
          })()}
        </ScrollReveal>

        {/* ── Zig-zag Timeline ───────────────────────────── */}
        <div className="relative">

          {/* Center spine — desktop only */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px spine-gradient opacity-60" />

          {/* Left spine — mobile only */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px spine-gradient opacity-60" />

          <div className="space-y-8">
            {entries.map((entry, i) => {
              const isLeft = i % 2 === 0;
              const config = dotConfig[entry.type];
              const Icon = iconMap[entry.icon] ?? Code2;
              const active = isCurrentRole(entry);

              return (
                <ScrollReveal
                  key={entry.id}
                  direction={isLeft ? 'left' : 'right'}
                  delay={i * 40}
                >
                  <div className="relative">

                    {/* ── MOBILE: single column left-aligned ── */}
                    <div className="md:hidden pl-12">
                      <div className={`absolute left-0.5 top-3 w-7 h-7 rounded-full ${config.dot} ring-4 ${config.ring} shadow-lg ${config.shadow} flex items-center justify-center ${active ? 'dot-active' : ''}`}>
                        <Icon size={13} className="text-white drop-shadow" />
                      </div>
                      <TimelineItem entry={entry} isActive={active} />
                    </div>

                    {/* ── DESKTOP: zig-zag alternating ──────── */}
                    {/*
                      Layout: [card (50%)] [dot (4rem)] [empty (50%)]
                      or reversed: [empty (50%)] [dot (4rem)] [card (50%)]
                      flex-row-reverse handles the flip cleanly.
                    */}
                    <div className={`hidden md:flex items-start ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>

                      {/* Card — always on the "active" side */}
                      <div className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-8' : 'pl-8'}`}>
                        <TimelineItem entry={entry} isActive={active} />
                      </div>

                      {/* Center dot — sits on the spine */}
                      <div className="w-16 flex justify-center items-start pt-5 shrink-0">
                        <div className={`w-9 h-9 rounded-full ${config.dot} ring-4 ${config.ring} shadow-lg ${config.shadow} flex items-center justify-center relative z-10 ${active ? 'dot-active' : ''}`}>
                          <Icon size={15} className="text-white drop-shadow" />
                        </div>
                      </div>

                      {/* Empty side — spacer */}
                      <div className="w-[calc(50%-2rem)]" />
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────── */}
        <ScrollReveal direction="up">
          <div className="mt-24 pt-8 border-t border-white/[0.06] text-center space-y-3">
            <p className="text-2xl font-bold tracking-tight text-shimmer">
              {meta.authorName}
            </p>
            <p className="text-xs text-slate-600">
              Last updated{' '}
              {new Date(meta.lastUpdated).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </ScrollReveal>

      </div>
      <BackToTop />
    </main>
  );
}
