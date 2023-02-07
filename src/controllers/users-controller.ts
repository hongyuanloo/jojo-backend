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

// get CartItems of a user. returns json or null
export async function getCartItems(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const allCartItems = await prisma.user.findUnique({
      select: { cartItems: true },
      where: { id },
    });

    // id not found, allCartItems === null.
    if (!allCartItems) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `${id} is invalid.` });
    }

    // id found, return allCartItems
    res.status(httpStatus.OK).json(allCartItems);
  } catch (error) {
    // handle any other error.
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorMessage(error));
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

// upsert a cart item to given user.
export async function upsertCartItem(req: Request, res: Response) {
  const { id: userId } = req.params;
  const { quantity, productId } = req.body;
  console.log("--upsertCartItem--res.locals.user:", res.locals.user);

  try {
    const newCartItem = await prisma.cartItem.upsert({
      where: { productId_userId: { productId, userId } },
      create: { productId, userId, quantity },
      update: { quantity },
    });

    res.status(httpStatus.OK).json(newCartItem);
  } catch (error) {
    // handle any other error.
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorMessage(error));
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

// get CartItems of a user. returns json or null
export async function getOrders(req: Request, res: Response) {
  const { id: userId } = req.params;

  try {
    const allOrders = await prisma.order.findMany({
      select: {
        id: true,
        totalPaid: true,
        paidAt: true,
        createdAt: true,
        orderItems: true,
      },
      where: { userId },
      orderBy: { createdAt: "asc" }, // or "desc"
    });

    // id found, return allOrders in [{},{}...]
    res.status(httpStatus.OK).json(allOrders);
  } catch (error) {
    // handle any other error.
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorMessage(error));
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

/* Given user, create a new order.
- example of req.body: 
  {
    "totalPaid": 330.45,
    "paidAt": "2023-02-04T15:36:25.679Z",
    "orderItems": [
      {
        "productId": "c9c460b7-8f8a-4d6f-bff7-ea61cb8dbc08",
        "quantity": 4
      },
      {
        "productId": "588028ec-9d25-4b62-9064-4c57732cb262",
        "quantity": 6
      }
    ]
  }*/
export async function createOrder(req: Request, res: Response) {
  const { id: userId } = req.params;
  const { totalPaid, paidAt, orderItems: orderProducts } = req.body;
  // console.log("--req.body--", req.body);

  try {
    // given user id, create a new order with data provided in req.body.
    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalPaid,
        paidAt,
        orderItems: { createMany: { data: orderProducts } },
      },
    });
    // console.log("--newOrder--", newOrder);

    // remove all cart items of given user.
    const totalCartItemsRemoved = await prisma.cartItem.deleteMany({
      where: { userId },
    });

    // console.log("--totalCartItemsRemoved--", totalCartItemsRemoved);

    /* return new order created
    - example of newOrder created: 
     {
      "id": "d3e6d508-2761-4a99-a388-f68b775173c8",
      "userId": "c742ac1e-79a5-4335-b41b-c10c8a91059f",
      "totalPaid": "88.45",
      "paidAt": "2023-09-04T15:36:25.679Z",
      "createdAt": "2023-02-04T15:53:33.839Z"
    }    */
    res.status(httpStatus.OK).json(newOrder);
  } catch (error) {
    // handle any other error.
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorMessage(error));
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
