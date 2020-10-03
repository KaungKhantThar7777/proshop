import express from "express";
import handler from "express-async-handler";

import Product from "../models/Product.js";

const router = express.Router();

router.get(
  "/",
  handler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  })
);

router.get(
  "/:id",
  handler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

export default router;
