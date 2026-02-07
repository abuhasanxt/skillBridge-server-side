import express from "express";
import { availabilityController } from "./availability.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post(
  "/availability",
  auth(UserRole.TUTOR),
  availabilityController.createdAvailability,
);

router.get("/api/tutor/bookings",auth(UserRole.TUTOR),availabilityController.getTeachingSessions)
export const availabilityRouter = router;
