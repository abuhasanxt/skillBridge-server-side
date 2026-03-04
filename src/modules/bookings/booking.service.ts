import { Bookings } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createdBooking = async (
  payload: Omit<Bookings, "id" | "createdAt" | "updatedAt">,
  studentId: string,
) => {
  const exists = await prisma.bookings.findUnique({
    where: {
      id: studentId,
    },
  });
  if (exists) {
    throw new Error(" You are already booked ");
  }

  const tutor = await prisma.tutorProfiles.findUnique({
    where: {
      id: payload.tutorId,
    },
  });
  if (!tutor) {
    throw new Error(" Tutor Profile not found ");
  }
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });
  if (!category) {
    throw new Error(" Category not found ");
  }

  const startTime = new Date(payload.startDate).getTime();
  const endTime = new Date(payload.endDate).getTime();

  if (endTime <= startTime) {
    throw new Error("End date must be after start date");
  }

  const duration = endTime - startTime;
  console.log(duration);
  const durationInHour = duration / (1000 * 60 * 60);
  const totalPrice = durationInHour * category.price;

  const result = await prisma.bookings.create({
    data: {
      ...payload,
      totalPrice,
    },
  });
  return result;
};

const getMyBookings = async (studentId: string) => {
  const result = await prisma.bookings.findMany({
    where: {
      studentId: studentId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tutor: {
        select: {
          id: true,
          bio: true,
          subject: true,
        },
      },
    },
  });

  return result;
};

const getAllBookings = async () => {
  return await prisma.bookings.findMany();
};

export const BookingServices = {
  createdBooking,
  getMyBookings,
  getAllBookings,
};
