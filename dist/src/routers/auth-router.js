"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const router = (0, express_1.Router)();
/* GET programming languages. */
router.post("/login", auth_controller_1.authenticateUser);
router.post("/access-token", auth_controller_1.getNewAccessToken);
exports.default = router;
//# sourceMappingURL=auth-router.js.map