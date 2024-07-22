import express from "express";
import Product from "../models/Product.js";


export const addProduct = async (req, res) => {
  const { name, brand, price, description } = req.body;
  const img = req.file ? req.file.filename : null;

  if (!name || !brand || !price || !description || !img) {
    return res.status(400).json("Please fill all the inputs to proceed");
  }

  try {
    const product = new Product({
      name,
      brand,
      price,
      description,
      img,
    });

    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);

    if (!product) {
      res.status(400).json("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error terieving the product", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });

    if (!deleteProduct) {
      return res.status(400).jaon("Product not found");
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, price, description, img } = req.body;

    const product = await Product.findById({ _id: id });

    if (!product) {
      res.status(400).json("Product not found");
    }

    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.price = price || product.price;
    product.description = description || product.description;
    product.img = img || product.img;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const getProductByName = async (req, res) => {
  try {
    const {name} = req.params;

    const product = await Product.findOne({name});

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: "Error getting the product", error });
  }
};

export const uploadFile = async (req, res) => {
  res.json(req.file);
}
