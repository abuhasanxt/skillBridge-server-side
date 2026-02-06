import express, { Request, Response } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/students", auth(UserRole.STUDENT), userController.getAllStudent);
router.get("/tutors", userController.getAllTutor);
router.get("/tutors/:id", userController.getTutorDetails);
router.put("/me", auth(), userController.updateOwnProfile);
router.get("/me",auth(),userController.getOwnProfile)

export const userRoutes = router;
