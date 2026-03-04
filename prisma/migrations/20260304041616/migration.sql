/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_bookingId_fkey";

-- DropIndex
DROP INDEX "Reviews_bookingId_key";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "bookingId";
