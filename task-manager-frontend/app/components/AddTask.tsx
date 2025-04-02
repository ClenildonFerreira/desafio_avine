"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useAddTodo } from "@/hooks/useAddTodo";
import { useTodoContext } from "@/app/context/TodoContext";
import toast from "react-hot-toast";

const AddTask = () => {
  const { handleAddTodo, loading, error } = useAddTodo();
  const { refetch } = useTodoContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFormError(null);

    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      setFormError("Não é possível agendar tarefas com data de hoje ou anterior.");
      return;
    }

    const dueDateUtc = new Date(`${dueDate}T23:59:59`).toISOString();

    const result = await handleAddTodo({
      title,
      description,
      dueDate: dueDateUtc,
      isCompleted,
    });

    if (result) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setIsCompleted(false);
      setModalOpen(false);
      toast.success("Tarefa criada com sucesso!");
      refetch();
    }
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
        Adicionar nova tarefa <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Adicionar nova tarefa</h3>
          <div className="modal-action flex flex-col gap-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Título da tarefa"
              className="input input-bordered w-full"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da tarefa"
              className="input input-bordered w-full my-2"
              required
            />
            <input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              type="date"
              className="input input-bordered w-full my-2"
              min={new Date().toISOString().split("T")[0]}
              required
            />
            <label>
              Concluída:
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => setIsCompleted(!isCompleted)}
                className="checkbox ml-2"
              />
            </label>

            {error && <p className="text-red-500">{error}</p>}
            {formError && <p className="text-red-500 text-sm">{formError}</p>}

            <button type="submit" className="btn btn-secondary mt-4" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;