"use client";

import React, { useState, useEffect, FormEventHandler } from "react";
import Modal from "./Modal";
import { ITask } from "@/types/task"

interface EditTaskModalProps {
  task: ITask | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: ITask) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate.split("T")[0]);
      setIsCompleted(task.isCompleted);
      setFormError(null);
    }
  }, [task]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!task) return;

    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!title.trim() || !description.trim() || !dueDate) {
      setFormError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (selectedDate <= today) {
      setFormError("A data de vencimento deve ser maior que hoje.");
      return;
    }

    setFormError(null);

    onSave({
      ...task,
      title,
      description,
      dueDate: new Date(`${dueDate}T23:59:59`).toISOString(),
      isCompleted,
    });

    onClose();
  };

  return (
    <Modal modalOpen={isOpen} setModalOpen={onClose}>
      <form onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg">Editar tarefa</h3>
        <div className="modal-action flex flex-col gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Título"
            className="input input-bordered w-full"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição"
            className="input input-bordered w-full"
            required
          />
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            className="input input-bordered w-full"
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

          {formError && <p className="text-red-500 text-sm">{formError}</p>}

          <button type="submit" className="btn btn-primary mt-4">
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
