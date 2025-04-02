using Microsoft.EntityFrameworkCore;
using TaskManagerApi.Data;
using TaskManagerApi.Repositories;


var builder = WebApplication.CreateBuilder(args);

// Configura��o do logging
builder.Logging.AddConsole();  
builder.Logging.AddDebug();   

// Registra o DbContext e o reposit�rio
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 41))));

builder.Services.AddScoped<TaskRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000") // endere�o do seu front-end
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


var app = builder.Build();

// Swagger e configura��o de middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
