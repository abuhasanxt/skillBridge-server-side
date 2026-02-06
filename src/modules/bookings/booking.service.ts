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

export const BookingServices = {
  createdBooking,
};
