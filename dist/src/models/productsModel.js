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
// create products
function createProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield prisma.product.createMany({
                data: [
                    {
                        title: "Awesome Cotton Bacon",
                        description: "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
                        price: "96",
                        categories: ["Electronics"],
                        images: [
                            "https://api.lorem.space/image/watch?w=640&h=480&r=6672",
                            "https://api.lorem.space/image/watch?w=640&h=480&r=7157",
                        ],
                    },
                    {
                        title: "Tasty Bronze Chips",
                        description: "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
                        price: "475",
                        categories: ["Others"],
                        images: [
                            "https://api.lorem.space/image?w=640&h=480&r=7520",
                            "https://api.lorem.space/image?w=640&h=480&r=5380",
                        ],
                    },
                ],
            });
            console.log("---createProducts-..", products);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// get all products
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ... you will write your Prisma Client queries here
            const allProducts = yield prisma.product.findMany();
            console.log("---getProducts---", allProducts);
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
exports.default = { createProducts, getProducts };
//# sourceMappingURL=productsModel.js.map