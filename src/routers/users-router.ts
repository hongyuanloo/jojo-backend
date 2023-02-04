import { Router } from "express";
import {
  createOrder,
  createUser,
  deleteUser,
  getCartItems,
  getOrders,
  getUser,
  getUsers,
  updateUser,
  upsertCartItem,
} from "../controllers/users-controller";

const router = Router();

router.get("/:id/cartitems", getCartItems); //ok
router.post("/:id/cartitems", upsertCartItem); //ok
router.get("/:id/orders", getOrders); //ok
router.post("/:id/orders", createOrder); //ok
router.post("/", createUser); // ok

// For development/admin use:
router.get("/:id", getUser); //ok
router.get("/", getUsers); //ok
router.delete("/:id", deleteUser); //ok
router.put("/:id", updateUser); //ok

export default router;
