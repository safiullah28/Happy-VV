import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, brand, quantity, expiry, cost, sale, profit } =
      req.body;
    const product = await Product.create({
      productName,
      brand,
      quantity,
      expiry,
      cost,
      sale,
      profit,
    });
    res.status(201).json({
      message: `Stock created`,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in createProduct controller : ${error.message}`,
    });
    console.log(`Error in createProduct controller  :${error}`);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("brand");
    res.status(200).json({
      products: products.length === 0 ? [] : products,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getAllProducts controller : ${error.message}`,
    });
    console.log(`Error in getAllProducts controller  :${error}`);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("brand");
    if (!product) {
      return res.status(404).json({
        message: `Product not found`,
      });
    }
    const { productName, brand, quantity, expiry, cost, sale, profit } =
      req.body;
    if (productName) {
      product.productName = productName;
    }
    if (brand) {
      product.brand = brand;
    }
    if (quantity) {
      product.quantity = quantity;
    }
    if (productName) {
      product.productName = productName;
    }
    if (expiry) {
      product.expiry = expiry;
    }
    if (cost) {
      product.cost = cost;
    }
    if (sale) {
      product.sale = sale;
    }
    if (profit) {
      product.profit = profit;
    }
    await product.save();
    res.status(200).json({
      message: `Product data updated`,
      product,
      productId,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in updateProduct controller : ${error.message}`,
    });
    console.log(`Error in updateProduct controller  :${error}`);
  }
};
