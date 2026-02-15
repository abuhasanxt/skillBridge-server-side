/*
  Warnings:

  - You are about to drop the `TutorCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tutorId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TutorCategory" DROP CONSTRAINT "TutorCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TutorCategory" DROP CONSTRAINT "TutorCategory_tutorId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "tutorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TutorCategory";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
