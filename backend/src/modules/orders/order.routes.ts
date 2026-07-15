import { Router } from "express";
import { getOrders, postOrder, updateOrder } from "./order.controller.js";
import { validate } from "../../middlewares/validate.js";
import { CreateOrderSchema, UpdateOrderSchema } from "./order.schema.js";

const router = Router();

router.get("/", getOrders);
router.post("/", validate(CreateOrderSchema), postOrder);
router.patch("/:id/status", validate(UpdateOrderSchema), updateOrder);

export default router;
