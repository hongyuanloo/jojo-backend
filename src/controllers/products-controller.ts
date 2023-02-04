import { Request, Response } from "express";
import httpStatus from "http-status";
import prisma from "../models";
import { getErrorMessage } from "../utils/error-util";

// retun all products in json.
export async function getAllProducts(req: Request, res: Response) {
  try {
    //get all products.
    const products = await prisma.product.findMany();
    res.status(httpStatus.OK).json(products);
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errMessage);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

// [ADMIN] create a product
// data reference: https://fakeapi.platzi.com/en/rest/categories#get-all-products-by-category
export async function createProduct(req: Request, res: Response) {
  const { title, description, price, isFeatured, categories, images } =
    req.body;

  try {
    //create a product
    const product = await prisma.product.create({
      data: { title, description, price, isFeatured, categories, images },
    });
    res.status(httpStatus.CREATED).json(product);
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errMessage);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

// [ADMIN] delete a product
export async function deleteProduct(req: Request, res: Response) {
  const id = req.params.id;

  try {
    // check if id is valid.
    const foundProduct = await prisma.product.findUnique({
      where: { id },
    });

    // id not found, return { error: `${id} is invalid.` }
    if (!foundProduct) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `${id} is invalid.` });
    }

    //create a product
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    res.status(httpStatus.OK).json(deletedProduct);
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errMessage);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}

// [ADMIN] update a product
export async function updateProduct(req: Request, res: Response) {
  const id = req.params.id;

  try {
    // check if id is valid.
    const foundProduct = await prisma.product.findUnique({
      where: { id },
    });

    // id not found, return { error: `${id} is invalid.` }
    if (!foundProduct) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: `${id} is invalid.` });
    }

    //update a product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { ...req.body },
    });
    res.status(httpStatus.OK).json(updatedProduct);
  } catch (error) {
    // handle any other error.
    const errMessage = getErrorMessage(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errMessage);
  } finally {
    // disconnect from db.
    await prisma.$disconnect();
  }
}
