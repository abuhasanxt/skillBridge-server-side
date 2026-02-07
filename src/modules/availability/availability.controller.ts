import { Request, Response } from "express";
import { availabilityServices } from "./availability.service";

const createdAvailability = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await availabilityServices.createdAvailability(req.body,userId as string);
    res.status(201).json({
      success: true,
      message: "created availability successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "availability create failed!",
      error: error.message,
      details: error,
    });
  }
};


const getTeachingSessions=async(req:Request,res:Response)=>{
    try {
         const userId = req.user?.id;
         const result=await availabilityServices.getTeachingSessions(userId as string)
        res.status(200).json({
      success: true,
      message: "session getting successfully!",
      data: result,
    });
    } catch (error:any) {
        res.status(404).json({
      success: false,
      message: "session getting failed!",
      error: error.message,
      details: error,
    });
    }
}
export const availabilityController = {
  createdAvailability,
  getTeachingSessions
};
