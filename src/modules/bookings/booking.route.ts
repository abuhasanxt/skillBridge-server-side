import express from "express"
import { bookingController } from "./booking.controller"
import auth, { UserRole } from "../../middleware/auth"


const router=express.Router()
router.post("/bookings",auth(UserRole.STUDENT) ,bookingController.createdBooking)
export const bookingRouter=router