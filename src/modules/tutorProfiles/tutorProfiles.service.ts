import { TutorProfiles } from "../../../generated/prisma/client";
import { TutorProfilesWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

type TutorProfilePayload = Omit<
  TutorProfiles,
  "id" | "authorId" | "createdAt" | "updatedAt"
>;
const createdTutorProfile = async (
  data: TutorProfilePayload,
  userId: string,
) => {
  // Check if tutor already has profile
  const existingProfile = await prisma.tutorProfiles.findUnique({
    where: { authorId: userId },
  });

  if (existingProfile) throw new Error("You already have a tutor profile");

  return prisma.tutorProfiles.create({
    data: {
      bio: data.bio,
      subject: data.subject,
      rating: data.rating,
      authorId: userId,
      hourlyPrice:data.hourlyPrice
    },
  });
};

const getAllTutors = async ({
  search,
}: {
  search?: string | undefined;
  categories: string[] | [];
}) => {
  const andCondition: TutorProfilesWhereInput[] = [];
  if (search) {
    const numericSearch = Number(search);
    andCondition.push({
      // subject search
      OR: [
        {
          subject: {
            has: search,
          },
        },
        // ratting search

        ...(isNaN(numericSearch)
          ? []
          : [
              {
                rating: numericSearch,
              },
            ]),
        //price search
      ],
    });
  }

  //categories filtering

  const result = await prisma.tutorProfiles.findMany({
    where: {
      AND: andCondition,
    },
    include: {
      categories: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      rating: "desc",
    },
  });

  return result;
};

type UpdateTutorPayload = {
  bio?: string;
  hourlyPrice?:number;
  subject?: string[];
};
const updateTutorProfile = async (
  tutorId: string,
  payload: UpdateTutorPayload,
) => {
  const data: Partial<UpdateTutorPayload> = {};
  if (payload.bio !== undefined) data.bio = payload.bio;
  if (payload.subject !== undefined) data.subject = payload.subject;
  if (payload.hourlyPrice !== undefined) data.hourlyPrice = payload.hourlyPrice;

  const result = await prisma.tutorProfiles.update({
    where: { authorId: tutorId },
    data,
  });

  return result;
};

export const tutorProfileServices = {
  createdTutorProfile,
  getAllTutors,
  updateTutorProfile,
};
