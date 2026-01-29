import { Request, Response } from "express";
import { tutorProfileServices } from "./tutorProfiles.service";

const createdTutorProfile = async (req: Request, res: Response) => {
  try {
    const result = await tutorProfileServices.createdTutorProfile(req.body);
    res.status(201).json({
      success: true,
      message: "tutorProfile created successfully !",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "post creation fail",
      details: error,
    });
  }
};

export const tutorProfileController = {
  createdTutorProfile,
};
