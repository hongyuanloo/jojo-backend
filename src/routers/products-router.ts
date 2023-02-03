import { Router } from "express";
import { getAllProducts } from "../controllers/products-controller";

const router = Router();

/* GET programming languages. */
router.get("/", getAllProducts);

export default router;
