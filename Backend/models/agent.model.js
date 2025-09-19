import mongoose from "mongoose";
const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    rateperkg: {
      type: String,
      default: "",
    },
    socialLink: {
      type: String,
      default: "",
    },
    mobilenumber: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: "",
    },
    address2: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
