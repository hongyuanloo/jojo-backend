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
exports.createUser = void 0;
const index_1 = __importDefault(require("../models/index"));
const http_status_1 = __importDefault(require("http-status"));
const error_util_1 = require("../utils/error-util");
const auth_service_1 = require("../services/auth-service");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // store information into newUser object
        const newUser = Object.assign({}, req.body);
        newUser.email = newUser.email.toLowerCase();
        try {
            // if email already exists, return httpStatus.CONFLICT
            const foundUser = yield index_1.default.user.findUnique({
                where: {
                    email: newUser.email,
                },
            });
            if (foundUser) {
                let errMessage = `${foundUser.email} already exist.`;
                return res.status(http_status_1.default.CONFLICT).json({ error: errMessage });
            }
            // hash password
            newUser.password = yield (0, auth_service_1.hashPassword)(newUser.password);
            // create new user
            const user = yield index_1.default.user.create({
                data: Object.assign({}, newUser),
            });
            res.sendStatus(http_status_1.default.CREATED);
        }
        catch (error) {
            // handle any other error.
            let errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield index_1.default.$disconnect();
        }
    });
}
exports.createUser = createUser;
//# sourceMappingURL=users-controller.js.map