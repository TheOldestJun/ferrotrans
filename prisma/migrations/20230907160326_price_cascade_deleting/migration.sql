-- DropForeignKey
ALTER TABLE `Price` DROP FOREIGN KEY `Price_productId_fkey`;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
