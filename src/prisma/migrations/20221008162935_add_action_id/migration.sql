/*
  Warnings:

  - Added the required column `action_id` to the `Poap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Poap` ADD COLUMN `action_id` VARCHAR(191) NOT NULL;

ALTER TABLE `Poap` MODIFY `description` TEXT NOT NULL;