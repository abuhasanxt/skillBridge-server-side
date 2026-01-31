import express, { Request, Response } from "express"
import { tutorProfileRouter } from "./modules/tutorProfiles/tutorProfiles.route"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors"

const app =express()
app.use(cors({
    origin:process.env.APP_URL,
    credentials:true
}))
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json())

app.use("/",tutorProfileRouter)
app.get("/",(req:Request,res:Response)=>{
    res.send("Skill Bridge!")
})

export default app