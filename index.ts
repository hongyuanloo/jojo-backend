// import dotenv from "dotenv";
import startRouters from "./src/routers";

// dotenv.config();

startRouters;

//! test db
import { usersModel, productsModel, cartItemsModel } from "./src/models";

// usersModel.deleteAllUsers();
// usersModel.createUsers();
usersModel.getUsers();

// productsModel.createProducts();
// productsModel.getProducts();

// cartItemsModel.createCartItem();
// cartItemsModel.getCartItems();
// cartItemsModel.upsertCartItems();
