import { Day } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
type Payload = {
  day: Day;
  startTime: Date;
  endTime: Date;
};
const createdAvailability = async (data: Payload, userId: string) => {
  if (data.startTime >= data.endTime) {
    throw new Error("Start time must be before end time");
  }

  const tutorProfile = await prisma.tutorProfiles.findUnique({
    where: {
      authorId: userId,
    },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }

  const sameTime = await prisma.tutorAvailability.findFirst({
    where: {
      tutorProfileId: tutorProfile.id,
      day: data.day,
      AND: [
        {
          startTime: { lt: data.endTime },
        },
        {
          endTime: { gt: data.startTime },
        },
      ],
    },
  });

  if (sameTime) {
    throw new Error("This time slot already exists");
  }

  const result = await prisma.tutorAvailability.create({
    data: {
      tutorProfileId: tutorProfile.id,
      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
    },
  });

  return result;
};

export const availabilityServices = {
  createdAvailability,
};
