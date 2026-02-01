import { Request, Response } from "express";
import { userServices } from "./user.service";

const getAllUser=async(req:Request,res:Response)=>{
    try {
        const result=await userServices.getAllUser()
        res.status(200).json({
            success:true,
            message:"User retrieved successfully!",
            data:result,

        })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"User retrieved fail!",
            details:error
        })
    }
}

export const userController={
    getAllUser
}