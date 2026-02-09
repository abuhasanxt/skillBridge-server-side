import { TutorProfiles } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createdTutorProfile = async (
  data: Omit<TutorProfiles, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string,
) => {
  const existingProfile = await prisma.tutorProfiles.findUnique({
    where: { authorId: userId },
  });

  if (existingProfile) {
    throw new Error("You already have a tutor profile");
  }
  const result = await prisma.tutorProfiles.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  return result;
};

const getAllTutors = async (payload: { search?: string | undefined }) => {
  const search = payload.search?.trim();

  if (!search) {
    return prisma.tutorProfiles.findMany();
  }

  const numericValue = Number(search);
  const isNumber = !isNaN(numericValue);

  const result = await prisma.tutorProfiles.findMany({
    where: {
      OR: [
        // subject search
        {
          subject: {
            has: search,
          },
        },

        // rating filter
        ...(isNumber
          ? [
              {
                rating: {
                  gte: numericValue,
                },
              },
            ]
          : []),

        // price filter
        ...(isNumber
          ? [
              {
                price: {
                  gte: numericValue,
                },
              },
            ]
          : []),
      ],
    },
    orderBy: {
      rating: "desc",
    },
  });

  return result;
};

export const tutorProfileServices = {
  createdTutorProfile,
  getAllTutors,
};
