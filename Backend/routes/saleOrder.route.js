import express from "express";
const saleOrderRouter = express.Router();
import {
  createSaleOrder,
  getAllSaleOrders,
  updateSaleOrderStatus,
} from "../controllers/saleOrder.controller.js";

saleOrderRouter.post("/createSaleOrder", createSaleOrder);
saleOrderRouter.patch("/update/:saleOrderId", updateSaleOrderStatus);
saleOrderRouter.get("/getAllSaleOrders", getAllSaleOrders);

export default saleOrderRouter;
