/*
  Warnings:

  - A unique constraint covering the columns `[tutorId]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Bookings_studentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_tutorId_key" ON "Bookings"("tutorId");
