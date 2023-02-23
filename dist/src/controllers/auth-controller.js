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
exports.getNewAccessToken = exports.authenticateUser = void 0;
const models_1 = __importDefault(require("../models"));
const error_util_1 = require("../utils/error-util");
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("../services/auth-service");
// Given email and password, authenticate and return { accessToken, refreshToken, user: { id, username, role },}
function authenticateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //check email and password
        const userInfor = Object.assign({}, req.body);
        userInfor.email = userInfor.email.toLowerCase();
        try {
            // check if email is found
            const foundUser = yield models_1.default.user.findUnique({
                where: {
                    email: userInfor.email,
                },
            });
            // email not found, return httpStatus.NOT_FOUND
            if (!foundUser) {
                return res
                    .status(http_status_1.default.NOT_FOUND)
                    .json({ error: `${userInfor.email} does'nt exist.` });
            }
            //compare password.
            const passwordOk = yield (0, auth_service_1.isPasswordMatched)(userInfor.password, foundUser.password);
            // password wrong, return httpStatus.FORBIDDEN
            if (!passwordOk) {
                return res
                    .status(http_status_1.default.FORBIDDEN)
                    .json({ error: "Wrong password." });
            }
            const { id, username, role } = foundUser;
            // everything is good, generate accessToken and refreshToken generateRefreshToken
            const tokenPayload = {
                id: id,
                username: username,
                role: role,
            };
            const accessToken = (0, auth_service_1.generateAccessToken)(tokenPayload);
            const refreshToken = (0, auth_service_1.generateRefreshToken)(tokenPayload);
            res.status(http_status_1.default.OK).json({
                accessToken,
                refreshToken,
                user: tokenPayload,
            });
        }
        catch (error) {
            // handle any other error.
            const errMessage = (0, error_util_1.getErrorMessage)(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(errMessage);
        }
        finally {
            // disconnect from db.
            yield models_1.default.$disconnect();
        }
    });
}
exports.authenticateUser = authenticateUser;
// Given refreshToken that is not expired, return new accessToken.
function getNewAccessToken(req, res) {
    var _a;
    try {
        // extract refreshToken
        const refreshToken = (0, auth_service_1.extractTokenFromBearerToken)((_a = req.headers.authorization) !== null && _a !== void 0 ? _a : "");
        // token is ""
        if (!refreshToken) {
            return res
                .status(http_status_1.default.UNAUTHORIZED)
                .json({ error: "invalid token." });
        }
        //if refreshToken is ok, return decoded payload object
        const { id, username, role } = (0, auth_service_1.verifyJWTRefreshToken)(refreshToken);
        // form new tokenPayload and generate new accessToken
        const tokenPayload = { id, username, role };
        const newAccessToken = (0, auth_service_1.generateAccessToken)(tokenPayload);
        // return new accessToken
        res.status(http_status_1.default.OK).json({ accessToken: newAccessToken });
    }
    catch (error) {
        // handle any other error.
        res.status(http_status_1.default.UNAUTHORIZED).json((0, error_util_1.getErrorMessage)(error));
    }
}
exports.getNewAccessToken = getNewAccessToken;
//# sourceMappingURL=auth-controller.js.map