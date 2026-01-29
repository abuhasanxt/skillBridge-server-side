import { TutorProfiles } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createdTutorProfile=async(data:Omit<TutorProfiles,"id"|"createdAt"|"updatedAt">)=>{

    const result=await prisma.tutorProfiles.create({
        data
    })
    return result
}

export const tutorProfileServices={
    createdTutorProfile
}