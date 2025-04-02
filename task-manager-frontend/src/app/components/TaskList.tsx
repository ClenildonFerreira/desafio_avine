type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
  };
  
  interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
  }
  
  const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
    return (
      <div>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg shadow-sm">
              <div className="flex-1">
                <h2 className="font-semibold">{task.title}</h2>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">{task.dueDate}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TaskList;
  