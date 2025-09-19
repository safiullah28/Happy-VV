import Vendor from "../models/vendor.model.js";

export const addVendor = async (req, res) => {
  try {
    const { company, website, agentId } = req.body;
    console.log(agentId);
    if (!company) {
      return res.status(400).json({
        message: `Company is required for vendor`,
      });
    }
    const vendor = await Vendor.create({
      company,
      website,
      agent: agentId,
    });
    const populatedVendor = await Vendor.findById(vendor._id).populate("agent");
    res.status(201).json({
      message: `Vendor created`,
      vendor: populatedVendor,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in addVendor controller : ${error.message}`,
    });
    console.log(`Error in addVendor controller : ${error}`);
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({}).populate("agent");
    const totalVendors = vendors.length;

    res.status(200).json({
      vendors,
      totalVendors,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getAllVendors controller : ${error.message}`,
    });
    console.log(`Error in getAllVendors controller : ${error}`);
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { company, website, agentId } = req.body;
    const vendor = await Vendor.findById(vendorId).populate("agent");
    if (!vendor) {
      return res.status(404).json({
        message: `Vendor not exist`,
      });
    }
    if (company) vendor.company = company;
    if (website) vendor.website = website;
    if (agentId) vendor.agent = agentId;
    await vendor.save();
    res.status(200).json({
      message: `Vendor updated`,
      vendor,
      vendorId,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in updateVendor controller : ${error.message}`,
    });
    console.log(`Error in updateVendor controller : ${error}`);
  }
};

export const getVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId).populate("agent");
    if (!vendor) {
      return res.status(404).json({
        message: `Vendor not exist`,
      });
    }
    res.status(200).json({
      vendor,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getVendor controller : ${error.message}`,
    });
    console.log(`Error in getVendor controller : ${error}`);
  }
};
