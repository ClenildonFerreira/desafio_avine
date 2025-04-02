"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await addTodo({
      id: uuidv4(),
      title,
      description,
      dueDate,
      completed,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setCompleted(false);
    setModalOpen(false);

    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
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
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da tarefa"
              className="input input-bordered w-full my-2"
            />
            <input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              type="date"
              className="input input-bordered w-full my-2"
            />
            <label>
              Concluída:
              <input
                type="checkbox"
                checked={completed}
                onChange={() => setCompleted(!completed)}
                className="checkbox ml-2"
              />
            </label>
            <button type="submit" className="btn btn-secondary mt-4">
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
