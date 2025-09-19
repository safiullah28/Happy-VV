import { Router } from "express";
import {
  createPurchaseOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
const orderRouter = Router();

orderRouter.post("/addPuchasedOrder", createPurchaseOrder);
orderRouter.get("/getAllOrders", getAllOrders);
orderRouter.get("/:orderId", getOrder);

orderRouter.patch("/updateOrder/:orderId", updateOrderStatus);
export default orderRouter;
