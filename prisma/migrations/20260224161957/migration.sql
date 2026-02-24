/*
  Warnings:

  - You are about to drop the column `time` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `TutorProfiles` table. All the data in the column will be lost.
  - You are about to drop the `TutorCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endTime` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TutorCategory" DROP CONSTRAINT "TutorCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TutorCategory" DROP CONSTRAINT "TutorCategory_tutorId_fkey";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "time",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "authorId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "bookingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TutorProfiles" DROP COLUMN "price";

-- DropTable
DROP TABLE "TutorCategory";

-- CreateTable
CREATE TABLE "_TutorCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TutorCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TutorCategories_B_index" ON "_TutorCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_bookingId_key" ON "Reviews"("bookingId");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorCategories" ADD CONSTRAINT "_TutorCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TutorCategories" ADD CONSTRAINT "_TutorCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "TutorProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
