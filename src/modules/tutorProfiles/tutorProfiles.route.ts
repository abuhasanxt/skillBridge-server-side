import express from "express";
import { tutorProfileController } from "./tutorProfiles.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post(
  "/api/tutor/profile",
  auth(UserRole.TUTOR),
  tutorProfileController.createdTutorProfile,
);
router.post(
  "/tutor/categories",
  auth(UserRole.TUTOR),
  tutorProfileController.assignCategory,
);

router.get("/tutor/profile",tutorProfileController.getAllTutors)
export const tutorProfileRouter = router;
