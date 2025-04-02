import React from "react";
import { ITask } from "@/types/task";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <tr className="hover bg-base-200">
      <td className="text-center">{task.title}</td>
      <td className="text-center">{task.description}</td>
      <td className="text-center">{formatDate(task.dueDate)}</td>
      <td className="text-center">
        <span
          className={`badge ${
            task.isCompleted ? "badge-success" : "badge-warning"
          }`}
        >
          {task.isCompleted ? "Concluída" : "Pendente"}
        </span>
      </td>
      <td className="text-center">
        {/* Aqui vão os botões de editar/deletar depois */}
      </td>
    </tr>
  );
};

export default Task;
