import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);
const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
