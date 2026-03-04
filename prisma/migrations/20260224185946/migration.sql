/*
  Warnings:

  - You are about to drop the column `date` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Bookings` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_bookingId_fkey";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "date",
DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
