import { prisma } from "../../lib/prisma"
//get all user
const getAllUser=async()=>{
    const result=await prisma.user.findMany()

    return result
}

export const userServices={
    getAllUser
}