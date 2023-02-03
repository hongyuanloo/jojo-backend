/*
  Warnings:

  - The `category` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "category" AS ENUM ('Clothes', 'Electronics', 'Furniture', 'Shoes', 'Others');

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category",
ADD COLUMN     "category" "category"[];
