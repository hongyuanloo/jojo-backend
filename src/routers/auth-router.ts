import { Router } from "express";
import {
  authenticateUser,
  getNewAccessToken,
} from "../controllers/auth-controller";

const router = Router();

router.post("/login", authenticateUser); // ok
router.get("/access-token", getNewAccessToken); // ok

export default router;
