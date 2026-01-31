import express from "express";
import { tutorProfileController } from "./tutorProfiles.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post(
  "/api/tutor/profile",
  auth(UserRole.TUTOR),
  tutorProfileController.createdTutorProfile,
);

router.get("/tutors",tutorProfileController.getAllTutors)
export const tutorProfileRouter = router;
