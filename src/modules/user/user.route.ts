import express, { Request, Response } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/students", auth(UserRole.STUDENT), userController.getAllStudent);
router.get("/admin/users", auth(UserRole.ADMIN), userController.getAllUser);
router.get("/me", auth(), userController.getOwnProfile);
router.get("/tutors", userController.getAllTutor);
router.get("/tutors/:id", userController.getTutorDetails);
router.put("/me", auth(), userController.updateOwnProfile);
router.put("/isBanned/:id",auth(UserRole.ADMIN),userController.isBanned)
router.put("/role/:id",auth(UserRole.ADMIN),userController.changeUserRole)

export const userRoutes = router;
