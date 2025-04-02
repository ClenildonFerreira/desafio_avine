"use client";

import { useState } from "react";
import { ITask } from "@/types/task";
import { editTodo } from "@/api";
import { useRouter } from "next/navigation";

export const useEditTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEditTodo = async (task: ITask): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const result = await editTodo(task);
      if (!result) {
        setError("Erro ao editar a tarefa.");
        return false;
      }
      router.refresh();
      return true;
    } catch{
      setError("Erro inesperado.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleEditTodo, loading, error };
};
