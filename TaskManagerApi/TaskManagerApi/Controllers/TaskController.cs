using Microsoft.AspNetCore.Mvc;
using TaskManagerApi.Models;
using TaskManagerApi.Repositories;


namespace TaskManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskRepository _taskRepository;

        public TaskController(TaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return Ok(await _taskRepository.GetAllTasks());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _taskRepository.GetTaskById(id);
            if (task == null)
            {
                return NotFound(new { Message = "Tarefa não encontrada" });
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult> CreateTask(TaskItem task)
        {
            if (await _taskRepository.TaskTitleExistsAsync(task.Title))
            {
                return BadRequest("A tarefa com esse título já existe.");
            }

            await _taskRepository.AddTask(task);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdateTask(int id, TaskItem task)
        {
            var existingTask = await _taskRepository.GetTaskById(id);
            if (existingTask == null)
                return NotFound();

            if (await _taskRepository.TaskTitleExistsAsync(task.Title) && task.Title != existingTask.Title)
            {
                return BadRequest("Já existe uma tarefa com esse título.");
            }

            existingTask.Title = task.Title ?? existingTask.Title;
            existingTask.Description = task.Description ?? existingTask.Description;
            existingTask.DueDate = task.DueDate != default ? task.DueDate : existingTask.DueDate;
            existingTask.IsCompleted = task.IsCompleted;

            await _taskRepository.UpdateTask(existingTask);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            await _taskRepository.DeleteTask(id);
            return NoContent();
        }
    }
}
