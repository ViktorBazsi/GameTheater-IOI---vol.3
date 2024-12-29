/*
  Warnings:

  - A unique constraint covering the columns `[userAnswerId]` on the table `UserPath` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserPath" ADD COLUMN     "userAnswerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserPath_userAnswerId_key" ON "UserPath"("userAnswerId");
