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

export const deleteProduct = handler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export const createProduct = handler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    image: "/images/sample.jpg",
    user: req.user,
    description: "sample description",
    brand: "sample brand",
    category: "sample category",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export const updateProduct = handler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.price = price;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
