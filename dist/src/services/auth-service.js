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
exports.verifyJWTRefreshToken = exports.verifyJWTAccessToken = exports.extractTokenFromBearerToken = exports.generateRefreshToken = exports.generateAccessToken = exports.isPasswordMatched = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
// given password, hash it with saltRounds defined.
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        try {
            return yield (0, bcrypt_1.hash)(password, saltRounds);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.hashPassword = hashPassword;
// compare if password matches hashedPassword,
function isPasswordMatched(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield (0, bcrypt_1.compare)(password, hashedPassword);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.isPasswordMatched = isPasswordMatched;
// generate 64 random bytes in string.
function generateRandomBytes() {
    /* generate 64 random bytes and convert to hex format.
    -Use this to generate "ACCESS_TOKEN_SECRET" and "REFRESH_TOKEN_SECRET" */
    const buffer = crypto_1.default.randomBytes(64).toString("hex");
    return buffer;
}
// given tokenPayLoad, generate access token using secret key.
function generateAccessToken(tokenPayLoad) {
    // generate access token based on tokenPayLoad
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const lifeSpan = parseInt(process.env.ACCESS_TOKEN_LIFESPAN || "61");
    return jsonwebtoken_1.default.sign(tokenPayLoad, secretKey, {
        expiresIn: lifeSpan,
    });
}
exports.generateAccessToken = generateAccessToken;
// given tokenPayLoad, generate refresh token using secret key.
function generateRefreshToken(tokenPayLoad) {
    // generate refresh token based on tokenPayLoad
    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    const lifeSpan = parseInt(process.env.REFRESH_TOKEN_LIFESPAN || "600");
    return jsonwebtoken_1.default.sign(tokenPayLoad, secretKey, {
        expiresIn: lifeSpan,
    });
}
exports.generateRefreshToken = generateRefreshToken;
// given Authentication Bearer Token, extract the token and return
function extractTokenFromBearerToken(bearerToken) {
    return bearerToken.split(" ")[1];
}
exports.extractTokenFromBearerToken = extractTokenFromBearerToken;
// given jwtToken, if token is valid(or not expired) return ItokenPayLoad
function verifyJWTAccessToken(token) {
    try {
        //return decoded payload object
        //error if token mismatch or expired.
        const { id, username, role } = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // return only "ItokenPayLoad" information
        return { id, username, role };
    }
    catch (err) {
        throw err;
    }
}
exports.verifyJWTAccessToken = verifyJWTAccessToken;
// given jwtToken, if token is valid(or not expired) return ItokenPayLoad
function verifyJWTRefreshToken(token) {
    try {
        //return decoded payload object
        //error if token mismatch or expired.
        const { id, username, role } = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
        // return only "ItokenPayLoad" information
        return { id, username, role };
    }
    catch (err) {
        throw err;
    }
}
exports.verifyJWTRefreshToken = verifyJWTRefreshToken;
//# sourceMappingURL=auth-service.js.map