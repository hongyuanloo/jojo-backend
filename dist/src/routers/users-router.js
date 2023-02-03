"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/* GET programming languages. */
router.get("/", (req, res) => {
    res.send("router-get...");
});
/* POST programming language */
// router.post("/", programmingLanguagesController.create);
// /* PUT programming language */
// router.put("/:id", programmingLanguagesController.update);
// /* DELETE programming language */
// router.delete("/:id", programmingLanguagesController.remove);
exports.default = router;
//# sourceMappingURL=users-router.js.map