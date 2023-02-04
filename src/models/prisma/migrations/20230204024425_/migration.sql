/*
  Warnings:

  - You are about to drop the column `name` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "product_name_key";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_title_key" ON "product"("title");
