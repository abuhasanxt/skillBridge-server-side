import { TutorProfiles } from "../../../generated/prisma/client";
import { TutorProfilesWhereInput } from "../../../generated/prisma/models";
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
  if (!categoryIds || !Array.isArray(categoryIds) || categoryIds.length === 0) {
    throw new Error("No categories provided");
  }
  // Fetch tutor profile
  const tutor = await prisma.tutorProfiles.findUnique({
    where: { authorId: tutorId },
  });

  if (!tutor) throw new Error("Tutor profile not found");

  // 3️⃣ Check if all categoryIds exist in DB
  const existingCategories = await prisma.category.findMany({
    where: {
      id: { in: categoryIds },
    },
    select: { id: true },
  });
  const existingCategoryIds = existingCategories.map((c) => c.id);

  if (existingCategoryIds.length !== categoryIds.length) {
    const invalidIds = categoryIds.filter(
      (id) => !existingCategoryIds.includes(id),
    );

    throw new Error(`Invalid category IDs: ${invalidIds.join(", ")}`);
  }

  //  Check already assigned categories
  const alreadyAssigned = await prisma.tutorCategory.findMany({
    where: {
      tutorId: tutor.id,
      categoryId: { in: categoryIds },
    },
  });

  if (alreadyAssigned.length > 0) {
    const alreadyAssignedIds = alreadyAssigned.map((r) => r.categoryId);
    throw new Error(
      `These categories are already assigned: ${alreadyAssignedIds.join(", ")}`,
    );
  }
  // Assign categories
  await prisma.tutorCategory.createMany({
    data: categoryIds.map((categoryId) => ({
      tutorId: tutor.id,
      categoryId,
    })),
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
      categoryId: { in: existingRelations.map((r) => r.categoryId) },
    },
  });

  // Return updated categories
  const updatedCategories = await prisma.tutorCategory.findMany({
    where: { tutorId: tutor.id },
    include: { category: true },
  });
  return updatedCategories;
};

const getAllTutors = async ({
  search,
  subject,
}: {
  search?: string |undefined;
  subject: string[] | [];
}) => {
  const andCondition:TutorProfilesWhereInput []= [];
  if (search) {
    andCondition.push({
      // subject search
      subject: {
        has: search,
      },
    });
  }

  if (subject.length>0) {
    andCondition.push({
      //subject filtering
          subject: {
            hasEvery: subject as string[],
          },
        },)
  }
  const result = await prisma.tutorProfiles.findMany({
    where: {
      AND:andCondition
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
