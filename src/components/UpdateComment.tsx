"use client";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Comment = {
  id: number;
  nombre: string;
  fecha: string;
  comentario: string;
  courseId: number;
};

interface UpdateCommentProps {
  fetchComments: () => void; // Tipo de la función fetchComments
  courses: { id: number; name: string }[]; // Lista de cursos para mostrar en el selector
}

const UpdateComment: React.FC<{ comment: Comment } & UpdateCommentProps> = ({
  comment,
  fetchComments,
  courses,
}) => {
  const [nombre, setNombre] = useState(comment.nombre);
  const [fecha, setFecha] = useState(comment.fecha);
  const [comentario, setComentario] = useState(comment.comentario);
  const [courseId, setCourseId] = useState(comment.courseId); // Estado para mantener el ID del curso
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Validar datos antes de enviar la solicitud de actualización
    if (!nombre || !fecha || !comentario || !courseId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/comments/${comment.id}`,
        {
          nombre,
          fecha,
          comentario,
          courseId,
        }
      );

      router.refresh();
      setIsOpen(false);
      fetchComments();
    } catch (error) {
      console.error("Error actualizando comentario:", error);
      alert("Error actualizando comentario. Intenta de nuevo.");
    }
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
                  Selecciona un curso
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
