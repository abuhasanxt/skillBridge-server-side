import { TutorProfiles } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type TutorProfilePayload = Omit<
  TutorProfiles,
  "id" | "authorId" | "createdAt" | "updatedAt"
>;
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
    },
  });
};

const assignCategoriesToTutor = async (
  tutorId: string,
  categoryIds: string[],
) => {
  // Fetch tutor profile
  const tutor = await prisma.tutorProfiles.findUnique({
    where: { authorId: tutorId },
  });

  if (!tutor) throw new Error("Tutor profile not found");

  // Assign categories (skip duplicates)
  await prisma.tutorCategory.createMany({
    data: categoryIds.map((categoryId) => ({
      tutorId: tutor.id,
      categoryId,
    })),
    skipDuplicates: true,
  });

  // Return updated categories
  const updatedCategories = await prisma.tutorCategory.findMany({
    where: { tutorId: tutor.id },
    include: { category: true },
  });

  return updatedCategories;
};

const removeCategoriesTutor = async (
  tutorUserId: string,
  categoryIds: string[],
) => {
  
  if (!categoryIds || !Array.isArray(categoryIds) || categoryIds.length === 0) {
    throw new Error("No categories Provided");
  }
  //find tutor profile
  const tutor = await prisma.tutorProfiles.findUnique({
    where: { authorId: tutorUserId },
  });

  if (!tutor) {
    throw new Error("Tutor profile not found");
  }

  //  Check which categories are actually assigned
  const existingRelations = await prisma.tutorCategory.findMany({
    where: {
      tutorId: tutor.id,
      categoryId: { in: categoryIds },
    },
  });
 if (existingRelations.length === 0) {
    throw new Error("These categories are not assigned to this tutor");
  }

 //  Remove only assigned ones
  await prisma.tutorCategory.deleteMany({
    where: {
      tutorId: tutor.id,
      categoryId: { in: existingRelations.map(r => r.categoryId) },
    },
  });

 // Return updated categories
  const updatedCategories = await prisma.tutorCategory.findMany({
    where: { tutorId: tutor.id },
    include: { category: true },
  });
  return updatedCategories;
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
  assignCategoriesToTutor,
  removeCategoriesTutor,
};
