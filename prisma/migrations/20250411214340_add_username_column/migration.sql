/*
  Warnings:

  - Added the required column `username` to the `userFiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userFiles" ADD COLUMN     "username" TEXT NOT NULL;
