import prisma from "../models/index";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { getErrorMessage } from "../utils/error-util";
import { hashPassword } from "../services/auth-service";

export async function createUser(req: Request, res: Response) {
  // store information into newUser object
  const newUser = { ...req.body };
  newUser.email = newUser.email.toLowerCase();

  try {
    // if email already exists, return httpStatus.CONFLICT
    const foundUser = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
    });
    if (foundUser) {
      let errMessage = `${foundUser.email} already exist.`;
      return res.status(httpStatus.CONFLICT).json({ error: errMessage });
    }

    // hash password
    newUser.password = await hashPassword(newUser.password);

    // create new user
    const user = await prisma.user.create({
      data: {
        ...newUser,
      },
    });

    res.sendStatus(httpStatus.CREATED);
  } catch (error: unknown) {
    // handle any other error.
    let errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errMessage);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}
