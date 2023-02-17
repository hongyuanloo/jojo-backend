"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
exports.stripe = new stripe_1.default((_a = process.env.STRIPE_PRIVATE_KEY) !== null && _a !== void 0 ? _a : "", {
    apiVersion: "2022-11-15",
});
//# sourceMappingURL=stripe.js.map