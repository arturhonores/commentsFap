"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Comment = {
  id: number;
  nombre: string;
  fecha: string;
  comentario: string;
};

const UpdateComment = ({ comment }: { comment: Comment }) => {
  const [nombre, setNombre] = useState(comment.nombre);
  const [fecha, setFecha] = useState(comment.fecha);
  const [comentario, setComentario] = useState(comment.comentario);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/${comment.id}`,
      {
        nombre: nombre,
        fecha: fecha,
        comentario: comentario,
      }
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
        className="btn btn-xs btn-success text-white"
        onClick={handleModal}
      >
        Editar
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Actualizar Reseña</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input input-bordered"
                placeholder="Nombre del estudiante"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Fecha</label>
              <input
                type="text"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="input input-bordered"
                placeholder="Fecha a mostrar"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Reseña</label>
              <input
                type="text"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                className="input input-bordered"
                placeholder="Reseña"
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={handleModal}
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="btn btn-info text-white"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateComment;
