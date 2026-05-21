import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 border-b border-slate-100">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={clsx(
            'px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-1.5 transition',
            text.trim()
              ? 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          )}
        >
          <Plus size={16} />
          Add
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <span className="text-xs text-slate-500 self-center mr-1">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-medium border transition',
              p.color,
              priority === p.value ? 'ring-2 ring-offset-1 ring-indigo-400' : 'opacity-60 hover:opacity-100'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
