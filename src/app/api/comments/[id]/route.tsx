import { NextResponse } from "next/server";
import type { Comment } from "@prisma/client";
import prisma from "@/lib/prisma";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Comment = await request.json();
  const comment = await prisma.comment.update({
    where: {
      id: Number(params.id),
    },
    data: {
      nombre: body.nombre,
      fecha: body.fecha,
      comentario: body.comentario,
    },
  });

  return NextResponse.json(comment, { status: 200 });
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
