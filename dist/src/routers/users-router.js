"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users-controller");
const router = (0, express_1.Router)();
router.get("/:id/cartitems", users_controller_1.getCartItems); //ok
router.post("/:id/cartitems", users_controller_1.upsertCartItem); //ok
router.get("/:id/orders", users_controller_1.getOrders); //ok
router.post("/:id/orders", users_controller_1.createOrder); //ok
router.post("/", users_controller_1.createUser); // ok
// For development/admin use:
router.get("/:id", users_controller_1.getUser); //ok
router.get("/", users_controller_1.getUsers); //ok
router.delete("/:id", users_controller_1.deleteUser); //ok
router.put("/:id", users_controller_1.updateUser); //ok
exports.default = router;
//# sourceMappingURL=users-router.js.map