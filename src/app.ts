import express, { Request, Response } from "express"
import { tutorProfileRouter } from "./modules/tutorProfiles/tutorProfiles.route"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors"
import { userRoutes } from "./modules/user/user.route";
import { reviewRouter } from "./modules/reviews/review.route";
import { bookingRouter } from "./modules/bookings/booking.route";
import { availabilityRouter } from "./modules/availability/availability.route";
import { categoryRouter } from "./modules/category/category.route";
import { notFound } from "./middleware/notFound";


const app =express()
app.use(cors({
    origin:process.env.APP_URL, //client side url
    credentials:true
}))
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json())

app.use("/",tutorProfileRouter)
app.use("/api",userRoutes)
app.use("/api",reviewRouter)
app.use("/api",bookingRouter)
app.use("/",availabilityRouter)
app.use("/",categoryRouter)
app.get("/",(req:Request,res:Response)=>{
    res.send("Skill Bridge!")
})

app.use(notFound)
export default app