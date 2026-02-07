import { prisma } from "../../lib/prisma";

type CreateReviewInput = {
  tutorId: string;
  rating: number;
  comment: string;
};

const createReview = async (studentId: string, data: CreateReviewInput) => {
  const tutorExists = await prisma.tutorProfiles.findUnique({
    where: { id: data.tutorId },
  });

  if (!tutorExists) throw new Error("Tutor not found");

  const alreadyReviewed = await prisma.reviews.findUnique({
    where: {
      studentId_tutorId: {
        studentId,
        tutorId: data.tutorId,
      },
    },
  });

  if (alreadyReviewed) throw new Error("You already reviewed this tutor");

  const review = await prisma.reviews.create({
    data: {
      studentId,
      tutorId: data.tutorId,
      rating: data.rating,
      comment: data.comment,
    },
  });

  const reviews = await prisma.reviews.findMany({
    where: { tutorId: data.tutorId },
    select: { rating: true },
  });

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await prisma.tutorProfiles.update({
    where: { id: data.tutorId },
    data: { rating: avgRating },
  });

  return review;
};

const getMyReviews = async (userId: string) => {
  const tutorProfile = await prisma.tutorProfiles.findUnique({
    where: { authorId: userId },
  });
  if (!tutorProfile) throw new Error("Tutor profile not found");

  const reviews = await prisma.reviews.findMany({
    where: { tutorId: tutorProfile.id },
    include: {
      user: { select: {  name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

 

  return reviews 
};

export const reviewServices = {
  createReview,
  getMyReviews,
};
