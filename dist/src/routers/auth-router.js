"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.authenticateUser); // ok
router.get("/access-token", auth_controller_1.getNewAccessToken); // ok
exports.default = router;
//# sourceMappingURL=auth-router.js.map