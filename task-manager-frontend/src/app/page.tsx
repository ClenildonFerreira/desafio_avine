'use client';
import { useState, useEffect } from "react";
import TaskForm from "@/app/components/TaskForm";
import TaskList from "@/app/components/TaskList";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const handleSaveTask = async (task: Task) => {
    if (editingTask) {
      // Atualizar tarefa
      await fetch(`/api/tasks/${editingTask.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
      });
    } else {
      // Adicionar tarefa
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
      });
    }
    fetchTasks();
    setEditingTask(null);
  };

  const handleDeleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">Lista de Tarefas</h1>
      <TaskForm onSave={handleSaveTask} initialData={editingTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
    </div>

  );
};

export default Home;