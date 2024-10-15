-- CreateEnum
CREATE TYPE "Color" AS ENUM ('orange', 'teal', 'violet', 'seagreen', 'burlywood', 'tomato');

-- CreateEnum
CREATE TYPE "Avatar" AS ENUM ('avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6');

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "parentId" TEXT NOT NULL DEFAULT 'root',
    "likes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dislikes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "color" "Color" NOT NULL,
    "avatar" "Avatar" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_key" ON "Users"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
