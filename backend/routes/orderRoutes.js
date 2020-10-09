import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDeliver,
  updateOrderToPay,
} from "../controllers/orderControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, admin, getOrders).post(protect, createOrder);
router.route("/my").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPay);
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver);

export default router;
