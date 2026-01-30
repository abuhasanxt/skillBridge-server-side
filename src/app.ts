import express, { Request, Response } from "express"
import { tutorProfileRouter } from "./modules/tutorProfiles/tutorProfiles.route"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app =express()
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json())

app.use("/tutor",tutorProfileRouter)
app.get("/",(req:Request,res:Response)=>{
    res.send("Skill Bridge!")
})

export default app