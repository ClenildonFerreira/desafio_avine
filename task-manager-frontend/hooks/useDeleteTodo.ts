"use client";

import { useState } from "react";
import { deleteTodo } from "@/api";
import { useRouter } from "next/navigation";

export const useDeleteTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteTodo = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const success = await deleteTodo(id);
      if (!success) {
        setError("Erro ao excluir a tarefa.");
        return false;
      }
      router.refresh();
      return true;
    } catch{
      setError("Erro inesperado.",);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteTodo, loading, error };
};
