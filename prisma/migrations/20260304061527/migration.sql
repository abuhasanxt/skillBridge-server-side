/*
  Warnings:

  - Added the required column `categoryId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Bookings_tutorId_key";

-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
