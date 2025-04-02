"use client";

import Modal from "./Modal";
import { ITask } from "@/types/task";

interface DeleteConfirmModalProps {
  task: ITask | null;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (id: number) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  task,
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!task) return null;

  return (
    <Modal modalOpen={isOpen} setModalOpen={() => onCancel()}>
      <div className="modal-action flex flex-col gap-4">
        <h3 className="font-bold text-lg text-center">
            {`Tem certeza que deseja excluir "${task.title}"?`}
        </h3>
        <div className="flex justify-center gap-4 mt-4">
          <button className="btn btn-error" onClick={() => onConfirm(task.id)}>
            Sim, excluir
          </button>
          <button className="btn" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
