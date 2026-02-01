import { Request, Response } from "express";
import { userServices } from "./user.service";

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllStudent();
    res.status(200).json({
      success: true,
      message: "Student retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Student retrieved fail!",
      details: error,
    });
  }
};

export const userController = {
  getAllStudent,
};
