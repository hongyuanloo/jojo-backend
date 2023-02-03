/*
  Warnings:

  - A unique constraint covering the columns `[productsId,ordersId]` on the table `orderItems` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orderItems_productsId_ordersId_key" ON "orderItems"("productsId", "ordersId");
