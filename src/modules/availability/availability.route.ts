import express from "express"
import { availabilityController } from "./availability.controller"
import auth, { UserRole } from "../../middleware/auth"

const router=express.Router()

router.post("/availability",auth(UserRole.TUTOR) ,availabilityController.createdAvailability)
export const availabilityRouter=router