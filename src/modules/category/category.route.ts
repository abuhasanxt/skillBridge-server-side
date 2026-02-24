import express from "express"
import { categoryController } from "./category.controller"
import auth, { UserRole } from "../../middleware/auth"

const router=express.Router()
router.post("/category",auth(UserRole.TUTOR), categoryController.createdCategory)
router.get("/api/categories",categoryController.getAllCategory)
export const categoryRouter=router