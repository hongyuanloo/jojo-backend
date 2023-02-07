"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users-controller");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const router = (0, express_1.Router)();
router.get("/:id/cartitems", auth_middleware_1.authenticateToken, users_controller_1.getCartItems); //protected route ok
router.post("/:id/cartitems", auth_middleware_1.authenticateToken, users_controller_1.upsertCartItem); //protected route ok
router.get("/:id/orders", auth_middleware_1.authenticateToken, users_controller_1.getOrders); //protected route ok
router.post("/:id/orders", auth_middleware_1.authenticateToken, users_controller_1.createOrder); //protected route ok
router.post("/", users_controller_1.createUser); // ok
// For development/admin use:
router.get("/:id", users_controller_1.getUser); //ok
router.get("/", users_controller_1.getUsers); //ok
router.delete("/:id", users_controller_1.deleteUser); //ok
router.put("/:id", users_controller_1.updateUser); //ok
exports.default = router;
//# sourceMappingURL=users-router.js.map