import { Day } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
type Payload = {
  day: Day;
  startTime: Date;
  endTime: Date;
};
const createdAvailability = async (data: Payload, userId: string) => {
  const start = new Date(data.startTime);
  const end = new Date(data.endTime);

  if (start >= end) {
    throw new Error("Start time must be before end time");
  }

  const tutorProfile = await prisma.tutorProfiles.findUnique({
    where: { authorId: userId },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }

  const sameTime = await prisma.tutorAvailability.findFirst({
    where: {
      tutorProfileId: tutorProfile.id,
      day: data.day,
      AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
    },
  });

  if (sameTime) {
    throw new Error("This time slot already exists");
  }

  const result = await prisma.tutorAvailability.create({
    data: {
      tutorProfileId: tutorProfile.id,
      day: data.day,
      startTime: start,
      endTime: end,
    },
  });

  return result;
};

const getTeachingSessions = async (userId: string) => {
  const tutorProfile = await prisma.tutorProfiles.findUnique({
    where: { authorId: userId },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }

  return prisma.bookings.findMany({
    where: {
      tutorId: tutorProfile.id,
      status: {
        in: ["CONFIRMED", "COMPLETED"],
      },
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const availabilityServices = {
  createdAvailability,
  getTeachingSessions,
};
