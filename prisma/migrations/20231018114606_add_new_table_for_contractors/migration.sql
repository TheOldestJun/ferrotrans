-- CreateTable
CREATE TABLE `Contractor` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `tel` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `vat` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
