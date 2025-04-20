/*
  Warnings:

  - You are about to drop the column `filename` on the `userFiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[originalname]` on the table `userFiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storageName]` on the table `userFiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalname` to the `userFiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageName` to the `userFiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "userFiles_filename_key";

-- AlterTable
ALTER TABLE "userFiles" DROP COLUMN "filename",
ADD COLUMN     "originalname" TEXT NOT NULL,
ADD COLUMN     "storageName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userFiles_originalname_key" ON "userFiles"("originalname");

-- CreateIndex
CREATE UNIQUE INDEX "userFiles_storageName_key" ON "userFiles"("storageName");
