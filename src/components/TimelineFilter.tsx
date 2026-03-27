interface TimelineFilterProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterStyles: Record<string, { active: string; hover: string }> = {
  all:       { active: 'bg-slate-700 text-white border-slate-500',           hover: 'hover:border-slate-500 hover:text-slate-200' },
  work:      { active: 'bg-blue-500/20 text-blue-300 border-blue-500',       hover: 'hover:border-blue-500/50 hover:text-blue-300' },
  education: { active: 'bg-purple-500/20 text-purple-300 border-purple-500', hover: 'hover:border-purple-500/50 hover:text-purple-300' },
  milestone: { active: 'bg-amber-500/20 text-amber-300 border-amber-500',    hover: 'hover:border-amber-500/50 hover:text-amber-300' },
};

export function TimelineFilter({ filters, activeFilter, onFilterChange }: TimelineFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        const styles = filterStyles[filter] ?? filterStyles.all;

        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
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
