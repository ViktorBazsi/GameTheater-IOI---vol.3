-- DropForeignKey
ALTER TABLE "UserPath" DROP CONSTRAINT "UserPath_username_fkey";

-- AddForeignKey
ALTER TABLE "UserPath" ADD CONSTRAINT "UserPath_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
