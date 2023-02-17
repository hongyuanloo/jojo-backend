import prisma from "../models/index";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { getErrorMessage } from "../utils/error-util";

// given order id, update paidAt status
export async function updateOrderStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { paidAt } = req.body; // paidAt must be in "new Date().toISOString();" format

  try {
    // check if id is valid.
    const foundOrder = await prisma.order.findUnique({
      where: { id },
    });

    // id not found, return { error: `${id} is invalid.` }
    if (!foundOrder) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `${id} is invalid.` });
    }

    //update order
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { paidAt },
    });
    /**
     {
    "id": "c8e629ab-958d-45ee-8bff-b8ea6f56c242",
    "userId": "c742ac1e-79a5-4335-b41b-c10c8a91059f",
    "totalPaid": "4456",
    "paidAt": "2025-02-16T12:37:13.600Z",
    "createdAt": "2023-02-16T12:37:13.742Z"
    }
     */

    // console.log("--updatedOrder--", updatedOrder);
    res.status(httpStatus.OK).json(updatedOrder);
  } catch (error) {
    // handle any other error.
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorMessage(error));
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}
