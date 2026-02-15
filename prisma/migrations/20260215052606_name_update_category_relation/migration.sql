/*
  Warnings:

  - You are about to drop the column `tutorId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_tutorId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "tutorId";

-- CreateTable
CREATE TABLE "_CategoryToTutorProfiles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToTutorProfiles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToTutorProfiles_B_index" ON "_CategoryToTutorProfiles"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToTutorProfiles" ADD CONSTRAINT "_CategoryToTutorProfiles_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTutorProfiles" ADD CONSTRAINT "_CategoryToTutorProfiles_B_fkey" FOREIGN KEY ("B") REFERENCES "TutorProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
