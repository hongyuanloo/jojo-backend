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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// create a user
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield prisma.users.create({
                data: {
                    username: "john1",
                    email: "john1@gg.com",
                    password: "123",
                },
            });
            console.log("---createUser-..", allUsers);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// create a user
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ... you will write your Prisma Client queries here
            const allUsers = yield prisma.users.findMany();
            console.log("---getUsers---", allUsers);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
function updateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.users.updateMany({
                where: { email: "loo@gg.com" },
                data: { role: "ADMIN" },
            });
            console.log("---updateUser---", data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.default = { createUser, getUsers, updateUser };
//# sourceMappingURL=prismaDB.js.map