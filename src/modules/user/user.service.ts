import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/auth"
//get all user
const getAllStudent=async()=>{
    const result=await prisma.user.findMany({
       where:{
        role:UserRole.STUDENT
       }
        
    })

    return result
}

export const userServices={
    getAllStudent
}