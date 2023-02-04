import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products-controller";

const router = Router();

// return all products in json
router.get("/", getAllProducts); //ok

// For development/admin use:
router.post("/", createProduct); //ok
router.put("/:id", updateProduct); //ok
router.delete("/:id", deleteProduct); //ok

export default router;
