import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["INPROCESS", "CANCELLED", "DELIEVERED", "COMPLETED"],
    },
    trackingId: {
      type: String,
    },
    tcsCharges: {
      type: Number,
    },
    costPerItem: {
      type: Number,
    },
    flightDate: {
      type: Date,
    },
    delieveryDate: {
      type: Date,
    },
    quantity: {
      type: Number,
    },
    items: {
      type: Number,
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
