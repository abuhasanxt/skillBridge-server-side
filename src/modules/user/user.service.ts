import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/auth";
//get all Student
const getAllStudent = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: UserRole.STUDENT,
    },
  });

  return result;
};
//get all tutor
const getAllTutor = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: UserRole.TUTOR,
    },
  });
  return result;
};

//get tutor details
const getTutorDetails = async (id: string) => {
  const result = await prisma.user.findFirst({
    where: {
      id: id,
      role: UserRole.TUTOR,
    },
    include: {
      tutorProfile: {
        include: {
          reviews: true,
          categories:true
        },
      },
    },
  });
  return result;
};
const getOwnProfile=async(userId:string)=>{
  const result =await prisma.user.findUnique({
    where:{
      id:userId
    }
  })
  return result
}


//update own profile
type UpdateUserPayload = {
  name: string;
  image: string;
  phone: string;
};

const updateOwnProfile = async (id: string, payload: UpdateUserPayload) => {
  const allowedData: UpdateUserPayload = {
    name: payload.name,
    image: payload.image,
    phone: payload.phone,
  };

  return prisma.user.update({
    where: { id },
    data: allowedData,
  });
};

export const userServices = {
  getAllStudent,
  getAllTutor,
  getTutorDetails,
  updateOwnProfile,
  getOwnProfile
};
