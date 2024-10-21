-- AlterTable
ALTER TABLE `user` ADD COLUMN `tasksCompletedThisMonth` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `totalTasksCompleted` INTEGER NOT NULL DEFAULT 0;
