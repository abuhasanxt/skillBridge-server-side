/*
  Warnings:

  - A unique constraint covering the columns `[studentId,tutorId,categoryId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reviews_studentId_tutorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_studentId_tutorId_categoryId_key" ON "Reviews"("studentId", "tutorId", "categoryId");
