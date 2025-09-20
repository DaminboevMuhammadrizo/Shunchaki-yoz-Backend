/*
  Warnings:

  - Added the required column `like` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Like" ADD COLUMN     "like" BOOLEAN NOT NULL;
