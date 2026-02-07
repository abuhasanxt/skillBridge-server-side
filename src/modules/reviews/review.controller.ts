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

const getMyReviews=async(req:Request,res:Response)=>{
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const result = await reviewServices.getMyReviews(userId)

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
}
export const reviewController = {
  createReview,
  getMyReviews
};
