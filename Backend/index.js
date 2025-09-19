import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import userRouter from "./routes/user.route.js";
import connectDB from "./config/db.cofig.js";
import agentRouter from "./routes/agent.route.js";
import vendorRouter from "./routes/vendor.route.js";
import bankRouter from "./routes/bank.route.js";
import orderRouter from "./routes/order.route.js";
const app = express();

const PORT = process.env.PORT || 5009;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "40mb" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/agent", agentRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/bank", bankRouter);
app.use("/api/order", orderRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App running on PORT : ${PORT}`);
  });
});
