"use client";

import { useState, useEffect } from "react";
import { getAllTodos } from "@/api";
import { ITask } from "@/types/task";

export const useGetTodos = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await getAllTodos();
      setTasks(data);
    } catch {
      setError("Erro ao buscar tarefas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { tasks, loading, error, refetch: fetchTodos };
};
