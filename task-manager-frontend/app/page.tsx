import AddTask from "./components/AddTask";
import TodoList from "./components/ToDoList";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Lista de Tarefas</h1>
        <AddTask />
      </div>
      <TodoList />
    </main>
  );
}