import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    search,
    setSearch,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-6">
          <AddTodoForm onAdd={addTodo} />
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
          />
          <StatsBar
            activeCount={activeCount}
            completedCount={completedCount}
            onToggleAll={toggleAll}
            onClearCompleted={clearCompleted}
          />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
      </div>
    </div>
  );
}
