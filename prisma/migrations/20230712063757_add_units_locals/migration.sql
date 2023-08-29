/*
  Warnings:

  - Added the required column `en` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pl` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ru` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ua` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Unit` ADD COLUMN `en` VARCHAR(191) NOT NULL,
    ADD COLUMN `pl` VARCHAR(191) NOT NULL,
    ADD COLUMN `ru` VARCHAR(191) NOT NULL,
    ADD COLUMN `ua` VARCHAR(191) NOT NULL;
