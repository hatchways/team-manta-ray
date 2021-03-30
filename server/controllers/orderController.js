const Order = require("../models/orderModel.js");
const AsyncHandler = require("express-async-handler");

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

module.exports = { getCurrentUserOrders };
