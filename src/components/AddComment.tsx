"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";

interface AddCommentProps {
  fetchComments: () => void; // Tipo de la función fetchComments
  courses: { id: number; name: string }[]; // Lista de cursos para mostrar en el selector
}

const AddComment: React.FC<AddCommentProps> = ({ fetchComments, courses }) => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");
  const [courseId, setCourseId] = useState<number | null>(null); // Estado para mantener el ID del curso seleccionado
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!courseId) {
      alert("Por favor, seleccione un curso."); // Valida que se haya seleccionado un curso
      return;
    }
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/comments`, {
      nombre: nombre,
      fecha: fecha,
      comentario: comentario,
      courseId: courseId,
    });
    setNombre("");
    setFecha("");
    setComentario("");
    setCourseId(null);
    setIsOpen(false);
    // Llama a la función fetchComments para actualizar los comentarios
    fetchComments();
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="btn btn-info text-white my-2"
        onClick={handleModal}
      >
        Agregar reseña
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Agregar nueva reseña</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Curso</label>
              <select
                value={courseId || ""}
                onChange={(e) => setCourseId(Number(e.target.value))}
                className="select select-bordered"
              >
                <option
                  value=""
                  disabled
                >
                  Seleccione un curso
                </option>
                {courses.map((course) => (
                  <option
                    key={course.id}
                    value={course.id}
                  >
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
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
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                className="input input-bordered min-h-28 max-h-36"
                placeholder="Escribe una reseña de preferencia un mínimo de 50 palabras"
              ></textarea>
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
