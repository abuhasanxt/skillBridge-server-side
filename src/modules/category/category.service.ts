import { prisma } from "../../lib/prisma";
type Payload = {
  name: string;
  description: string;
};
const createdCategory = async (data: Payload,authorId:string) => {
  const existing = await prisma.category.findUnique({
    where: { name: data.name },
  });

  if (existing) {
    throw new Error("Category already exists");
  }

  const result = await prisma.category.create({
    data: {
      authorId,
      name: data.name,
      description: data.description,
    },
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return result;
};

export const categoryServices = {
  createdCategory,
  getAllCategory,
};
