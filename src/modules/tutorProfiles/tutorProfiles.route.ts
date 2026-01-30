import express, { Request, Response } from "express"
import { tutorProfileController } from "./tutorProfiles.controller"

const router =express.Router()

router.post("/profile",tutorProfileController.createdTutorProfile)
export const tutorProfileRouter=router