import { Router } from "express";
import { createUser } from "../controllers/users-controller";

const router = Router();

router.post("/", createUser); // ok

export default router;
