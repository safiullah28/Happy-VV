import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      default: null,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    quantity: {
      type: Number,
    },
    expiry: {
      type: Date,
      default: Date.now(),
    },
    cost: {
      type: Number,
    },
    sale: {
      type: Number,
    },
    profit: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
