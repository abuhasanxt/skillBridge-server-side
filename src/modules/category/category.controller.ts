import { Request, Response } from "express"
import { categoryServices } from "./category.service"

const createdCategory=async(req:Request,res:Response)=>{
try {
   
    const result=await categoryServices.createdCategory(req.body )
   res.status(201).json({
    success:true,
    message:"Category created successfully",
    data:result
   }) 
} catch (error:any) {
    res.status(500).json({
        success:false,
        message:"Category created failed!",
        error:error.message,
        details:error
    })
}
}

export const categoryController={
    createdCategory
}