import { TutorProfiles } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type TutorProfilePayload = Omit<
  TutorProfiles,
  "id" | "authorId" | "createdAt" | "updatedAt"
> & { categoryIds: string[] }; // Tutor can select multiple categories
const createdTutorProfile = async (
  data: TutorProfilePayload,
  userId: string,
) => {
  // Check if tutor already has profile
  const existingProfile = await prisma.tutorProfiles.findUnique({
    where: { authorId: userId },
  });

  if (existingProfile) throw new Error("You already have a tutor profile");

  return prisma.tutorProfiles.create({
    data: {
      bio: data.bio,
      subject: data.subject,
      price: data.price,
      rating: data.rating,
      authorId: userId,
      categories: {
        connect: data.categoryIds.map((id) => ({ id })), // connect to existing categories
      },
    },
    include: {
      categories: true, // return categories with profile
    },
  });
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
