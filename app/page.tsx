import type { Metadata } from 'next';
import {
  GraduationCap, Code2, Layers, Star, PencilRuler,
  Ruler, Zap, Terminal, Award,
} from 'lucide-react';
import { getTimelineData } from './lib/timeline-data';
import { TimelineItem } from './components/TimelineItem';
import { ScrollReveal } from './components/ScrollReveal';
import type { TimelineEntry } from './types';

// Icon map lives here now — page owns dot rendering
const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Code2, Layers, Star, PencilRuler,
  Ruler, Zap, Terminal, Award,
};

// Dot color per type — used for the spine dots in the zig-zag
const dotConfig = {
  work:      { dot: 'bg-blue-500',   ring: 'ring-blue-500/20'   },
  education: { dot: 'bg-purple-500', ring: 'ring-purple-500/20' },
  milestone: { dot: 'bg-amber-500',  ring: 'ring-amber-500/20'  },
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
        <div className="mb-12 text-center">
          <p className="text-sm text-slate-500 mb-2 uppercase tracking-widest font-medium">
            Professional Journey
          </p>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Timeline
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">{meta.siteDescription}</p>
        </div>

        {/* ── Stats ──────────────────────────────────────── */}
        <ScrollReveal direction="up" delay={100}>
          {(() => {
            const currentYear = new Date().getFullYear();
            const totalYears = currentYear - meta.careerStartYear;
            const itYears = currentYear - meta.softwareCareerStartYear;
            return (
              <div className="grid grid-cols-2 gap-4 mb-16 max-w-xs mx-auto">
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/60 rounded-xl p-5 text-center hover:border-purple-500/30 transition-colors">
                  <div className="text-3xl font-bold text-purple-400">{totalYears}<span className="text-lg text-purple-400/70">+ yr</span></div>
                  <div className="text-xs text-slate-500 mt-1">Total experience</div>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/60 rounded-xl p-5 text-center hover:border-cyan-500/30 transition-colors">
                  <div className="text-3xl font-bold text-cyan-400">{itYears}<span className="text-lg text-cyan-400/70">+ yr</span></div>
                  <div className="text-xs text-slate-500 mt-1">In software</div>
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
                      <div className={`absolute left-0.5 top-3 w-7 h-7 rounded-full ${config.dot} ring-4 ${config.ring} flex items-center justify-center ${active ? 'dot-active' : ''}`}>
                        <Icon size={13} className="text-white" />
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
                      <div className="w-16 flex justify-center items-start pt-4 shrink-0">
                        <div className={`w-8 h-8 rounded-full ${config.dot} ring-4 ${config.ring} flex items-center justify-center relative z-10 ${active ? 'dot-active' : ''}`}>
                          <Icon size={14} className="text-white" />
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
          <div className="mt-20 pt-8 border-t border-slate-800/60 text-center space-y-3">
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
    </main>
  );
}
