"use client";

import { useState } from "react";
import { CreateTaskDTO, ITask } from "@/types/task";
import { addTodo } from "@/api";

export const useAddTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTodo = async (task: CreateTaskDTO): Promise<ITask | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await addTodo(task);
      if (!result) {
        setError("Falha ao criar tarefa.");
      }
      return result;
    } catch (err) {
        console.error(err);
        setError("Erro desconhecido.");
        return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleAddTodo, loading, error };
};
