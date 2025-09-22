import mongoose from "mongoose";
import validator from "validator";
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      deafult: null,
    },

    email: {
      type: String,
      deafult: null,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address.",
      },
    },
    address: {
      type: String,
      deafult: null,
    },
    phone: {
      type: Number,
      deafult: null,
    },
    city: {
      type: String,
      deafult: null,
    },
    zip: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
