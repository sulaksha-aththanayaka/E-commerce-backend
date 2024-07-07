import express from 'express'
import Product from '../models/Product.js';


export const addProduct = async (req, res) => {
    const {name, brand, price, description, img } = req.body;

    if(!name || !brand || !price || !description || !img){
        return res.status(400).json("Please fill all the inputs");
    }

    const product = new Product({
        name,
        brand,
        price,
        description,
        img
    });

    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
}

