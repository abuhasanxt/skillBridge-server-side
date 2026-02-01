import express from "express";
import { reviewController } from "./review.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post("/reviews",auth(UserRole.STUDENT), reviewController.createReview);

export const reviewRouter = router;
