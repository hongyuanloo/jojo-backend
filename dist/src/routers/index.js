"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const users_router_1 = __importDefault(require("./users-router"));
const products_router_1 = __importDefault(require("./products-router"));
const auth_router_1 = __importDefault(require("./auth-router"));
const orders_router_1 = __importDefault(require("./orders-router"));
dotenv_1.default.config();
//init
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "8001");
// handle cors
const corsOptions = {
    origin: "*", // to allow only few urls replace "*" with ["http://localhost:3000",""]
};
app.use((0, cors_1.default)(corsOptions));
// parses incoming requests with JSON payloads
app.use(express_1.default.json());
//! testing only
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server!");
});
// APIs
app.use("/v1/users", users_router_1.default);
app.use("/v1/products", products_router_1.default);
app.use("/v1/auth", auth_router_1.default);
app.use("/v1/orders", orders_router_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: --Server is running at http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map