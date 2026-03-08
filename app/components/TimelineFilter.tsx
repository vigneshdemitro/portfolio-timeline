'use client';
// 🔑 Next.js concept: 'use client' directive
// Without this, every component is a SERVER Component by default.
// We need 'use client' here because:
//   - useRouter() is a browser API (needs client-side JS)
//   - onClick handlers require interactivity
//
// 🔑 URL-based filter state (instead of useState)
// Instead of useState to track active filter, we store it in the URL: ?type=work
// Benefits:
//   - The page re-renders SERVER-SIDE with the new filter (no client state)
//   - Filter state is shareable via URL
//   - Browser back/forward navigation works correctly
//   - Better for SEO

import { useRouter } from 'next/navigation';

interface TimelineFilterProps {
  filters: string[];    // driven directly from meta.filters in timeline.json
  activeFilter: string; // read from URL searchParams in page.tsx (server-side)
}

// Color config per filter type — matches the dot colors in TimelineItem
const filterStyles: Record<string, { active: string; hover: string }> = {
  all:       { active: 'bg-slate-700 text-white border-slate-500',                     hover: 'hover:border-slate-500 hover:text-slate-200' },
  work:      { active: 'bg-blue-500/20 text-blue-300 border-blue-500',                 hover: 'hover:border-blue-500/50 hover:text-blue-300' },
  education: { active: 'bg-purple-500/20 text-purple-300 border-purple-500',           hover: 'hover:border-purple-500/50 hover:text-purple-300' },
  milestone: { active: 'bg-amber-500/20 text-amber-300 border-amber-500',              hover: 'hover:border-amber-500/50 hover:text-amber-300' },
};

export function TimelineFilter({ filters, activeFilter }: TimelineFilterProps) {
  const router = useRouter();

  const handleFilter = (filter: string) => {
    // Update the URL — triggers a server-side re-render with new searchParams
    router.push(filter === 'all' ? '/' : `/?type=${filter}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        const styles = filterStyles[filter] ?? filterStyles.all;

        return (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium border capitalize
              transition-all duration-200 cursor-pointer
              ${isActive
                ? styles.active
                : `text-slate-500 border-slate-700 ${styles.hover}`
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
