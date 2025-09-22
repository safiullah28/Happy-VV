import Bank from "../models/bank.model.js";
import Order from "../models/order.model.js";
import Vendor from "../models/vendor.model.js";
import Agent from "../models/agent.model.js";

export const createPurchaseOrder = async (req, res) => {
  try {
    const {
      card,
      vendorId,
      agentId,
      amount,
      status,
      trackingId,
      tcsCharges,
      costPerItem,
      flightDate,
      delieveryDate,
      quantity,
      items,
    } = req.body;
    let bank = await Bank.findById(card);
    if (!bank) {
      return res.status(404).json({
        message: `Bank not exists`,
      });
    }

    let vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        message: `Vendor not found`,
      });
    }

    let agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({
        message: `Agent not found`,
      });
    }
    let order = await Order.create({
      card,
      vendor: vendorId,
      agent: agentId,
      amount: Number(amount),
      status,
      trackingId,
      tcsCharges: Number(tcsCharges),
      costPerItem: Number(costPerItem),
      flightDate,
      delieveryDate,
      quantity: Number(quantity),
      items: Number(items),
    });
    if (bank.balance < amount) {
      return res.status(400).json({
        message: `Agent not found`,
      });
    }
    bank.balance -= amount;
    bank.credit = amount;
    await bank.save();

    res.status(201).json({
      message: `Order purchased`,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in createPurchaseOrder controller : ${error.message}`,
    });
    console.log(`Error in createPurchaseOrder controller : ${error}`);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("agent")
      .populate("card")
      .populate("vendor");
    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getAllOrders controller : ${error.message}`,
    });
    console.log(`Error in getAllOrders controller : ${error}`);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("agent")
      .populate("card")
      .populate("vendor");
    if (!order) {
      return res.status(404).json({
        message: `Order not exists`,
      });
    }
    const {
      card,
      vendorId,
      agentId,
      amount,
      status,
      trackingId,
      tcsCharges,
      costPerItem,
      flightDate,
      delieveryDate,
      quantity,
      items,
    } = req.body;
    let bank = await Bank.findById(card);
    if (!bank) {
      return res.status(404).json({
        message: `Bank not exists`,
      });
    }
    let vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        message: `Vendor not found`,
      });
    }

    let agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({
        message: `Agent not found`,
      });
    }

    if (card) order.card = card;
    if (vendorId) order.vendor = vendorId;
    if (agentId) order.agent = agentId;
    if (amount) order.amount = amount;
    if (status) order.status = status;
    if (trackingId) order.trackingId = trackingId;
    if (tcsCharges) order.tcsCharges = tcsCharges;
    if (costPerItem) order.costPerItem = costPerItem;
    if (flightDate) order.flightDate = flightDate;
    if (delieveryDate) order.delieveryDate = delieveryDate;
    if (quantity) order.quantity = quantity;
    if (items) order.items = items;

    await order.save();

    res.status(200).json({
      message: `Order Updated`,
      orderId,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in updateOrderStatus controller : ${error.message}`,
    });
    console.log(`Error in updateOrderStatus controller : ${error}`);
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("agent card vendor");
    if (!order) {
      return res.status(404).json({
        message: `Order not exists`,
      });
    }
    res.status(200).json({
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getOrder controller : ${error.message}`,
    });
    console.log(`Error in getOrder controller : ${error}`);
  }
};
