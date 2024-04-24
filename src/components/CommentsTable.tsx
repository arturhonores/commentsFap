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
  courseId: number;
}[];

// Definición de CoursesResponse
type CoursesResponse = {
  id: number;
  name: string;
}[];

const CommentsTable = () => {
  const [comments, setComments] = useState<CommentsResponse>([]);
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/comments`
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

  const [courses, setCourses] = useState<CoursesResponse>([]);
  const fetchCourses = async (): Promise<CoursesResponse[]> => {
    try {
      const fetchedData = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/courses`
      );
      if (fetchedData.status === 200) {
        setCourses(fetchedData.data);
        return fetchedData.data;
      } else {
        console.error("Error fetching courses:", fetchedData.statusText);
        throw new Error("Error al obtener los cursos"); // Lanzar un error en estado no 200
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error; // Re-lanzar el error para su manejo en AddComment
    }
  };

  useEffect(() => {
    fetchComments();
    fetchCourses();
  }, []);

  return (
    <>
      <AddComment
        fetchComments={fetchComments}
        courses={courses}
      />
      <div className="overflow-x-auto py-4">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center uppercase">ID</th>
              <th className="text-center uppercase">Curso</th>
              <th className="text-center uppercase">Nombre</th>
              <th className="text-center uppercase">Fecha</th>
              <th className="text-center uppercase">Reseña</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment.id}>
                <td>{index + 1}</td>
                <td>
                  {
                    courses.find((course) => course.id === comment.courseId)
                      ?.name
                  }
                </td>
                <td>{comment.nombre} </td>
                <td>{comment.fecha} </td>
                <td>{comment.comentario} </td>
                <td className="flex justify-center space-x-1">
                  <UpdateComment
                    comment={comment}
                    fetchComments={fetchComments}
                    courses={courses}
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
