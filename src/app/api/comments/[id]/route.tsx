import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // Verificar que el ID sea un número válido
    const commentId = Number(params.id);
    if (isNaN(commentId)) {
      return NextResponse.json({ error: "ID no válido" }, { status: 400 });
    }

    // Leer y validar el cuerpo de la solicitud
    const body = await request.json();
    const { nombre, fecha, comentario, courseId } = body;

    if (!nombre || !fecha || !comentario || typeof courseId !== "number") {
      return NextResponse.json(
        { error: "Datos incompletos o incorrectos" },
        { status: 400 }
      );
    }

    // Actualizar el comentario
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { nombre, fecha, comentario, courseId },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    console.error("Error actualizando comentario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const comment = await prisma.comment.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(comment, { status: 200 });
};
