// Pure card content — no dot, no positioning.
// The zig-zag layout + dot rendering is handled by page.tsx.

import { TrendingUp, MapPin, Calendar } from 'lucide-react';
import type { TimelineEntry } from '../types';
import { formatDateRange, formatTimelineDate } from '../lib/utils';

const typeConfig = {
  work: {
    label:  'text-blue-400',
    border: 'border-slate-800/60 hover:border-blue-500/40',
    org:    'text-slate-100',
    accent: 'from-blue-500 to-cyan-500',
    glow:   'hover:shadow-blue-500/10',
  },
  education: {
    label:  'text-purple-400',
    border: 'border-slate-800/60 hover:border-purple-500/40',
    org:    'text-purple-300/80',
    accent: 'from-purple-500 to-pink-500',
    glow:   'hover:shadow-purple-500/10',
  },
  milestone: {
    label:  'text-amber-400',
    border: 'border-slate-800/60 hover:border-amber-500/40',
    org:    'text-amber-300/80',
    accent: 'from-amber-400 to-orange-500',
    glow:   'hover:shadow-amber-500/10',
  },
};

interface TimelineItemProps {
  entry: TimelineEntry;
  isActive?: boolean;
}

export function TimelineItem({ entry, isActive = false }: TimelineItemProps) {
  const config = typeConfig[entry.type];

  return (
    <div className={`relative bg-slate-900/80 backdrop-blur-sm border ${config.border} rounded-2xl p-5 transition-all duration-300 hover:shadow-xl ${config.glow} overflow-hidden`}>

      {/* Colored left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${config.accent} rounded-l-2xl`} />

      {/* Date + Current badge */}
      <div className={`flex items-center gap-2 text-xs font-semibold ${config.label} mb-3 uppercase tracking-wider`}>
        {formatTimelineDate(entry.date)}
        {isActive && (
          <span className="normal-case tracking-normal font-medium bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">
            Current
          </span>
        )}
      </div>

      {/* ── WORK ──────────────────────────────────────── */}
      {entry.type === 'work' && entry.positions && (
        <>
          <h3 className="text-base font-bold text-slate-100 mb-1">{entry.organization}</h3>
          {entry.location && (
            <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
              <MapPin size={11} /> {entry.location}
            </div>
          )}
          <div className="space-y-5">
            {entry.positions.map((pos, i) => (
              <div key={i} className={i > 0 ? 'border-t border-slate-800/80 pt-5' : ''}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {pos.isPromotion && (
                      <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full shrink-0">
                        <TrendingUp size={10} /> Promoted
                      </span>
                    )}
                    <h4 className="text-sm font-semibold text-slate-200">{pos.title}</h4>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-slate-500 shrink-0">
                    <Calendar size={10} /> {formatDateRange(pos.startDate, pos.endDate)}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{pos.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── EDUCATION ─────────────────────────────────── */}
      {entry.type === 'education' && (
        <>
          <h3 className="text-base font-bold text-slate-100 mb-1">{entry.title}</h3>
          {entry.organization && <p className={`text-sm ${config.org} mb-1`}>{entry.organization}</p>}
          <div className="flex flex-wrap items-center gap-3 mt-1 mb-3">
            {entry.location && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={11} /> {entry.location}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={11} /> {formatDateRange(entry.date, entry.endDate ?? null)}
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{entry.description}</p>
        </>
      )}

      {/* ── MILESTONE ─────────────────────────────────── */}
      {entry.type === 'milestone' && (
        <>
          <h3 className="text-base font-bold text-slate-100 mb-1">{entry.title}</h3>
          {entry.organization && <p className={`text-sm ${config.org} mb-1`}>{entry.organization}</p>}
          {entry.location && (
            <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
              <MapPin size={11} /> {entry.location}
            </div>
          )}
          <p className="text-sm text-slate-400 leading-relaxed">{entry.description}</p>
        </>
      )}
    </div>
  );
}
