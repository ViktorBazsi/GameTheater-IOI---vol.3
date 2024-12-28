/*
  Warnings:

  - You are about to drop the column `gamepathId` on the `UserPath` table. All the data in the column will be lost.
  - You are about to drop the column `userpathUName` on the `UserPath_On_Questions` table. All the data in the column will be lost.
  - Added the required column `gamePathId` to the `UserPath` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPathUName` to the `UserPath_On_Questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserPath" DROP CONSTRAINT "UserPath_gamepathId_fkey";

-- DropForeignKey
ALTER TABLE "UserPath_On_Questions" DROP CONSTRAINT "UserPath_On_Questions_userpathUName_fkey";

-- AlterTable
ALTER TABLE "UserPath" DROP COLUMN "gamepathId",
ADD COLUMN     "gamePathId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserPath_On_Questions" DROP COLUMN "userpathUName",
ADD COLUMN     "userPathUName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserPath" ADD CONSTRAINT "UserPath_gamePathId_fkey" FOREIGN KEY ("gamePathId") REFERENCES "GamePath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPath_On_Questions" ADD CONSTRAINT "UserPath_On_Questions_userPathUName_fkey" FOREIGN KEY ("userPathUName") REFERENCES "UserPath"("username") ON DELETE CASCADE ON UPDATE CASCADE;
