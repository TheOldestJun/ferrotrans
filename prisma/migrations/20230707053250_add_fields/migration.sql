/*
  Warnings:

  - Added the required column `applicantId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `done` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordered` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `applicantId` VARCHAR(191) NOT NULL,
    ADD COLUMN `done` BOOLEAN NOT NULL,
    ADD COLUMN `ordered` BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
