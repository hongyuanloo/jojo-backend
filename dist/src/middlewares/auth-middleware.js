"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const auth_service_1 = require("../services/auth-service");
const jsonwebtoken_1 = require("jsonwebtoken");
const http_status_1 = __importDefault(require("http-status"));
const error_util_1 = require("../utils/error-util");
function authenticateToken(req, res, next) {
    var _a;
    /*Authenticate accessToken:
    1. token extracted from "bearer token" in req.headers.authorization.
    2. store user data extracted from payload in "res.locals.user = { id, username, role };" , for use in next().
    3. token only useable within its life span.
    */
    try {
        // extract token
        const accessToken = (0, auth_service_1.extractTokenFromBearerToken)((_a = req.headers.authorization) !== null && _a !== void 0 ? _a : "");
        // token is ""
        if (!accessToken) {
            return res
                .status(http_status_1.default.UNAUTHORIZED)
                .json({ error: "invalid token." });
        }
        //get decoded payload object from JWT; error if token mismatch or expired.
        const { id, username, role } = (0, auth_service_1.verifyJWTAccessToken)(accessToken);
        // user information to "res.locals.user" so that next middleware can access them.
        res.locals.user = {
            id: id,
            username: username,
            role: role,
        };
        //! development use only!
        res.locals.user = {
            role: "ADMIN",
        };
        console.log("--Development accessToken ok.--");
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            if (error.message === "jwt expired") {
                return res.status(http_status_1.default.FORBIDDEN).json({ error: error.message });
            }
            res.status(http_status_1.default.UNAUTHORIZED).json({ error: error.message });
        }
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json((0, error_util_1.getErrorMessage)(error));
    }
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth-middleware.js.map