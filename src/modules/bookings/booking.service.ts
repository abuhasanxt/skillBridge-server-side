import { prisma } from "../../lib/prisma";

type Payload = {
  tutorId: string;
  date: Date;
  time: string;
};
const createdBooking = async (data: Payload, studentId: string) => {
  const exists = await prisma.bookings.findUnique({
    where: {
      tutorId: data.tutorId,
      
    },
  });
  if (exists) {
    throw new Error(" You are already booked ");
  }
  
  const result = await prisma.bookings.create({
    data: {
      studentId: studentId,
      tutorId: data.tutorId,
      date: data.date,
      time: data.time,
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
          price: true,
        },
      },
    },
  });

  return result;
};


export const BookingServices = {
  createdBooking,
  getMyBookings
};
