/*
  Warnings:

  - You are about to drop the `PostOnTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostOnTag" DROP CONSTRAINT "PostOnTag_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnTag" DROP CONSTRAINT "PostOnTag_tagId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "PostOnTag";

-- DropTable
DROP TABLE "Tag";
