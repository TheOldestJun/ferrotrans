-- AlterTable
ALTER TABLE `Order` MODIFY `done` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `ordered` BOOLEAN NOT NULL DEFAULT false;
