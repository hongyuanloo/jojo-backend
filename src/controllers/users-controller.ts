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

// [ADMIN] get all users
export async function getUsers(req: Request, res: Response) {
  try {
    //get all users.
    const users = await prisma.user.findMany();
    res.status(httpStatus.OK).json(users);
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errMessage);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}
// [ADMIN] get a user
export async function getUser(req: Request, res: Response) {
  const id = req.params.id;

  try {
    // check if id is valid.
    const foundUser = await prisma.user.findUnique({
      where: { id },
    });

    // id not found, return { error: `${id} is invalid.` }
    if (!foundUser) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `${id} is invalid.` });
    }

    res.status(httpStatus.OK).json(foundUser);
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errMessage);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

// [ADMIN] delete a user
export async function deleteUser(req: Request, res: Response) {
  const id = req.params.id;

  try {
    // check if id is valid.
    const foundUser = await prisma.user.findUnique({
      where: { id },
    });

    // id not found, return { error: `${id} is invalid.` }
    if (!foundUser) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `${id} is invalid.` });
    }

    // delete a user
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    res.status(httpStatus.OK).json(deletedUser);
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errMessage);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

// [ADMIN] update a user
export async function updateUser(req: Request, res: Response) {
  const id = req.params.id;

  try {
    // check if id is valid.
    const foundUser = await prisma.user.findUnique({
      where: { id },
    });

    // id not found, return { error: `${id} is invalid.` }
    if (!foundUser) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `${id} is invalid.` });
    }

    //update a user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...req.body },
    });
    res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errMessage);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}
