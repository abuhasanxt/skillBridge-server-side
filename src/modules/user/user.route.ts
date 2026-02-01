import express from "express";
import auth, { UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/students", auth(UserRole.STUDENT), userController.getAllStudent);
router.get("/tutors",auth(), userController.getAllTutor);
export const userRoutes = router;
