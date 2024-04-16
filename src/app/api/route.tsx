import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Comment } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body: Comment = await request.json();
  const comment = await prisma.comment.create({
    data: {
      nombre: body.nombre,
      fecha: body.fecha,
      comentario: body.comentario,
    },
  });

  return NextResponse.json(comment, { status: 201 });
};
