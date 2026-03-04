import { prisma } from "../../lib/prisma";

const createdCategory = async (payload: any, userId: string) => {
  const tutorProfiles = await prisma.tutorProfiles.findUnique({
    where: { authorId: userId },
  });

  if (!tutorProfiles) {
    throw new Error("Tutor Profile not found!");
  }

  const result = await prisma.category.create({
    data: {
      ...payload,
      tutorProfileId: tutorProfiles.id,
    },
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany({
    include: {
      tutors: true,
      review: {
        select: {
          user: {
            select:{
              name:true
            }
          },
          rating: true,
          comment: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return result;
};

export const categoryServices = {
  createdCategory,
  getAllCategory,
};
