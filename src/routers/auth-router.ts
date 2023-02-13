import { Router } from "express";
import {
  authenticateUser,
  getNewAccessToken,
} from "../controllers/auth-controller";
import { authenticateToken } from "../middlewares/auth-middleware";

const router = Router();

router.post("/login1", authenticateToken, authenticateUser); //!delete
router.post("/login", authenticateUser); // ok
router.get("/access-token", getNewAccessToken); // ok

export default router;
