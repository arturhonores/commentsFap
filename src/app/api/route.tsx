import { NextResponse } from "next/server";
import type { Comment } from "@prisma/client";
import prisma from "../../lib/prisma";

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

type CommentsResponse = {
  id: number;
  nombre: string;
  fecha: string;
  comentario: string;
}[];

export const GET = async () => {
  try {
    const comments: CommentsResponse = await prisma.comment.findMany({
      select: {
        id: true,
        nombre: true,
        fecha: true,
        comentario: true,
      },
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.error();
  }
};
