import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPay,
} from "../controllers/orderControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/my").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPay);

export default router;
