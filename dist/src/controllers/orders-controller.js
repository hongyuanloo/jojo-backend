"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = void 0;
const index_1 = __importDefault(require("../models/index"));
const http_status_1 = __importDefault(require("http-status"));
const error_util_1 = require("../utils/error-util");
// given order id, update paidAt status
function updateOrderStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { paidAt } = req.body; // paidAt must be in "new Date().toISOString();" format
        try {
            // check if id is valid.
            const foundOrder = yield index_1.default.order.findUnique({
                where: { id },
            });
            // id not found, return { error: `${id} is invalid.` }
            if (!foundOrder) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .json({ error: `${id} is invalid.` });
            }
            //update order
            const updatedOrder = yield index_1.default.order.update({
                where: { id },
                data: { paidAt },
            });
            /**
             {
            "id": "c8e629ab-958d-45ee-8bff-b8ea6f56c242",
            "userId": "c742ac1e-79a5-4335-b41b-c10c8a91059f",
            "totalPaid": "4456",
            "paidAt": "2025-02-16T12:37:13.600Z",
            "createdAt": "2023-02-16T12:37:13.742Z"
            }
             */
            // console.log("--updatedOrder--", updatedOrder);
            res.status(http_status_1.default.OK).json(updatedOrder);
        }
        catch (error) {
            // handle any other error.
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json((0, error_util_1.getErrorMessage)(error));
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=orders-controller.js.map