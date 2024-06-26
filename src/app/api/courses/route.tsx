//revisar api de cursos no se actualiza automáticamente en producción, solo cuando hace un push al repo
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

type CoursesResponse = {
  id: number;
  name: string;
}[];

export const GET = async () => {
  console.log("Solicitudes a /api/courses recibida");
  try {
    const courses: CoursesResponse = await prisma.course.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    console.log("Cursos obtenidos:", courses); // Comprobar si se obtienen datos recientes
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo cursos:", error);
    return NextResponse.error();
  }
};
