import Brand from "../models/brand.model.js";
import bcrypt from "bcryptjs";

export const createBrand = async (req, res) => {
  try {
    const { name, website, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 7);
    const brand = await Brand.create({
      name,
      website,
      portalLink: {
        email,
        password: hashPassword,
      },
    });
    res.status(201).json({
      brand,
      message: `Brand created`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in createBrand controller : ${error.message}`,
    });
    console.log(`Error in createBrand controller  :${error}`);
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json({
        message: `Requested brand not found`,
      });
    }
    const { name, website, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 7);
    if (name) {
      brand.name = name;
    }
    if (website) {
      brand.website = website;
    }
    if (name) {
      brand.portalLink.email = email;
    }
    if (password) {
      brand.portalLink.password = hashPassword;
    }
    await brand.save();
    res.status(200).json({
      message: `Brand data updated`,
      brandId,
      brand,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in updateBrand controller : ${error.message}`,
    });
    console.log(`Error in updateBrand controller  :${error}`);
  }
};

export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json({
      brands: brands.length === 0 ? [] : brands,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in getAllBrands controller : ${error.message}`,
    });
    console.log(`Error in getAllBrands controller  :${error}`);
  }
};
