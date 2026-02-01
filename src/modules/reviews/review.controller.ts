import { Request, Response } from "express";
import { reviewServices } from "./reviews.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.id as string; 
    if (!studentId) throw new Error("Unauthorized: studentId missing");

    const { tutorId, rating, comment } = req.body;

    if (!tutorId || rating === undefined || !comment) {
      throw new Error("Missing required fields: tutorId, rating, comment");
    }

    const review = await reviewServices.createReview(studentId, {
      tutorId,
      rating: Number(rating),
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const reviewController = {
  createReview,
};
