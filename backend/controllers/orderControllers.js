import Order from "../models/Order.js";
import handler from "express-async-handler";

export const createOrder = handler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items!");
  } else {
    const order = new Order({
      user: req.user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

export const getOrderById = handler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const updateOrderToPay = handler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    const {
      id,
      status,
      update_time,
      payer: { email_address },
    } = req.body;

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paidResult = {
      id,
      status,
      update_time,
      email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const getMyOrders = handler(async (req, res) => {
  const orders = await Order.find({ user: req.user });

  res.json(orders);
});
