import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create a user
async function createUsers() {
  try {
    const allUsers = await prisma.user.createMany({
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
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// create a user
async function getUsers() {
  try {
    // ... you will write your Prisma Client queries here
    const allUsers = await prisma.user.findMany({
      where: { role: "BASIC" },
      include: { cartItems: { include: { product: true } } }, //{ include: { product: true } }
    });
    console.log("---getUsers---", allUsers);
    console.log("---allUsers[0].cartItems---", allUsers[0].cartItems);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
//! see "Cascading deletes" at below, to delete all posts created by that user.
//https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-or-create-records
async function updateUser() {
  try {
    const data = await prisma.user.updateMany({
      where: { email: "loo@gg.com" },
      data: { role: "ADMIN" },
    });
    console.log("---updateUser---", data);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function deleteAllUsers() {
  try {
    const data = await prisma.user.deleteMany();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export default { createUsers, getUsers, updateUser, deleteAllUsers };
