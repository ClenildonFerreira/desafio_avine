import { ITask } from "@/types/task";
import axios, { AxiosError } from 'axios';

const baseUrl = "http://localhost:14276/api"; 

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const res = await axios.get(`${baseUrl}/Task`);
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Erro ao buscar a tarefas:', err.message);
    return [];
  }
};

export const getTodoById = async (id: number): Promise<ITask | null> => {
  try {
    const response = await axios.get<ITask>(`${baseUrl}/Task/${id}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Erro ao buscar a tarefa:', err.message);
    return null;
  }
};

export const addTodo = async (task: ITask): Promise<ITask | null> => {
    try {
      const res = await axios.post<ITask>(`${baseUrl}/Task`, task);
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error("Erro ao criar a tarefa:", err.message);
      return null;
    }
};
  