import express, { Request, Response } from "express"
import { tutorProfileRouter } from "./modules/tutorProfiles/tutorProfiles.route"

const app =express()
app.use(express.json())
app.use("/posts",tutorProfileRouter)
app.get("/",(req:Request,res:Response)=>{
    res.send("Hello world!")
})

export default app