"use client";

import { useState } from "react";
import { CreateTaskDTO, ITask } from "@/types/task";
import { addTodo } from "@/api";

type AddTodoResponse = ITask | { error: string };

export const useAddTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTodo = async (task: CreateTaskDTO): Promise<ITask | null> => {
    setLoading(true);
    setError(null);

    try {
      const result: AddTodoResponse = await addTodo(task);

      if ("error" in result) {
        setError(result.error);
        return null;
      }

      return result;
    } catch{
      setError("Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleAddTodo, loading, error };
};
