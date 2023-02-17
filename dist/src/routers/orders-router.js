"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders-controller");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const router = (0, express_1.Router)();
router.put("/:id", auth_middleware_1.authenticateToken, orders_controller_1.updateOrderStatus); //protected route ok
exports.default = router;
//# sourceMappingURL=orders-router.js.map