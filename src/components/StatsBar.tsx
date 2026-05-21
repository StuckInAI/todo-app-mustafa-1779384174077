import { Trash2, CheckCheck } from 'lucide-react';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
  onToggleAll: () => void;
  onClearCompleted: () => void;
};

export default function StatsBar({ activeCount, completedCount, onToggleAll, onClearCompleted }: StatsBarProps) {
  return (
    <div className="px-5 py-2.5 border-b border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
      <span>
        <span className="font-semibold text-indigo-600">{activeCount}</span> task{activeCount !== 1 ? 's' : ''} remaining
      </span>
      <div className="flex gap-2">
        <button
          onClick={onToggleAll}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
        >
          <CheckCheck size={13} />
          Toggle all
        </button>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-red-50 hover:text-red-500 transition font-medium"
          >
            <Trash2 size={13} />
            Clear done ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}
