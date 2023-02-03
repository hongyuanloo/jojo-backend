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
// create cart item
function createCartItem() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cartItem = yield prisma.cartItem.create({
                data: {
                    quantity: 10,
                    // productId: "12055a26-3698-46e4-b9a1-14ce194ac79a",
                    productId: "8909d9ce-b260-4111-8627-c6abb164a977",
                    // userId: "920dc51d-6287-4328-8ff2-13f47aa8e8cc",
                    userId: "cc2e1666-02d2-4644-828a-f7417b9c5f9c",
                },
            });
            console.log("---createCartItem-..", cartItem);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// get all cart items
function getCartItems() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ... you will write your Prisma Client queries here
            const allcartItems = yield prisma.cartItem.findMany({
                where: {
                    AND: {
                        productId: "ad7c707c-b0ef-4be2-b70f-936e93d2439b",
                        userId: "5adbd720-d099-4163-8faf-5eb1b69f125a",
                    },
                },
                include: {
                    user: true,
                    product: true,
                },
            });
            console.log("---getCartItems---", allcartItems);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// upsert cart items or qty
function upsertCartItems() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ... you will write your Prisma Client queries here
            const allcartItems = yield prisma.cartItem.upsert({
                where: {
                    productId_userId: {
                        productId: "ad7c707c-b0ef-4be2-b70f-936e93d2439b",
                        userId: "5adbd720-d099-4163-8faf-5eb1b69f125a",
                    },
                },
                update: { quantity: 30 },
                create: {
                    quantity: 20,
                    productId: "ad7c707c-b0ef-4be2-b70f-936e93d2439b",
                    userId: "5adbd720-d099-4163-8faf-5eb1b69f125a",
                },
            });
            console.log("---getCartItems---", allcartItems);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// async function updateUser() {
//   try {
//     const data = await prisma.users.updateMany({
//       where: { email: "loo@gg.com" },
//       data: { role: "ADMIN" },
//     });
//     console.log("---updateUser---", data);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// async function deleteAllUsers() {
//   try {
//     const data = await prisma.users.deleteMany();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
exports.default = { createCartItem, getCartItems, upsertCartItems };
//# sourceMappingURL=cartItemsModel.js.map