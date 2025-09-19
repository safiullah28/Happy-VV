import express from "express";
import {
  addAgent,
  getAllAgents,
  updateAgent,
} from "../controllers/agent.controller.js";
const agentRouter = express.Router();

agentRouter.post("/addAgent", addAgent);
agentRouter.patch("/updateAgent/:agentId", updateAgent);
agentRouter.get("/getAllAgents", getAllAgents);

export default agentRouter;
