/*
  Warnings:

  - The values [Electronics,Furniture] on the enum `category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "category_new" AS ENUM ('Shoes', 'Furnitures', 'Watches', 'Cars', 'Houses', 'Clothes', 'Albums', 'Books', 'Movies', 'Others');
ALTER TABLE "product" ALTER COLUMN "categories" TYPE "category_new"[] USING ("categories"::text::"category_new"[]);
ALTER TYPE "category" RENAME TO "category_old";
ALTER TYPE "category_new" RENAME TO "category";
DROP TYPE "category_old";
COMMIT;
