-- CreateTable
CREATE TABLE `updateTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(255) NOT NULL,
    `updateTime` VARCHAR(255) NOT NULL,
    `usageStatsUpdateTime` VARCHAR(255) NOT NULL,
    `frame` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
