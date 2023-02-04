"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users-controller");
const router = (0, express_1.Router)();
router.post("/", users_controller_1.createUser); // ok
router.get("/:id/cartitems", users_controller_1.getCartItems); //ok
router.post("/:id/cartitems", users_controller_1.upsertCartItem); //ok
// For development/admin use:
router.get("/", users_controller_1.getUsers); //ok
router.get("/:id", users_controller_1.getUser);
router.delete("/:id", users_controller_1.deleteUser); //ok
router.put("/:id", users_controller_1.updateUser); //ok
exports.default = router;
//# sourceMappingURL=users-router.js.map