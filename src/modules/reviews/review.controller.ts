import { NextFunction, Request, Response } from "express";
import { reviewServices } from "./reviews.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { categoryId, rating, comment } = req.body;

    if (!categoryId || rating === undefined || !comment) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: categoryId, rating, comment",
      });
    }

    const review = await reviewServices.createReview(studentId, {
      categoryId,
      rating: Number(rating),
      comment,
     
    });

    res.status(201).json({
      success: true,
      message: "Category review submitted successfully!",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const getMyReviews=async(req:Request,res:Response,next:NextFunction)=>{
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
   next(error)
  }
}
export const reviewController = {
  createReview,
  getMyReviews
};
