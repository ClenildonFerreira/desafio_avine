import { ITask } from "@/types/task";
import axios from 'axios';

const baseUrl = "http://localhost:14276/api"; 

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const res = await axios.get(`${baseUrl}/Task`);
    return res.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas', error);
    return [];
  }
};
  