import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users-controller";

const router = Router();

router.post("/", createUser); // ok

// For development/admin use:
router.get("/", getUsers); //ok
router.get("/:id", getUser);
router.delete("/:id", deleteUser); //ok
router.put("/:id", updateUser); //ok

export default router;
