-- CreateTable
CREATE TABLE `UserIncentive` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `incentiveFrame` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `UserIncentive_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserIncentive` ADD CONSTRAINT `UserIncentive_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
