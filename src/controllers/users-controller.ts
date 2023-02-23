import prisma from "../models/index";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { getErrorMessage } from "../utils/error-util";
import { hashPassword } from "../services/auth-service";
import { stripe } from "../configs/stripe";

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
    // given userId select all cartItems and include full details of product
    // return all items sort in updatedAt desc order.
    const allCartItems = await prisma.cartItem.findMany({
      where: { userId: id },
      include: { product: true },
      orderBy: { updatedAt: "desc" },
    });

    // id not found, allCartItems === null.
    if (!allCartItems) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `${id} is invalid.` });
    }

    // id found, return allCartItems
    res.status(httpStatus.OK).json({ cartItems: [...allCartItems] });
  } catch (error) {
    // handle any other error.
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorMessage(error));
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

// upsert a cart item from given user.
export async function upsertCartItem(req: Request, res: Response) {
  const { id: userId } = req.params;
  const { quantity, productId } = req.body;

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

// delete a cart item from given user.
export async function deleteCartItem(req: Request, res: Response) {
  const { id: userId, productId } = req.params;

  try {
    // give userId and productId, delete that item from cart
    const deletedCartItem = await prisma.cartItem.delete({
      where: { productId_userId: { productId, userId } },
    });

    /** returned deletedCartItem : 
  { "id": "cc6c4841-d982-4f88-940c-b3c76b44de10",
    "productId": "c9c460b7-8f8a-4d6f-bff7-ea61cb8dbc08",
    "userId": "c742ac1e-79a5-4335-b41b-c10c8a91059f",
    "quantity": 3,
    "createdAt": "2023-02-17T16:15:20.340Z",
    "updatedAt": "2023-02-17T16:15:20.340Z"}
     */
    res.status(httpStatus.OK).json(deletedCartItem);
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
      orderBy: { createdAt: "desc" }, // or "desc"
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

    // remove all cart items of given user.
    const totalCartItemsRemoved = await prisma.cartItem.deleteMany({
      where: { userId },
    });

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

interface ICartItem {
  id: string;
  productId: string;
  quantity: number;
  product: IProduct;
  [key: string]: any;
}

interface IProduct {
  id: string;
  title: string;
  price: string;
  [key: string]: any;
}
/** given user id and cartItem[]:
 * - create new order, remove all cart items.
 * - create checkout session url
 * - return checkout session url and new order id
 */
export async function createCheckoutSession(req: Request, res: Response) {
  // get id and all products from req.body
  const { id: userId } = req.params;
  const { cartItems }: { cartItems: ICartItem[] } = req.body;
  // console.log("--checkOut-cartItems--:", cartItems);

  //! temporary data.
  // const cartItems = [
  //   {
  //     id: "c089da28-3d68-4c5a-a3a0-46c96e376498",
  //     productId: "0bc38d62-65c4-493d-a3f7-8957504e6695",
  //     userId: "c742ac1e-79a5-4335-b41b-c10c8a91059f",
  //     quantity: 3,
  //     createdAt: "2023-02-14T13:27:44.978Z",
  //     updatedAt: "2023-02-14T13:27:44.978Z",
  //     product: {
  //       id: "0bc38d62-65c4-493d-a3f7-8957504e6695",
  //       title: "Oriental Wooden Pizza",
  //       description:
  //         "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
  //       price: "600",
  //       isFeatured: true,
  //       categories: ["Electronics"],
  //       images: [
  //         "https://api.lorem.space/image/watch?w=640&h=480&r=4776",
  //         "https://api.lorem.space/image/watch?w=640&h=480&r=8741",
  //         "https://api.lorem.space/image/watch?w=640&h=480&r=6231",
  //       ],
  //       createdAt: "2023-02-04T02:51:23.871Z",
  //       updatedAt: "2023-02-04T03:19:52.421Z",
  //     },
  //   },
  //   {
  //     id: "2cbf4082-4b80-4420-8fe4-ec728178902f",
  //     productId: "c9c460b7-8f8a-4d6f-bff7-ea61cb8dbc08",
  //     userId: "c742ac1e-79a5-4335-b41b-c10c8a91059f",
  //     quantity: 8,
  //     createdAt: "2023-02-14T13:28:41.536Z",
  //     updatedAt: "2023-02-14T13:28:41.536Z",
  //     product: {
  //       id: "c9c460b7-8f8a-4d6f-bff7-ea61cb8dbc08",
  //       title: "Oriental Bronze Ball",
  //       description:
  //         "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
  //       price: "332",
  //       isFeatured: true,
  //       categories: ["Clothes"],
  //       images: [
  //         "https://api.lorem.space/image/fashion?w=640&h=480&r=2751",
  //         "https://api.lorem.space/image/fashion?w=640&h=480&r=1343",
  //         "https://api.lorem.space/image/fashion?w=640&h=480&r=5568",
  //       ],
  //       createdAt: "2023-02-04T02:50:45.310Z",
  //       updatedAt: "2023-02-04T02:50:45.310Z",
  //     },
  //   },
  // ];

  // handle error if cartItems is empty.
  if (!cartItems?.length) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "cartItems is empty." });
  }

  // map cartItems to orderItems and calculate totalPrice. Used to create new order.
  let totalPrice = 0;
  const orderItems = cartItems.map((item) => {
    const { productId, quantity, product } = item;
    totalPrice += parseInt(product.price) * quantity;
    return { productId, quantity };
  });

  // map all cartItems into lineItems to display in stripe checkout.
  const lineItems = cartItems.map((item) => {
    const { quantity, product } = item;
    const { title, price } = product;

    return {
      price_data: {
        currency: "sgd",
        product_data: {
          name: title,
        },
        unit_amount: parseInt(price) * 100,
      },
      quantity,
    };
  });

  try {
    // create new order and remove all cart items
    const newOrder = await createOrder_clearCart(
      userId,
      totalPrice,
      orderItems
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/checkout?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/checkout?canceled=true`,
    });

    // return session.url and newOrder.id to client.
    res
      .status(httpStatus.OK)
      .json({ url: session.url, newOrderID: newOrder?.id });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(getErrorMessage(error));
  }
}

// create new order and remove all cart items, return new order created.
export async function createOrder_clearCart(
  userId: string,
  totalPaid: number,
  orderItems: { productId: string; quantity: number }[]
) {
  try {
    // with given data, create a new order with paidAt=null.
    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalPaid,
        paidAt: new Date().toISOString(),
        orderItems: { createMany: { data: orderItems } },
      },
    });

    // remove all cart items of given user.
    const totalCartItemsRemoved = await prisma.cartItem.deleteMany({
      where: { userId },
    });

    /* return new order created
    - example of newOrder created: 
     {
      "id": "d3e6d508-2761-4a99-a388-f68b775173c8",
      "userId": "c742ac1e-79a5-4335-b41b-c10c8a91059f",
      "totalPaid": "88.45",
      "paidAt": null, //"2023-09-04T15:36:25.679Z", 
      "createdAt": "2023-02-04T15:53:33.839Z"
    }    */
    return newOrder;
  } catch (error) {
    // handle any other error.
    throw new Error(getErrorMessage(error).error);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}
