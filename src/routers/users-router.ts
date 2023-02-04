import { Router } from "express";
import {
  createUser,
  deleteUser,
  getCartItems,
  getUser,
  getUsers,
  updateUser,
  upsertCartItem,
} from "../controllers/users-controller";

const router = Router();

router.post("/", createUser); // ok
router.get("/:id/cartitems", getCartItems); //ok
router.post("/:id/cartitems", upsertCartItem); //ok

// For development/admin use:
router.get("/", getUsers); //ok
router.get("/:id", getUser);
router.delete("/:id", deleteUser); //ok
router.put("/:id", updateUser); //ok

export default router;
