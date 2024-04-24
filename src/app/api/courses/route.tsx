import { NextResponse } from "next/server";
import type { Comment, Course } from "@prisma/client";
import prisma from "../../../lib/prisma";

type CoursesResponse = {
  id: number;
  name: string;
}[];

export const GET = async () => {
  try {
    const courses: CoursesResponse = await prisma.course.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo cursos:", error);
    return NextResponse.error();
  }
};
