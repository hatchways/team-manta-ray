const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Recipe",
        },
      },
    ],
    chefId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    bookingDate: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: false,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    paidAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
