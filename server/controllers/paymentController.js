const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const chargeCustomer = async (customerId) => {
  // Lookup the payment methods available for the customer
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
  });
  // Charge the customer and payment method immediately
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 30 * 100,
    currency: "cad",
    customer: customerId,
    payment_method: paymentMethods.data[0].id,
    off_session: true,
    confirm: true,
  });
  if (paymentIntent.status === "succeeded") {
    console.log("✅ Successfully charged card off session");
  }
};

/**
 * @description Stripe create payment intent, customer (save to DB) and charge
 */
const paymentRequest = AsyncHandler(async (req, res) => {
  const { items, userInfo } = req.body;

  const user = await User.findById(userInfo._id);

  if (!user.stripeCustomer) {
    const customer = await stripe.customers.create({
      name: userInfo.name,
      email: userInfo.email,
      description: "First customer",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      setup_future_usage: "off_session",
      amount: 30 * 100,
      currency: "cad",
    });

    // save stripe customer id to our database
    user.stripeCustomer = customer.id;
    const updatedUser = await user.save();

    res.send({
      clientSecret: paymentIntent.client_secret,
      customerID: updatedUser.stripeCustomer,
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    customer: user.stripeCustomer,
    setup_future_usage: "off_session",
    amount: 30 * 100,
    currency: "cad",
  });

  res.send({
    message: "existing Stripe customer, no need to create new!",
    clientSecret: paymentIntent.client_secret,
    customerID: user.stripeCustomer,
  });
});

module.exports = { paymentRequest };
