"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getAllTodos } from "@/api";
import { ITask } from "@/types/task";

interface TodoContextProps {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await getAllTodos();
      setTasks(data);
    } catch {
      setError("Erro ao carregar tarefas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ tasks, loading, error, refetch: fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext deve ser usado dentro de TodoProvider");
  }
  return context;
};