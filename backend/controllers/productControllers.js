import handler from "express-async-handler";

import Product from "../models/Product.js";

export const getProducts = handler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const total = await Product.countDocuments(keyword);
  const products = await Product.find(keyword)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({ pages: Math.ceil(total / pageSize), page, products });
});

export const getTopProducts = handler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

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

export const createProductReview = handler(async (req, res) => {
  const { name, comment, rating } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user.toString());
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Already reviewed for this product");
    }

    const review = {
      name,
      comment,
      rating: Number(rating),
      user: req.user,
    };

    product.reviews.push(review);
    product.numReviews++;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
