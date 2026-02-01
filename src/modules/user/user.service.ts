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

export const userServices = {
  getAllStudent,
  getAllTutor,
};
