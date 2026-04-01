import { TrendingUp, MapPin, Calendar } from 'lucide-react';
import type { TimelineEntry } from '../types';
import { formatDateRange, formatTimelineDate } from '../lib/utils';

const typeConfig = {
  work: {
    label:   'text-indigo-300',
    border:  'border-indigo-500/20 hover:border-indigo-400/50',
    org:     'text-slate-100',
    shine:   'via-indigo-400/60',
    corner:  'bg-indigo-500',
    badge:   'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    divider: 'border-indigo-500/10',
  },
  education: {
    label:   'text-violet-300',
    border:  'border-violet-500/20 hover:border-violet-400/50',
    org:     'text-violet-200/80',
    shine:   'via-violet-400/60',
    corner:  'bg-violet-500',
    badge:   'bg-violet-500/10 text-violet-300 border-violet-500/20',
    divider: 'border-violet-500/10',
  },
  milestone: {
    label:   'text-amber-300',
    border:  'border-amber-500/20 hover:border-amber-400/50',
    org:     'text-amber-200/80',
    shine:   'via-amber-400/60',
    corner:  'bg-amber-400',
    badge:   'bg-amber-500/10 text-amber-300 border-amber-500/20',
    divider: 'border-amber-500/10',
  },
};

interface TimelineItemProps {
  entry: TimelineEntry;
  isActive?: boolean;
}

export function TimelineItem({ entry, isActive = false }: TimelineItemProps) {
  const config = typeConfig[entry.type];

  return (
    <div className={`glass-card relative border ${config.border} rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl overflow-hidden group`}>

      {/* Top shine line */}
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${config.shine} to-transparent`} />

      {/* Corner radial glow */}
      <div className={`absolute -top-12 -right-12 w-36 h-36 ${config.corner} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

      {/* Date + Current badge */}
      <div className={`flex items-center gap-2 text-xs font-semibold ${config.label} mb-4 uppercase tracking-widest`}>
        {formatTimelineDate(entry.date)}
        {isActive && (
          <span className="normal-case tracking-normal font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            Current
          </span>
        )}
      </div>

      {/* WORK */}
      {entry.type === 'work' && entry.positions && (
        <>
          <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{entry.organization}</h3>
          {entry.location && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
              <MapPin size={11} /> {entry.location}
            </div>
          )}
          <div className="space-y-5">
            {[...entry.positions].reverse().map((pos, i, arr) => (
              <div key={i} className={i > 0 ? `border-t ${config.divider} pt-5` : ''}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-200">{pos.title}</h4>
                    {i < arr.length - 1 && (
                      <span className="flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                        <TrendingUp size={11} /> Promoted
                      </span>
                    )}
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

      {/* EDUCATION */}
      {entry.type === 'education' && (
        <>
          <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{entry.title}</h3>
          {entry.organization && <p className={`text-sm ${config.org} mb-1`}>{entry.organization}</p>}
          <div className="flex flex-wrap items-center gap-3 mt-1 mb-4">
            {entry.location && (
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={11} /> {entry.location}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar size={11} /> {formatDateRange(entry.date, entry.endDate ?? null)}
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{entry.description}</p>
        </>
      )}

      {/* MILESTONE */}
      {entry.type === 'milestone' && (
        <>
          <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{entry.title}</h3>
          {entry.organization && <p className={`text-sm ${config.org} mb-1`}>{entry.organization}</p>}
          {entry.location && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
              <MapPin size={11} /> {entry.location}
            </div>
          )}
          <p className="text-sm text-slate-400 leading-relaxed">{entry.description}</p>
        </>
      )}
    </div>
  );
}
