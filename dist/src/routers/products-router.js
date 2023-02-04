"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products-controller");
const router = (0, express_1.Router)();
// return all products in json
router.get("/", products_controller_1.getAllProducts);
// For development/admin use:
router.post("/", products_controller_1.createProduct);
router.put("/:id", products_controller_1.updateProduct);
router.delete("/:id", products_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=products-router.js.map