import express from "express"
import auth, { UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = express.Router();



router.get("/users",auth(), userController.getAllUser)
export const userRoutes = router;