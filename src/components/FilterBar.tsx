import { Search } from 'lucide-react';
import clsx from 'clsx';
import { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  search: string;
  setSearch: (s: string) => void;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({ filter, setFilter, search, setSearch }: FilterBarProps) {
  return (
    <div className="px-5 py-3 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition',
              filter === f.value
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="relative flex-1 w-full sm:w-auto">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
        />
      </div>
    </div>
  );
}
