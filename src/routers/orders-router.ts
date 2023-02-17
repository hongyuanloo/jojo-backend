import { Router } from "express";
import { updateOrderStatus } from "../controllers/orders-controller";
import { authenticateToken } from "../middlewares/auth-middleware";

const router = Router();

router.put("/:id", authenticateToken, updateOrderStatus); //protected route ok

export default router;
