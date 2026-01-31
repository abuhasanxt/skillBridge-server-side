import express from "express";
import { tutorProfileController } from "./tutorProfiles.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post(
  "/profile",
  auth(UserRole.TUTOR),
  tutorProfileController.createdTutorProfile,
);
export const tutorProfileRouter = router;
