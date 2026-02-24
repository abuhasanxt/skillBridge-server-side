/*
  Warnings:

  - You are about to drop the `_TutorCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tutorProfileId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TutorCategories" DROP CONSTRAINT "_TutorCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_TutorCategories" DROP CONSTRAINT "_TutorCategories_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "tutorProfileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TutorCategories";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_tutorProfileId_fkey" FOREIGN KEY ("tutorProfileId") REFERENCES "TutorProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
