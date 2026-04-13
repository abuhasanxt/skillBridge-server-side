import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/auth";
//get all user
const getAllUser = async () => {
  return await prisma.user.findMany();
};
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
          categories: true,
        },
      },
    },
  });
  return result;
};
const getOwnProfile = async (userId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      tutorProfile: true,
    },
  });
  return result;
};

//update own profile
// type UpdateUserPayload = {
//   name: string;
//   image: string;
//   phone: string;

//     bio?: string;
//   hourlyPrice?: number;
//   subject?: string[];
// };

// const updateOwnProfile = async (id: string, payload: UpdateUserPayload) => {

//   const user =await prisma.user.findUnique({
//     where:{id},
//     include:{
//       tutorProfile:true
//     }
//   })
//   if (!user) {
//     throw new Error("User not found");
//   }
//   const userData: UpdateUserPayload = {
//     name: payload.name,
//     image: payload.image,
//     phone: payload.phone,
//   };

//   if (user.tutorProfile) {
//     return prisma.user.update({
//       where:{id},
//       data:{
//         ...userData,
//         tutorProfile:{
//           update:{
//             bio:payload.bio?? undefined,
//             hourlyPrice:payload.hourlyPrice??undefined,
//             subject:payload.subject?? undefined
//           }
//         }
//       },
//       include:{
//         tutorProfile:true
//       }
//     })
//   }

//   return prisma.user.update({
//     where: { id },
//     data: userData,
//   });
// };

// update own profile
type UpdateUserPayload = {
  name?: string;
  image?: string;
  phone?: string;

  bio?: string;
  hourlyPrice?: number;
  subject?: string[];
};

const updateOwnProfile = async (id: string, payload: UpdateUserPayload) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      tutorProfile: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // user data
  const userData: any = {};
  if (payload.name) userData.name = payload.name;
  if (payload.image) userData.image = payload.image;
  if (payload.phone) userData.phone = payload.phone;

  const profileData: any = {};
  if (payload.bio !== undefined) profileData.bio = payload.bio;
  if (payload.hourlyPrice !== undefined)
    profileData.hourlyPrice = payload.hourlyPrice;
  if (payload.subject !== undefined) profileData.subject = payload.subject;
  if (user.tutorProfile) {
    return prisma.user.update({
      where: { id },
      data: {
        ...userData,
        ...(Object.keys(profileData).length > 0 && {
          tutorProfile: {
            update: profileData,
          },
        }),
      },
      include: {
        tutorProfile: true,
      },
    });
  }
  return prisma.user.update({
    where: { id },
    data: userData,
  });
};
export const userServices = {
  getAllUser,
  getAllStudent,
  getAllTutor,
  getTutorDetails,
  updateOwnProfile,
  getOwnProfile,
};
