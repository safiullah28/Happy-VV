import { Router } from "express";
import {
  addBank,
  getAllBanks,
  getSingleBank,
  updateAmount,
} from "../controllers/bank.controller.js";
const bankRouter = Router();

bankRouter.post("/addBank", addBank);
bankRouter.get("/getAllBanks", getAllBanks);
bankRouter.get("/:bankId", getSingleBank);
bankRouter.patch("/update/:bankId", updateAmount);
export default bankRouter;
