"use client";
import { useState } from "react";
import axios from "axios";

type Comment = {
  id: number;
};

interface DeleteCommentProps {
  fetchComments: () => void; // Tipo de la función fetchComments
}

const DeleteComment: React.FC<{ comment: Comment } & DeleteCommentProps> = ({
  comment,
  fetchComments,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (commentId: number) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/comments/${commentId}`
    );
    setIsOpen(false);
    fetchComments();
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
