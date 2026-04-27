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
  "/tutor-bookings",
  auth(UserRole.TUTOR),
  bookingController.getTutorBookings,
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

router.put("/booking/:bookingId", auth(UserRole.ADMIN), bookingController.bookingsStatusUpdate);
export const bookingRouter = router;
