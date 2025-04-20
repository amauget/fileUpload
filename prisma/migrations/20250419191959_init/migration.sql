/*
  Warnings:

  - You are about to drop the column `storageSpace` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "storageSpace",
ADD COLUMN     "usedStorage" INTEGER NOT NULL DEFAULT 0;
