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
exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = exports.createOrder = exports.getOrders = exports.upsertCartItem = exports.getCartItems = exports.createUser = void 0;
const index_1 = __importDefault(require("../models/index"));
const http_status_1 = __importDefault(require("http-status"));
const error_util_1 = require("../utils/error-util");
const auth_service_1 = require("../services/auth-service");
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
            // select all cartItems and include full details of product
            const allCartItems = yield index_1.default.user.findUnique({
                select: { cartItems: { include: { product: true } } },
                where: { id },
            });
            // id not found, allCartItems === null.
            if (!allCartItems) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .json({ error: `${id} is invalid.` });
            }
            // id found, return allCartItems
            res.status(http_status_1.default.OK).json(allCartItems);
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
// upsert a cart item to given user.
function upsertCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.params;
        const { quantity, productId } = req.body;
        console.log("--upsertCartItem--res.locals.user:", res.locals.user);
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
                orderBy: { createdAt: "asc" }, // or "desc"
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
//# sourceMappingURL=users-controller.js.map