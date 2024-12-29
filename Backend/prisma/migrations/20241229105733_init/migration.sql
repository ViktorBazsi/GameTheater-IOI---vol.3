/*
  Warnings:

  - You are about to drop the column `chosenAns` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `chosenAnsId` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "chosenAns",
DROP COLUMN "chosenAnsId";
