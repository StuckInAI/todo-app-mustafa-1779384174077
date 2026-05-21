import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-600',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  function handleEditSubmit() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className={clsx('flex items-center gap-3 px-5 py-3.5 group hover:bg-slate-50 transition', todo.completed && 'opacity-60')}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-slate-300 hover:border-indigo-400'
        )}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check size={11} strokeWidth={3} />}
      </button>

      {/* Text / Edit */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEditSubmit}
            className="w-full px-2 py-0.5 text-sm border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        ) : (
          <span
            className={clsx(
              'text-sm text-slate-700 block truncate',
              todo.completed && 'line-through text-slate-400'
            )}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge */}
      {!editing && (
        <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0', PRIORITY_BADGE[todo.priority])}>
          {todo.priority}
        </span>
      )}

      {/* Actions */}
      <div className={clsx('flex gap-1 flex-shrink-0', editing ? 'flex' : 'opacity-0 group-hover:opacity-100 transition')}>
        {editing ? (
          <>
            <button
              onClick={handleEditSubmit}
              className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition"
              aria-label="Save"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition"
              aria-label="Cancel"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 transition"
              aria-label="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
