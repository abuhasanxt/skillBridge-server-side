import express from "express"
import { categoryController } from "./category.controller"
import auth, { UserRole } from "../../middleware/auth"

const router=express.Router()
router.post("/admin/category",auth(UserRole.ADMIN), categoryController.createdCategory)
export const categoryRouter=router