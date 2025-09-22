import Customer from "../models/customer.model.js";

export const createCustomer = async (req, res) => {
  try {
    const { name, email, address, phone, city, zip } = req.body;
    const customer = await Customer.create({
      name,
      email,
      address,
      phone: Number(phone),
      city,
      zip,
    });
    res.status(201).json({
      customer,
      message: `Customer added`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in createCustomer controller : ${error.message}`,
    });
    console.log(`Error in createCustomer controller : ${error}`);
  }
};
export const deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    let customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        message: `Customer not found`,
      });
    }
    customer = await Customer.findByIdAndDelete(customerId);
    res.status(201).json({
      customer,
      message: `Customer deleted`,
      customerId,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in deleteCustomer controller : ${error.message}`,
    });
    console.log(`Error in deleteCustomer controller : ${error}`);
  }
};
export const updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    let customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        message: `customer not found`,
      });
    }
    const { name, email, address, phone, city, zip } = req.body;
    if (name) {
      customer.name = name;
    }
    if (email) {
      customer.name = name;
    }
    if (address) {
      customer.name = name;
    }
    if (phone) {
      customer.phone = Number(phone);
    }
    if (city) {
      customer.city = city;
    }
    if (zip) {
      customer.zip = zip;
    }
    res.status(200).json({
      customer,
      message: `Customer data updated`,
      customerId,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in updateCustomer controller : ${error.message}`,
    });
    console.log(`Error in updateCustomer controller : ${error}`);
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    if (customers.length === 0) {
      return res.status(200).json({
        customers: [],
      });
    }
    res.status(200).json({
      customers,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getAllCustomers controller : ${error.message}`,
    });
    console.log(`Error in getAllCustomers controller : ${error}`);
  }
};

export const getSingleCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    let customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        message: `Customer not found`,
      });
    }
    res.status(200).json({
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getSingleCustomer controller : ${error.message}`,
    });
    console.log(`Error in getSingleCustomer controller : ${error}`);
  }
};
