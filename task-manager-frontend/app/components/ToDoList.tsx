"use client";

import React, { useState } from "react";
import { ITask } from "@/types/task";
import Task from "./Task";
import EditTaskModal from "./EditTaskModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useEditTodo } from "@/hooks/useEditTodo";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import { useTodoContext } from "@/app/context/TodoContext";
import toast from "react-hot-toast";

const TodoList: React.FC = () => {
  const { tasks, loading, error, refetch } = useTodoContext();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const { handleEditTodo } = useEditTodo();
  const { handleDeleteTodo } = useDeleteTodo();

  const handleEditClick = (task: ITask) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (task: ITask) => {
    setSelectedTask(task);
    setDeleteModalOpen(true);
  };

  const handleConfirmEdit = async (updatedTask: ITask) => {
    await toast.promise(
      handleEditTodo(updatedTask),
      {
        loading: "Salvando...",
        success: "Tarefa atualizada!",
        error: "Erro ao editar tarefa",
      }
    );
    
    refetch();
    setEditModalOpen(false);
  };

  const handleConfirmDelete = async (id: number) => {
    const success = await handleDeleteTodo(id);
    if (success) {
      toast.success("Tarefa excluída com sucesso!");
      refetch();
      setDeleteModalOpen(false);
    } else {
      toast.error("Erro ao excluir tarefa.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-40">
      <span className="loading loading-spinner text-primary"></span>
    </div>
  );

  if (error) return <p className="text-center text-red-500">{error}</p>;

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
            <Task
              key={task.id}
              task={task}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </tbody>
      </table>

      <EditTaskModal
        task={selectedTask}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleConfirmEdit}
      />

      <DeleteConfirmModal
        task={selectedTask}
        isOpen={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default TodoList;