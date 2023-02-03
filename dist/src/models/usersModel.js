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
function createUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield prisma.user.createMany({
                data: [
                    {
                        username: "loo",
                        email: "loo@gg.com",
                        password: "123",
                        role: "ADMIN",
                    },
                    {
                        username: "john",
                        email: "john@gg.com",
                        password: "123",
                    },
                ],
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
            const allUsers = yield prisma.user.findMany({
                where: { role: "BASIC" },
                include: { cartItems: { include: { product: true } } }, //{ include: { product: true } }
            });
            console.log("---getUsers---", allUsers);
            console.log("---allUsers[0].cartItems---", allUsers[0].cartItems);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
//! see "Cascading deletes" at below, to delete all posts created by that user.
//https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-or-create-records
function updateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.user.updateMany({
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
function deleteAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.user.deleteMany();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.default = { createUsers, getUsers, updateUser, deleteAllUsers };
//# sourceMappingURL=usersModel.js.map