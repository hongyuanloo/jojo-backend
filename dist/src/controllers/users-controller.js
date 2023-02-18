"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder_clearCart = exports.createCheckoutSession = exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.createOrder = exports.getOrders = exports.deleteCartItem = exports.upsertCartItem = exports.getCartItems = exports.createUser = void 0;
const index_1 = __importDefault(require("../models/index"));
const http_status_1 = __importDefault(require("http-status"));
const error_util_1 = require("../utils/error-util");
const auth_service_1 = require("../services/auth-service");
const stripe_1 = require("../configs/stripe");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // store information into newUser object
        const newUser = Object.assign({}, req.body);
        newUser.email = newUser.email.toLowerCase();
        try {
            // if email already exists, return httpStatus.CONFLICT
            const foundUser = yield index_1.default.user.findUnique({
                where: {
                    email: newUser.email,
                },
            });
            if (foundUser) {
                let errMessage = `${foundUser.email} already exist.`;
                return res.status(http_status_1.default.CONFLICT).json({ error: errMessage });
            }
            // hash password
            newUser.password = yield (0, auth_service_1.hashPassword)(newUser.password);
            // create new user
            const user = yield index_1.default.user.create({
                data: Object.assign({}, newUser),
            });
            res.sendStatus(http_status_1.default.CREATED);
        }
        catch (error) {
            // handle any other error.
            let errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.createUser = createUser;
// get CartItems of a user. returns json or null
function getCartItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // given userId select all cartItems and include full details of product
            // return all items sort in updatedAt desc order.
            const allCartItems = yield index_1.default.cartItem.findMany({
                where: { userId: id },
                include: { product: true },
                orderBy: { updatedAt: "desc" },
            });
            // id not found, allCartItems === null.
            if (!allCartItems) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .json({ error: `${id} is invalid.` });
            }
            // id found, return allCartItems
            res.status(http_status_1.default.OK).json({ cartItems: [...allCartItems] });
        }
        catch (error) {
            // handle any other error.
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json((0, error_util_1.getErrorMessage)(error));
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.getCartItems = getCartItems;
// upsert a cart item from given user.
function upsertCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.params;
        const { quantity, productId } = req.body;
        // console.log("--upsertCartItem--res.locals.user:", res.locals.user);
        try {
            const newCartItem = yield index_1.default.cartItem.upsert({
                where: { productId_userId: { productId, userId } },
                create: { productId, userId, quantity },
                update: { quantity },
            });
            res.status(http_status_1.default.OK).json(newCartItem);
        }
        catch (error) {
            // handle any other error.
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json((0, error_util_1.getErrorMessage)(error));
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.upsertCartItem = upsertCartItem;
// delete a cart item from given user.
function deleteCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId, productId } = req.params;
        try {
            // give userId and productId, delete that item from cart
            const deletedCartItem = yield index_1.default.cartItem.delete({
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
            res.status(http_status_1.default.OK).json(deletedCartItem);
        }
        catch (error) {
            // handle any other error.
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json((0, error_util_1.getErrorMessage)(error));
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.deleteCartItem = deleteCartItem;
// get CartItems of a user. returns json or null
function getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.params;
        try {
            const allOrders = yield index_1.default.order.findMany({
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
            res.status(http_status_1.default.OK).json(allOrders);
        }
        catch (error) {
            // handle any other error.
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json((0, error_util_1.getErrorMessage)(error));
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.getOrders = getOrders;
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
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.params;
        const { totalPaid, paidAt, orderItems: orderProducts } = req.body;
        // console.log("--req.body--", req.body);
        try {
            // given user id, create a new order with data provided in req.body.
            const newOrder = yield index_1.default.order.create({
                data: {
                    userId,
                    totalPaid,
                    paidAt,
                    orderItems: { createMany: { data: orderProducts } },
                },
            });
            // console.log("--newOrder--", newOrder);
            // remove all cart items of given user.
            const totalCartItemsRemoved = yield index_1.default.cartItem.deleteMany({
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
            res.status(http_status_1.default.OK).json(newOrder);
        }
        catch (error) {
            // handle any other error.
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json((0, error_util_1.getErrorMessage)(error));
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.createOrder = createOrder;
// [ADMIN] get all users
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //get all users.
            const users = yield index_1.default.user.findMany();
            res.status(http_status_1.default.OK).json(users);
        }
        catch (error) {
            // handle any other error.
            const errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.getUsers = getUsers;
// [ADMIN] get a user
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            // check if id is valid.
            const foundUser = yield index_1.default.user.findUnique({
                where: { id },
            });
            // id not found, return { error: `${id} is invalid.` }
            if (!foundUser) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .json({ error: `${id} is invalid.` });
            }
            res.status(http_status_1.default.OK).json(foundUser);
        }
        catch (error) {
            // handle any other error.
            const errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.getUser = getUser;
// [ADMIN] delete a user
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            // check if id is valid.
            const foundUser = yield index_1.default.user.findUnique({
                where: { id },
            });
            // id not found, return { error: `${id} is invalid.` }
            if (!foundUser) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .json({ error: `${id} is invalid.` });
            }
            // delete a user
            const deletedUser = yield index_1.default.user.delete({
                where: { id },
            });
            res.status(http_status_1.default.OK).json(deletedUser);
        }
        catch (error) {
            // handle any other error.
            const errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.deleteUser = deleteUser;
// [ADMIN] update a user
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            // check if id is valid.
            const foundUser = yield index_1.default.user.findUnique({
                where: { id },
            });
            // id not found, return { error: `${id} is invalid.` }
            if (!foundUser) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .json({ error: `${id} is invalid.` });
            }
            //update a user
            const updatedUser = yield index_1.default.user.update({
                where: { id },
                data: Object.assign({}, req.body),
            });
            res.status(http_status_1.default.OK).json(updatedUser);
        }
        catch (error) {
            // handle any other error.
            const errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.updateUser = updateUser;
/** given user id and cartItem[]:
 * - create new order, remove all cart items.
 * - create checkout session url
 * - return checkout session url and new order id
 */
function createCheckoutSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // get id and all products from req.body
        const { id: userId } = req.params;
        const { cartItems } = req.body;
        console.log("--checkOut-cartItems--:", cartItems);
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
        if (!(cartItems === null || cartItems === void 0 ? void 0 : cartItems.length)) {
            return res
                .status(http_status_1.default.BAD_REQUEST)
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
            const newOrder = yield createOrder_clearCart(userId, totalPrice, orderItems);
            const session = yield stripe_1.stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: lineItems,
                success_url: `${process.env.CLIENT_URL}/checkout?success=true`,
                cancel_url: `${process.env.CLIENT_URL}/checkout?canceled=true`,
            });
            // return session.url and newOrder.id to client.
            res
                .status(http_status_1.default.OK)
                .json({ url: session.url, newOrderID: newOrder === null || newOrder === void 0 ? void 0 : newOrder.id });
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json((0, error_util_1.getErrorMessage)(error));
        }
    });
}
exports.createCheckoutSession = createCheckoutSession;
// create new order and remove all cart items, return new order created.
function createOrder_clearCart(userId, totalPaid, orderItems) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // with given data, create a new order with paidAt=null.
            const newOrder = yield index_1.default.order.create({
                data: {
                    userId,
                    totalPaid,
                    paidAt: new Date().toISOString(),
                    orderItems: { createMany: { data: orderItems } },
                },
            });
            // console.log("--newOrder--", newOrder); //!
            // remove all cart items of given user.
            const totalCartItemsRemoved = yield index_1.default.cartItem.deleteMany({
                where: { userId },
            });
            // console.log("--totalCartItemsRemoved--", totalCartItemsRemoved); //!
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
        }
        catch (error) {
            // handle any other error.
            throw new Error((0, error_util_1.getErrorMessage)(error).error);
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.createOrder_clearCart = createOrder_clearCart;
//# sourceMappingURL=users-controller.js.map