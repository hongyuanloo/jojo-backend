import { Router } from "express";
import {
  createCheckoutSession,
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
import { authenticateToken } from "../middlewares/auth-middleware";

const router = Router();

router.get("/:id/cartitems", authenticateToken, getCartItems); //protected route ok
router.post("/:id/cartitems", authenticateToken, upsertCartItem); //protected route ok
router.get("/:id/orders", authenticateToken, getOrders); //protected route ok
router.post("/:id/orders", authenticateToken, createOrder); //protected route ok
router.post("/", createUser); // ok
router.post(
  "/:id/create-checkout-session",
  authenticateToken,
  createCheckoutSession
); //ok

// For development/admin use:
router.get("/:id", getUser); //ok
router.get("/", getUsers); //ok
router.delete("/:id", deleteUser); //ok
router.put("/:id", updateUser); //ok

export default router;
