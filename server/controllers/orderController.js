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
    chefId,
    bookingDate,
    instructions,
    itemsPrice,
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
      chefId,
      bookingDate,
      instructions,
      itemsPrice,
      totalPrice,
      paidAt: Date.now(),
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

/**
 * @description get current user's orders
 * @route       Get /api/orders
 * @access      Private
 */
const getCurrentUserOrders = AsyncHandler(async (req, res) => {
  const { user } = req;

  try {
    if (user.isChef) {
      const orders = await Order.find({ chefId: user._id }).populate("user", [
        "name",
        "profilePictureUrl",
        "bio",
        "cuisines",
      ]);
      res.status(200).json({ success: true, orders });
    } else {
      const orders = await Order.find({ user: user._id }).populate("chefId", [
        "name",
        "profilePictureUrl",
        "bio",
        "cuisines",
      ]);
      res.status(200).json({ success: true, orders });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = { addOrderItems, getCurrentUserOrders };
