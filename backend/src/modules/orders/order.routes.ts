import { Router } from "express";
import { getOrders, postOrder, updateOrder } from "./order.controller.js";

const router = Router();

router.get("/", getOrders);
router.post("/", postOrder);
router.put("/:orderId", updateOrder);

export default router;
