export interface ITask {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
  }

  export type CreateTaskDTO = Omit<ITask, "id">;