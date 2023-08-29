/*
  Warnings:

  - You are about to drop the column `orderedAmount` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `orderedAmount`,
    ADD COLUMN `doneAmount` DOUBLE NULL;
