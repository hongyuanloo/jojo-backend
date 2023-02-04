import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create products
async function createProducts() {
  try {
    const products = await prisma.product.createMany({
      data: [
        {
          title: "Awesome Cotton Bacon",
          description:
            "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
          price: "96",
          categories: ["Electronics"],
          images: [
            "https://api.lorem.space/image/watch?w=640&h=480&r=6672",
            "https://api.lorem.space/image/watch?w=640&h=480&r=7157",
          ],
        },
        {
          title: "Tasty Bronze Chips",
          description:
            "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
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
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// get all products
async function getProducts() {
  try {
    // ... you will write your Prisma Client queries here
    const allProducts = await prisma.product.findMany();
    console.log("---getProducts---", allProducts);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
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

export default { createProducts, getProducts };
