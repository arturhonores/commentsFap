"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Comment = {
  id: number;
  nombre: string;
  fecha: string;
  comentario: string;
};

const DeleteComment = ({ comment }: { comment: Comment }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async (commentId: number) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/${commentId}`
    );
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="btn btn-error btn-xs text-white"
        onClick={handleModal}
      >
        Borrar
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">¿Deseas borrar esta reseña?</h3>
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={handleModal}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-error text-white"
              onClick={() => {
                handleDelete(comment.id);
              }}
            >
              Si
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteComment;
