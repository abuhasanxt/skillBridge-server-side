import { Request, Response } from "express";
import { tutorProfileServices } from "./tutorProfiles.service";

const createdTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const result = await tutorProfileServices.createdTutorProfile(
      {
        ...req.body,
      },
      userId,
    );

    res.status(201).json({
      success: true,
      message: "Tutor profile created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Tutor profile creation failed",
      error: error.message,
    });
  }
};

// POST /tutor/assign-categories
const assignCategory = async (req: Request, res: Response) => {
  try {
    const tutorId = req.user?.id;
    const { categoryIds } = req.body || {};

    if (!tutorId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (
      !categoryIds ||
      !Array.isArray(categoryIds) ||
      categoryIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No categories provided",
      });
    }

    const result = await tutorProfileServices.assignCategoriesToTutor(
      tutorId,
      categoryIds,
    );

    res.status(200).json({
      success: true,
      message: "Categories assigned successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to assign categories",
      error: error.message,
    });
  }
};

const removeCategoriesTutor = async (req: Request, res: Response) => {
  try {
    const tutorId = req.user?.id;
    const { categoryIds } = req.body;
    if (!tutorId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const result = await tutorProfileServices.removeCategoriesTutor(
      tutorId,
      categoryIds,
    );

    res.status(200).json({
      success: true,
      message: "Categories removed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to remove categories",
      error: error.message,
    });
  }
};

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const categories=req.query.categories? (req.query.categories as string).split(","):[]
    const result = await tutorProfileServices.getAllTutors({
      search: searchString,
      categories 
    });
    res.status(200).json({
      success: true,
      message: "Tutor retrieved successfully !",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Tutor retrieved fail",
      details: error,
    });
  }
};
export const tutorProfileController = {
  createdTutorProfile,
  getAllTutors,
  assignCategory,
  removeCategoriesTutor,
};
