# 📋 ToDoList Avine

Aplicação web full stack para gerenciamento de tarefas desenvolvida como parte de um desafio técnico para vaga de Desenvolvedor Júnior na Avine.

## 🚀 Tecnologias Utilizadas

### Front-End (ReactJS + Next.js)
- Next.js App Router
- React Hooks (com custom hooks)
- Context API para estado global
- Tailwind CSS + DaisyUI para estilização
- Axios para requisições HTTP
- Toasts com `react-hot-toast`

### Back-End (ASP.NET Core Web API)
- .NET 8
- ASP.NET Core Controllers
- Entity Framework Core 8
- MySQL
- Swagger (documentação)
- Validações com DataAnnotations + lógicas manuais
- Injeção de dependência (repositórios, logging)

## 📦 Funcionalidades

- ✅ Criar tarefas com título, descrição, data e status
- ✅ Visualizar todas as tarefas em tabela responsiva
- ✅ Editar qualquer tarefa (com validação de data)
- ✅ Excluir tarefa com confirmação
- ✅ Feedback visual (toast) em todas as ações
- ✅ Validação de título duplicado no backend
- ✅ API documentada com Swagger

## 🧠 Validações

### Front-end:
- Título obrigatório com mínimo de caracteres
- Data não pode ser hoje ou anterior

### Back-end:
- Título obrigatório
- Data não pode ser no passado
- Impede tarefas com títulos duplicados (via EF + LIKE)

## ⚙️ Como rodar o projeto

### 📁 Clonar o repositório
```bash
git clone https://github.com/ClenildonFerreira/desafio_avine.git
cd desafio_avine
```

### 🔧 Back-End
```bash
cd TaskManagerApi

# Restaurar pacotes
dotnet restore

# Rodar localmente
dotnet run

# A API rodará em: http://localhost:14276
# Swagger em: http://localhost:14276/swagger
```

### 💻 Front-End
```bash
cd task-manager-frontend

# Instalar dependências
npm install

# Rodar aplicação
npm run dev

# Acesse: http://localhost:3000
```

## 🗃️ Estrutura do Banco de Dados (MySQL)

### Script SQL
```sql
CREATE DATABASE IF NOT EXISTS TaskManager;
USE TaskManager;

CREATE TABLE Tasks (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(255) NOT NULL,
  Description TEXT,
  DueDate DATETIME NOT NULL,
  IsCompleted BOOLEAN DEFAULT FALSE
);
```

## 📁 Estrutura de Pastas

### Front-End
```
task-manager-frontend/
├── app/
│   ├── components/         # Componentes como AddTask, Modal, Task, etc
│   ├── context/            # TodoContext.tsx para estado global
│   ├── hooks/              # useAddTodo, useEditTodo, useDeleteTodo, etc
│   ├── page.tsx            # Home
│   └── layout.tsx          # Layout e provedor global
├── types/                  # Tipos TS (ITask, DTOs)
├── api.ts                  # Funções Axios
```

### Back-End
```
TaskManagerApi/
├── Controllers/            # TaskController.cs
├── Models/                 # TaskItem.cs
├── Repositories/           # TaskRepository.cs
├── Data/                   # AppDbContext.cs
├── Program.cs              # Startup do projeto
├── appsettings.json        # Configuração de conexão
```

## 📌 Observações Técnicas
- Context API com `useTodoContext` centraliza dados das tarefas
- Todas ações (criar, editar, excluir) disparam `refetch()` do contexto
- Toasts com `toast.success` e `toast.promise` para UX aprimorada

---

Desenvolvido por **Clenildon Ferreira** — 2025 💻
