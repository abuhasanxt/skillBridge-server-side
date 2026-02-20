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
router.post(
  "/tutor/categories",
  auth(UserRole.TUTOR),
  tutorProfileController.assignCategory,
);
router.put("/tutor/profile", auth(), tutorProfileController.updateTutorProfile);

router.delete(
  "/tutor/categories",
  auth(UserRole.TUTOR),
  tutorProfileController.removeCategoriesTutor,
);
export const tutorProfileRouter = router;
