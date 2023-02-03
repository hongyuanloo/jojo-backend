"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_router_1 = __importDefault(require("./users-router"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//init
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "8001");
// console.log("--port type: ", typeof port, process.env.PORT);
// parses incoming requests with JSON payloads
app.use(express_1.default.json());
//! testing only
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server!");
});
// APIs
app.use("/users", users_router_1.default);
app.listen(port, () => {
    console.log("port type: ", typeof port, process.env.PORT);
    console.log(`⚡️[server]: --Server is running at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map