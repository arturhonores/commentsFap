import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const POST = async (request: Request) => {
  try {
    // Lee y valida la entrada de la solicitud
    const body = await request.json();
    // Validar los campos requeridos
    if (
      !body.nombre ||
      !body.fecha ||
      !body.comentario ||
      typeof body.courseId !== "number"
    ) {
      return NextResponse.json(
        { error: "Datos incompletos o incorrectos" },
        { status: 400 }
      );
    }
    // Crear el comentario en la base de datos
    const comment = await prisma.comment.create({
      data: {
        nombre: body.nombre,
        fecha: body.fecha,
        comentario: body.comentario,
        courseId: body.courseId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creando comentario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};

type CommentsResponse = {
  id: number;
  nombre: string;
  fecha: string;
  comentario: string;
  courseId: number;
  course: {
    id: number;
    name: string;
  };
}[];

export const GET = async () => {
  try {
    const comments: CommentsResponse = await prisma.comment.findMany({
      select: {
        id: true,
        nombre: true,
        fecha: true,
        comentario: true,
        courseId: true,
        course: true,
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.error();
  }
};
