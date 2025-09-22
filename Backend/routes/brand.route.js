import express from "express";
import {
  createBrand,
  getAllBrands,
  updateBrand,
} from "../controllers/brand.controller.js";
const brandRouter = express.Router();

brandRouter.post("/createBrand", createBrand);
brandRouter.patch("/update/:brandId", updateBrand);
brandRouter.get("/getAllBrands", getAllBrands);

export default brandRouter;
