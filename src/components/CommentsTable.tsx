import { PrismaClient } from "@prisma/client";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
import UpdateComment from "./UpdateComment";

const prisma = new PrismaClient();

const getComments = async () => {
  const res = await prisma.comment.findMany({
    select: {
      id: true,
      nombre: true,
      fecha: true,
      comentario: true,
    },
  });
  return res;
};

const CommentsTable = async () => {
  const comments = await getComments();
  return (
    <>
      <AddComment></AddComment>
      <div className="overflow-x-auto py-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Reseña</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment.id}>
                <td>{index + 1}</td>
                <td>{comment.nombre} </td>
                <td>{comment.fecha} </td>
                <td>{comment.comentario} </td>
                <td className="flex justify-center space-x-1">
                  <UpdateComment comment={comment} />
                  <DeleteComment comment={comment} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CommentsTable;
