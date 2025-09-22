import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
} from "../controllers/customer.controller.js";
const customerRouter = Router();

customerRouter.get("/getAllCustomers", getAllCustomers);
customerRouter.get("/:customerId", getSingleCustomer);

customerRouter.post("/addCustomer", createCustomer);
customerRouter.patch("/update/:customerId", updateCustomer);
customerRouter.post("/deleteCustomer", deleteCustomer);

export default customerRouter;
