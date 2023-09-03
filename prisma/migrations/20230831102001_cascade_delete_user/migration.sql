-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_applicantId_fkey`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
