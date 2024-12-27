-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "question" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "relQuestionNr" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "resultReka" INTEGER NOT NULL,
    "resultDomi" INTEGER NOT NULL,
    "resultKata" INTEGER NOT NULL,
    "nextQuestNr" INTEGER NOT NULL,
    "uploaderId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPath" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "gamepathId" TEXT NOT NULL,
    "questionNr" INTEGER NOT NULL DEFAULT 0,
    "resReka" INTEGER NOT NULL DEFAULT 0,
    "resDomi" INTEGER NOT NULL DEFAULT 0,
    "resKata" INTEGER NOT NULL DEFAULT 0,
    "nextQuestion" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPath_On_Questions" (
    "id" TEXT NOT NULL,
    "userpathUName" TEXT NOT NULL,
    "questionNr" INTEGER NOT NULL,

    CONSTRAINT "UserPath_On_Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePath" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionNr" INTEGER NOT NULL DEFAULT 0,
    "resRekaAll" INTEGER NOT NULL DEFAULT 0,
    "resDomiAll" INTEGER NOT NULL DEFAULT 0,
    "resKataAll" INTEGER NOT NULL DEFAULT 0,
    "nextQuestion" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "GamePath_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Question_number_key" ON "Question"("number");

-- CreateIndex
CREATE UNIQUE INDEX "UserPath_username_key" ON "UserPath"("username");

-- CreateIndex
CREATE UNIQUE INDEX "GamePath_name_key" ON "GamePath"("name");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_relQuestionNr_fkey" FOREIGN KEY ("relQuestionNr") REFERENCES "Question"("number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPath" ADD CONSTRAINT "UserPath_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPath" ADD CONSTRAINT "UserPath_gamepathId_fkey" FOREIGN KEY ("gamepathId") REFERENCES "GamePath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPath_On_Questions" ADD CONSTRAINT "UserPath_On_Questions_userpathUName_fkey" FOREIGN KEY ("userpathUName") REFERENCES "UserPath"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPath_On_Questions" ADD CONSTRAINT "UserPath_On_Questions_questionNr_fkey" FOREIGN KEY ("questionNr") REFERENCES "Question"("number") ON DELETE CASCADE ON UPDATE CASCADE;
