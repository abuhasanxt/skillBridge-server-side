/*
  Warnings:

  - You are about to drop the `_CategoryToTutorProfiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToTutorProfiles" DROP CONSTRAINT "_CategoryToTutorProfiles_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTutorProfiles" DROP CONSTRAINT "_CategoryToTutorProfiles_B_fkey";

-- DropTable
DROP TABLE "_CategoryToTutorProfiles";

-- CreateTable
CREATE TABLE "TutorCategory" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "TutorCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TutorCategory_tutorId_categoryId_key" ON "TutorCategory"("tutorId", "categoryId");

-- AddForeignKey
ALTER TABLE "TutorCategory" ADD CONSTRAINT "TutorCategory_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorCategory" ADD CONSTRAINT "TutorCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
