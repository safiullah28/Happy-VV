import { Router } from "express";
import {
  addVendor,
  getAllVendors,
  getVendor,
  updateVendor,
} from "../controllers/vendor.controller.js";
const vendorRouter = Router();

vendorRouter.post("/addVendor", addVendor);
vendorRouter.get("/vendors", getAllVendors);
vendorRouter.get("/:vendorId", getVendor);
vendorRouter.patch("/updateVendor/:vendorId", updateVendor);
export default vendorRouter;
