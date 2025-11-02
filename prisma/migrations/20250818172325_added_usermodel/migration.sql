/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `openSourceOrg` will be added. If there are existing duplicate values, this will fail.
  - The required column `userId` was added to the `openSourceOrg` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "public"."openSourceOrg" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "openSourceOrg_userId_key" ON "public"."openSourceOrg"("userId");

-- AddForeignKey
ALTER TABLE "public"."openSourceOrg" ADD CONSTRAINT "openSourceOrg_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
