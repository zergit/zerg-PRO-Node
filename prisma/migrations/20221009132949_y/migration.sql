/*
  Warnings:

  - You are about to drop the column `name` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostOnTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnTag" DROP CONSTRAINT "PostOnTag_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnTag" DROP CONSTRAINT "PostOnTag_tagId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "name",
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostOnTag";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
