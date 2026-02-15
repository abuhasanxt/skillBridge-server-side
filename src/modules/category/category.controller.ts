import { Request, Response } from "express";
import { categoryServices } from "./category.service";

const createdCategory = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can create category",
      });
    }

    const result = await categoryServices.createdCategory(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Category creation failed!",
      error: error.message,
      details: error,
    });
  }
};

export const categoryController = {
  createdCategory,
};
