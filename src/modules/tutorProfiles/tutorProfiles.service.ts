import { TutorProfiles } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createdTutorProfile=async(data:Omit<TutorProfiles,"id"|"createdAt"|"updatedAt"|"authorId">,userId:string)=>{
 const existingProfile = await prisma.tutorProfiles.findUnique({
    where: { authorId: userId },
  });

  if (existingProfile) {
    throw new Error("You already have a tutor profile");
  }
    const result=await prisma.tutorProfiles.create({
        data:{
            ...data,
            authorId:userId
        }
    })
    return result
}

const getAllTutors=async()=>{
    const result=await prisma.tutorProfiles.findMany()
    return result
}

export const tutorProfileServices={
    createdTutorProfile,
    getAllTutors
}