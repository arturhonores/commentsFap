"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddComment from "./AddComment";
import DeleteComment from "./DeleteComment";
import UpdateComment from "./UpdateComment";

// Definición de CommentsResponse
type CommentsResponse = {
  id: number;
  nombre: string;
  fecha: string;
  comentario: string;
}[];

const CommentsTable = () => {
  const [comments, setComments] = useState<CommentsResponse>([]);
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api`
      ); // Realiza la solicitud GET usando Axios
      if (response.status === 200) {
        setComments(response.data); // Establece los comentarios en el estado
      } else {
        console.error("Error fetching comments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <AddComment fetchComments={fetchComments} />
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
                  <UpdateComment
                    comment={comment}
                    fetchComments={fetchComments}
                  />
                  <DeleteComment
                    comment={comment}
                    fetchComments={fetchComments}
                  />
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
