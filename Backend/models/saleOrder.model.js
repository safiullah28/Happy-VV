import mongoose from "mongoose";

const saleOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
    },
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    amount: {
      type: Number,
    },

    trackingId: {
      type: String,
      default: null,
    },
    shipper: {
      type: String,
      enum: ["TCS", "POSTEX"],
    },
    bank: { type: mongoose.Schema.Types.ObjectId, ref: "Bank" },
    paymentMethod: {
      type: String,
      enum: ["BANK", "CREDIT CARD", "COD", "CASH"],
    },
  },
  { timestamps: true }
);

const SaleOrder = mongoose.model("SaleOrder", saleOrderSchema);
export default SaleOrder;
