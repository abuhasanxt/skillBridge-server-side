import { NextFunction, Request, Response } from "express";
import { BookingServices } from "./booking.service";
import { prisma } from "../../lib/prisma";

const createdBooking = async (req: Request, res: Response) => {
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
 res.status(500).json({
      success: false,
      message: "Booking failed !",
      error:error.message,
      details:error
     
    });
  }
}

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


const getTutorBookings = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized!",
      });
    }
    const result = await BookingServices.getTutorBookings(user.id);
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
const bookingStatusUpdate=async (req:Request,res:Response)=>{
 try {
    const { bookingId } = req.params;
    const { status } = req.body;

   if (!req.user?.id) {
  throw new Error("Unauthorized");
}
    const tutorProfile = await prisma.tutorProfiles.findUnique({
      where: {authorId: req.user?.id },
    });

    if (!tutorProfile) {
      throw new Error("Tutor profile not found");
    }

    const result = await BookingServices.bookingStatusUpdate(
      bookingId as string,
      tutorProfile.id,
      status
    );

    res.status(200).json({
      success: true,
      message: "Status updated successfully!",
      data: result,
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}





export const bookingController = {
  createdBooking,
  getMyBookings,
  getAllBookings,
  getTutorBookings,
  bookingStatusUpdate
};
