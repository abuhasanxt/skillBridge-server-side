import express from "express";
import { tutorProfileController } from "./tutorProfiles.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/tutor/profile", tutorProfileController.getAllTutors);
router.post(
  "/api/tutor/profile",
  auth(UserRole.TUTOR),
  tutorProfileController.createdTutorProfile,
);
router.put("/tutor/profile", auth(), tutorProfileController.updateTutorProfile);

export const tutorProfileRouter = router;
