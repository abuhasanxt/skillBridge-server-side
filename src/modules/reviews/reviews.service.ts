import { prisma } from "../../lib/prisma";

const createReview = async (
  studentId: string,
  payload: { categoryId: string; rating: number; comment: string },
) => {
  //  Check if category exists
  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });
  if (!category) throw new Error("Category not found");

  // Check tutor exists
  if (!category.tutorProfileId)
    throw new Error("Category does not have an assigned tutor");
  const tutor = await prisma.tutorProfiles.findUnique({
    where: { id: category.tutorProfileId },
  });
  if (!tutor) throw new Error("Tutor for this category not found");

  //  Prevent duplicate review for same category
  const alreadyReviewed = await prisma.reviews.findUnique({
    where: {
      studentId_categoryId: { studentId, categoryId: payload.categoryId },
    },
  });
  if (alreadyReviewed) throw new Error("You already reviewed this category");

  //  Create review
  const review = await prisma.reviews.create({
    data: {
      studentId,
      categoryId: payload.categoryId,
      tutorId: tutor.id, // link review to tutor
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  //  Update tutor's average rating
  const tutorReviews = await prisma.reviews.findMany({
    where: { tutorId: tutor.id },
    select: { rating: true },
  });

  const avgRating =
    tutorReviews.reduce((sum, r) => sum + r.rating, 0) / tutorReviews.length;

  await prisma.tutorProfiles.update({
    where: { id: tutor.id },
    data: { rating: avgRating },
  });

  return review;
};

const getReviews = async (userId: string) => {
  const review=await prisma.reviews.findMany()
  return review
  };
  

 

export const reviewServices = {
  createReview,
  getReviews,
};
