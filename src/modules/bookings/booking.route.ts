import express from "express";
import { bookingController } from "./booking.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();
router.post(
  "/bookings",
  auth(UserRole.STUDENT),
  bookingController.createdBooking,
);
router.get(
  "/bookings",
  auth(UserRole.STUDENT),
  bookingController.getMyBookings,
);
router.get(
  "/allBookings",
  auth(UserRole.ADMIN),
  bookingController.getAllBookings,
);

router.put(
  "/bookings/:bookingId",
  auth(UserRole.TUTOR),
  bookingController.bookingStatusUpdate,
);
export const bookingRouter = router;
