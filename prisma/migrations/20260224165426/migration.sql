/*
  Warnings:

  - Added the required column `price` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourlyPrice` to the `TutorProfiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "TutorProfiles" ADD COLUMN     "hourlyPrice" DOUBLE PRECISION NOT NULL;
