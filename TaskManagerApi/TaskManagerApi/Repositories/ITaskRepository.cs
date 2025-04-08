using TaskManagerApi.Models;

namespace TaskManagerApi.Repositories
{
    public interface ITaskRepository
    {
        Task<List<TaskItem>> GetAllTasks();
        Task<TaskItem?> GetTaskById(int id);
        Task AddTask(TaskItem task);
        Task UpdateTask(TaskItem task);
        Task DeleteTask(int id);
        Task<bool> TaskTitleExistsAsync(string title);
        Task<List<TaskItem>> GetTasksPaged(int page, int pageSize);
    }
}
