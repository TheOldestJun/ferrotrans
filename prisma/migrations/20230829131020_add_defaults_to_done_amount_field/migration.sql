/*
  Warnings:

  - Made the column `doneAmount` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `doneAmount` DOUBLE NOT NULL DEFAULT 0.0;
