/*
  Warnings:

  - Added the required column `ip` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `Complaint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "ip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Complaint" ADD COLUMN     "ip" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Like" ADD COLUMN     "ip" TEXT NOT NULL;
