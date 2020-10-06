import handler from "express-async-handler";

import Product from "../models/Product.js";

export const getProducts = handler(async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

export const getProductById = handler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else {
    res.status(404).json({ message: "Product not found" });
  }
});
