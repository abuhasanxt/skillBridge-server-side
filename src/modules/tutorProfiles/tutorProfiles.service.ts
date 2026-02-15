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

export const assignCategoriesToTutor = async (
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


// type RemoveCategoryPayload = {
//   categoryIds: string[]; // এক বা একাধিক category remove করতে পারবে
// };

// export const removeCategoriesFromTutor = async (
//   tutorId: string,
//   payload: RemoveCategoryPayload
// ) => {
//   const tutor = await prisma.tutorProfiles.findUnique({
//     where: { id: tutorId },
//   });

//   if (!tutor) throw new Error("Tutor profile not found");

//   const result = await prisma.tutorProfiles.update({
//     where: { id: tutorId },
//     data: {
//       categories: {
//         disconnect: payload.categoryIds.map((id) => ({ categoryId: id })),
//       },
//     },
//     include: {
//       categories: {
//         include: {
//           category: true,
//         },
//       },
//     },
//   });

//   return result;
// };

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
};
