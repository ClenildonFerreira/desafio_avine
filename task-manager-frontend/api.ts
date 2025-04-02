import axios, { AxiosError } from 'axios';
import { CreateTaskDTO, ITask } from "@/types/task";

const baseUrl = "http://localhost:14276/api"; 

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const res = await axios.get(`${baseUrl}/Task?t=${Date.now()}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Erro ao buscar as tarefas:', err.message);
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

export const addTodo = async (task: CreateTaskDTO): Promise<ITask | null> => {
  try {
    const response = await axios.post<ITask>(`${baseUrl}/Task`, task, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (status) => status >= 200 && status < 500,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.error("Erro HTTP:", response.status, response.data);
      return null;
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro na requisição:", err.message);
    return null;
  }
};

export const editTodo = async (task: ITask): Promise<ITask | null> => {
  try {
    const res = await axios.patch(`${baseUrl}/Task/${task.id}`, task);
    return res.data;
  } catch (err) {
    console.error("Erro ao editar:", err);
    return null;
  }
};


export const deleteTodo = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${baseUrl}/Task/${id}`);
    return true;
  } catch (err) {
    console.error("Erro ao deletar:", (err as AxiosError).message);
    return false;
  }
};