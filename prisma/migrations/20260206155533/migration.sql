/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Bookings_tutorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_studentId_key" ON "Bookings"("studentId");
