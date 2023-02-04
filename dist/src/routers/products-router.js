"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products-controller");
const router = (0, express_1.Router)();
// return all products in json
router.get("/", products_controller_1.getAllProducts); //ok
// For development/admin use:
router.post("/", products_controller_1.createProduct); //ok
router.put("/:id", products_controller_1.updateProduct); //ok
router.delete("/:id", products_controller_1.deleteProduct); //ok
exports.default = router;
//# sourceMappingURL=products-router.js.map