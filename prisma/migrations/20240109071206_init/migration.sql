-- CreateTable
CREATE TABLE `DailyStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NOT NULL,
    `timeSlot` INTEGER NOT NULL,
    `usageTime` INTEGER NOT NULL,
    `success` INTEGER NOT NULL,
    `incentive` INTEGER NOT NULL,
    `frame` INTEGER NOT NULL,
    `period` VARCHAR(255) NOT NULL,
    `updated` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsageStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NOT NULL,
    `timeSlot` INTEGER NOT NULL,
    `appPackage` VARCHAR(255) NOT NULL,
    `usageTime` INTEGER NOT NULL,
    `frame` INTEGER NOT NULL,
    `period` VARCHAR(255) NOT NULL,
    `updated` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(255) NOT NULL,
    `frame` INTEGER NOT NULL,
    `updated` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
