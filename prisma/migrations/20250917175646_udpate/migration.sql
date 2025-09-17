/*
  Warnings:

  - You are about to drop the column `postId` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Post_postId_key";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "postId";
