"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from "dotenv";
const routers_1 = __importDefault(require("./src/routers"));
// dotenv.config();
routers_1.default;
//! test db
const models_1 = require("./src/models");
// usersModel.deleteAllUsers();
// usersModel.createUsers();
models_1.usersModel.getUsers();
// productsModel.createProducts();
// productsModel.getProducts();
// cartItemsModel.createCartItem();
// cartItemsModel.getCartItems();
// cartItemsModel.upsertCartItems();
//# sourceMappingURL=index.js.map