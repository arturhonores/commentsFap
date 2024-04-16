"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddComment = () => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api`, {
      nombre: nombre,
      fecha: fecha,
      comentario: comentario,
    });
    setNombre("");
    setFecha("");
    setComentario("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="btn btn-info text-white"
        onClick={handleModal}
      >
        Agregar reseña
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Agregar nueva reseña</h3>
          <form onSubmit={handleSubmit}>
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
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddComment;
