import { Request, Response } from "express";
import { tutorProfileServices } from "./tutorProfiles.service";

const createdTutorProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized!",
      });
    }
    const result = await tutorProfileServices.createdTutorProfile(
      req.body,
      user.id as string,
    );
    res.status(201).json({
      success: true,
      message: "tutorProfile created successfully !",
      data: result,
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: "post creation fail",
      error:error.message,
      details: error,
    });
  }
};

const getAllTutors = async (req:Request,res:Response) => {
  try {
    const result = await tutorProfileServices.getAllTutors();
     res.status(200).json({
      success: true,
      message: "Tutor retrieved successfully !",
      data: result,
    });

  } catch (error) {
    res.status(404).json({
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
