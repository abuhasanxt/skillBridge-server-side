/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `TutorProfiles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookings_studentId_key" ON "Bookings"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfiles_authorId_key" ON "TutorProfiles"("authorId");
