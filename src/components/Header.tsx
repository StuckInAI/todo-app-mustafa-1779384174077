import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-3">
        <div className="bg-indigo-500 text-white p-3 rounded-2xl shadow-md">
          <CheckSquare size={28} />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
          My Todos
        </h1>
      </div>
      <p className="text-slate-500 mt-2 text-sm">Stay organized, stay productive.</p>
    </div>
  );
}
