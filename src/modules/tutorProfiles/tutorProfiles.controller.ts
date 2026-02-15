import { Request, Response } from "express";
import { tutorProfileServices } from "./tutorProfiles.service";


const createdTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const result = await tutorProfileServices.createdTutorProfile({
      ...req.body,
      categoryIds: req.body.categoryIds, 
    }, userId);

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










const getAllTutors = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const result = await tutorProfileServices.getAllTutors({
      search: searchString,
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
};
