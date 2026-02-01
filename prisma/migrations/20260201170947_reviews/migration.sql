/*
  Warnings:

  - A unique constraint covering the columns `[studentId,tutorId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reviews_studentId_key";

-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "rating" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_studentId_tutorId_key" ON "Reviews"("studentId", "tutorId");
