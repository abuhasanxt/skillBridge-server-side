import express from "express"
import { categoryController } from "./category.controller"
import auth from "../../middleware/auth"

const router=express.Router()
router.post("/category",auth(), categoryController.createdCategory)
export const categoryRouter=router