import { NextFunction, Request, Response } from "express";
import { BookingServices } from "./booking.service";

const createdBooking = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized!",
      });
    }
    const result = await BookingServices.createdBooking(
      req.body,
      user.id as string,
    );
    res.status(201).json({
      success: true,
      message: "Booking successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error)
  }
};

const getMyBookings = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized!",
      });
    }
    const result = await BookingServices.getMyBookings(user.id);
    res.status(201).json({
      success: true,
      message: "Get my booking retrieved successfully !",
      data: result,
    });
  } catch (error: any) {
    next(error)
  }
};

const getAllBookings=async (req:Request,res:Response,next:NextFunction)=>{
 try {
    const result = await BookingServices.getAllBookings();
    res.status(201).json({
      success: true,
      message: "Get booking retrieved successfully !",
      data: result,
    });
  } catch (error: any) {
   
    next(error)
  }
}
export const bookingController = {
  createdBooking,
  getMyBookings,
  getAllBookings
};
