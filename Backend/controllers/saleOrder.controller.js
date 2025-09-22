import SaleOrder from "../models/saleOrder.model.js";
import Counter from "../models/counter.model.js";
import Bank from "../models/bank.model.js";

export const createSaleOrder = async (req, res) => {
  try {
    const {
      orderDate,
      customer,
      amount,
      trackingId,
      shipper,
      bank,
      paymentMethod,
    } = req.body;
    let bankk = await Bank.findById(bank);
    if (!bankk) {
      return res.status(404).json({
        message: `Bank not exists`,
      });
    }

    let counter = await Counter.findOne({ name: "orderNumber" });
    if (!counter) {
      counter = await Counter.create({ name: "orderNumber", value: 0 });
    }

    counter.value += 1;
    bankk.balance += amount;
    bankk.debit = amount;
    await bankk.save();
    await counter.save();

    const saleOrder = new SaleOrder({
      orderNumber: counter.value,
      orderDate,
      customer,
      amount,
      trackingId,
      shipper,
      bank,
      paymentMethod,
    });

    await saleOrder.save();

    res.status(201).json({
      message: "Sale order created successfully",
      saleOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating sale order",
      error: error.message,
    });
  }
};

export const updateSaleOrderStatus = async (req, res) => {
  try {
    const { saleOrderId } = req.params;
    const saleOrder = await SaleOrder.findById(saleOrderId);
    if (!saleOrder) {
      return res.status(404).json({
        message: `No Sale order found`,
      });
    }
    const {
      orderDate,
      customer,
      amount,
      trackingId,
      shipper,
      bank,
      paymentMethod,
    } = req.body;

    if (orderDate) {
      saleOrder.orderDate = orderDate;
    }

    if (customer) {
      saleOrder.customer = customer;
    }
    if (amount) {
      saleOrder.amount = amount;
    }
    if (trackingId) {
      saleOrder.trackingId = trackingId;
    }
    if (shipper) {
      saleOrder.shipper = shipper;
    }
    if (bank) {
      saleOrder.bank = bank;
    }
    if (paymentMethod) {
      saleOrder.paymentMethod = paymentMethod;
    }
    await saleOrder.save();
    res.status(200).json({
      message: `Order status updated`,
      saleOrderId,
      saleOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in updateSaleOrderStatus controller : ${error.message}`,
    });
    console.log(`Error in updateSaleOrderStatus controller  :${error}`);
  }
};

export const getAllSaleOrders = async (req, res) => {
  try {
    const saleOrders = await SaleOrder.find({})
      .populate("bank")
      .populate("customer");

    if (saleOrders.length === 0) {
      return res.status(200).json({
        saleOrders: [],
      });
    }
    res.status(200).json({
      saleOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getAllSaleOrders controller : ${error.message}`,
    });
    console.log(`Error in getAllSaleOrders controller  :${error}`);
  }
};
