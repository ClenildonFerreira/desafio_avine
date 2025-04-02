import { ITask } from "@/types/task";
import React from "react";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-base-100 p-4">
      <table className="table table-zebra w-full">
        <thead className="bg-primary text-primary-content">
          <tr>
            <th className="text-center">Título</th>
            <th className="text-center">Descrição</th>
            <th className="text-center">Data de Vencimento</th>
            <th className="text-center">Status</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
