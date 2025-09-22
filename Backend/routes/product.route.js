import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const stockRouter = express.Router();

stockRouter.post("/createProduct", createProduct);
stockRouter.get("/getAllProducts", getAllProducts);
stockRouter.patch("/update/:productId", updateProduct);

export default stockRouter;
