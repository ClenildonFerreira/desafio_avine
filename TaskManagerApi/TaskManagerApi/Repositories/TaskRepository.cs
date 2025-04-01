using Microsoft.EntityFrameworkCore;
using TaskManagerApi.Data;
using TaskManagerApi.Models;


namespace TaskManagerApi.Repositories
{
    public class TaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskItem>> GetAllTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskItem?> GetTaskById(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }


        public async Task AddTask(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTask(TaskItem task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> TaskTitleExistsAsync(string title)
        {
            return await _context.Tasks
                .AnyAsync(t => EF.Functions.Like(t.Title, title));
        }

        public async Task<List<TaskItem>> GetTasksPaged(int page, int pageSize)
        {
            return await _context.Tasks
                .Skip((page - 1) * pageSize)  
                .Take(pageSize)             
                .ToListAsync();
        }

    }
}
