'use client';
import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
};

interface TaskFormProps {
  onSave: (task: Task) => void;
  initialData?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, initialData }) => {
  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(task); // Chama a função que vem do componente pai
    setTask({ id: 0, title: "", description: "", dueDate: "" }); // Limpa o formulário
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label className="block text-lg font-medium">Título</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="input w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-lg font-medium">Descrição</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="textarea w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-lg font-medium">Data de Vencimento</label>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="input w-full p-2 border rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-md">
        Salvar
      </button>
    </form>
  );
};

export default TaskForm;
