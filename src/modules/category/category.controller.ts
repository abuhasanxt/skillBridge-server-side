import { NextFunction, Request, Response } from "express";
import { categoryServices } from "./category.service";

const createdCategory = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const userId=req.user?.id
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can create category",
      });
    }

    const result = await categoryServices.createdCategory(req.body,userId as string);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error: any) {
    next(error)
  }
};


const getAllCategory=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const result=await categoryServices.getAllCategory()
    res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: result,
    });
  } catch (error:any) {
    next(error)
  }
}
export const categoryController = {
  createdCategory,
  getAllCategory
};
