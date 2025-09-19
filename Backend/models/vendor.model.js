import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: null,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
