const Order = require("../models/orderModel.js");
const AsyncHandler = require("express-async-handler");

/**
 * @description Create new order
 * @route       POST /api/orders
 * @access      Private
 */
const addOrderItems = AsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    bookingDate,
    instructions,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      bookingDate,
      instructions,
      itemsPrice,
      taxPrice,
      totalPrice,
      paidAt: Date.now(),
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

module.exports = { addOrderItems, getData };
