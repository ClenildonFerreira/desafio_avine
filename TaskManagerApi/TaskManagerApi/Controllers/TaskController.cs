using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TaskManagerApi.Models;
using TaskManagerApi.Repositories;

namespace TaskManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskRepository _taskRepository;
        private readonly ILogger<TaskController> _logger;

        public TaskController(TaskRepository taskRepository, ILogger<TaskController> logger)
        {
            _taskRepository = taskRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks(int page = 1, int pageSize = 10)
        {
            _logger.LogInformation("Iniciando a busca das tarefas com paginação (Página {Page}, Tamanho da página {PageSize})", page, pageSize);
            var tasks = await _taskRepository.GetTasksPaged(page, pageSize);
            _logger.LogInformation("Busca de tarefas concluída com sucesso.");
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            _logger.LogInformation("Buscando tarefa com ID {TaskId}", id);
            var task = await _taskRepository.GetTaskById(id);
            if (task == null)
            {
                _logger.LogWarning("Tarefa com ID {TaskId} não encontrada", id);
                return NotFound(new { Message = "Tarefa não encontrada" });
            }

            _logger.LogInformation("Tarefa com ID {TaskId} encontrada", id);
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult> CreateTask(TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Title))
            {
                _logger.LogWarning("Tentativa de criar tarefa com título vazio.");
                return BadRequest("O título da tarefa não pode estar vazio.");
            }

            if (task.DueDate < DateTime.Now)
            {
                _logger.LogWarning("Tentativa de criar tarefa com data de vencimento no passado.");
                return BadRequest("A data de vencimento não pode ser no passado.");
            }

            if (await _taskRepository.TaskTitleExistsAsync(task.Title))
            {
                _logger.LogWarning("Tentativa de criar tarefa com título duplicado: {Title}", task.Title);
                return BadRequest("Já existe uma tarefa com esse título.");
            }

            await _taskRepository.AddTask(task);
            _logger.LogInformation("Tarefa criada com sucesso: {Title}", task.Title);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdateTask(int id, TaskItem task)
        {
            var existingTask = await _taskRepository.GetTaskById(id);
            if (existingTask == null)
            {
                _logger.LogWarning("Tentativa de atualizar tarefa com ID {TaskId} não encontrada", id);
                return NotFound();
            }

            if (await _taskRepository.TaskTitleExistsAsync(task.Title) && task.Title != existingTask.Title)
            {
                _logger.LogWarning("Tentativa de atualizar tarefa com título duplicado: {Title}", task.Title);
                return BadRequest("Já existe uma tarefa com esse título.");
            }

            existingTask.Title = task.Title ?? existingTask.Title;
            existingTask.Description = task.Description ?? existingTask.Description;
            existingTask.DueDate = task.DueDate != default ? task.DueDate : existingTask.DueDate;
            existingTask.IsCompleted = task.IsCompleted;

            await _taskRepository.UpdateTask(existingTask);
            _logger.LogInformation("Tarefa com ID {TaskId} atualizada com sucesso", id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            _logger.LogInformation("Tentando excluir tarefa com ID {TaskId}", id);
            await _taskRepository.DeleteTask(id);
            _logger.LogInformation("Tarefa com ID {TaskId} excluída com sucesso", id);
            return NoContent();
        }
    }
}

