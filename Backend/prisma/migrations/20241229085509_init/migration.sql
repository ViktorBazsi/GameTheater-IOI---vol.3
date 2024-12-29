/*
  Warnings:

  - You are about to drop the column `chosenAnsId` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "chosenAnsId";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "chosenAnsId" TEXT;
