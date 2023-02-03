"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products-controller");
const router = (0, express_1.Router)();
/* GET programming languages. */
router.get("/", products_controller_1.getAllProducts);
exports.default = router;
//# sourceMappingURL=products-router.js.map