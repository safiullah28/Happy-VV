import mongoose from "mongoose";
const bankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    date: {
      type: Date,
      deafult: Date.now(),
    },
    description: {
      type: String,
    },
    credit: {
      type: Number,
      deafult: 0,
    },
    debit: {
      type: Number,
      deafult: 0,
    },
    balance: {
      type: Number,
      deafult: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Bank = mongoose.model("Bank", bankSchema);

export default Bank;
