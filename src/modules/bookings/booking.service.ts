import { Bookings, BookingStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/auth";

const createdBooking = async (
  payload: Omit<Bookings, "id" | "createdAt" | "updatedAt">,
  studentId: string,
) => {
  const exists = await prisma.bookings.findFirst({
    where: {
      categoryId: payload.categoryId,
      tutorId: payload.tutorId,
      studentId: studentId,
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
      studentId,
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
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const getTutorBookings = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      tutorProfile: true,
    },
  });

  let whereCondition = {};

  if (user?.role === UserRole.TUTOR) {
    whereCondition = {
      tutorId: user?.tutorProfile?.id,
    };
  }

  const result = await prisma.bookings.findMany({
    where: whereCondition,
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
      student: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  return result;
};

const getAllBookings = async () => {
  return await prisma.bookings.findMany({
    include: {
      student: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });
};

const bookingStatusUpdate = async (
  bookingId: string,
  tutorProfileId: string,
  status: BookingStatus,
) => {
  console.log(tutorProfileId);
  const result = await prisma.bookings.updateMany({
    where: {
      id: bookingId,
      tutorId: tutorProfileId,
    },
    data: { status },
  });
  if (result.count === 0) {
    throw new Error("Booking not found or unauthorized");
  }
  return result;
};







const bookingsStatusUpdate = async (
  bookingId: string,
  status: BookingStatus,
) => {
  const updated = await prisma.bookings.update({
    where: { id: bookingId },
    data: { status },
  });

  return updated;
};


export const BookingServices = {
  createdBooking,
  getMyBookings,
  getAllBookings,
  bookingStatusUpdate,
  getTutorBookings,
  bookingsStatusUpdate
};
