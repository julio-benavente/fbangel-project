const router = require("express").Router();

// Models
const Order = require("../../models/Order");
const User = require("../../models/User");
const Product = require("../../models/Product");
const Payment = require("../../models/Payment");

// Middleware and utils
const auth = require("../../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("payments")
      .sort({ creationDate: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/create-order", auth, async (req, res) => {
  const { product: productId, concept, createdBy, payees } = req.body;

  const errors = [];
  // get product
  const product = await Product.findById(productId);

  // create payment
  const payments = await Promise.all(
    payees.map(async ({ id }) => {
      try {
        const user = await User.findById(id);

        if (!user) {
          throw Error("User doesn't exit or is not logged in");
        }

        var { prices } = await Product.findOne(
          { _id: productId },
          { prices: { $elemMatch: { tierName: user.payments.tier } } }
        );

        var price = prices[0].price;
        // default price
        if (!price) {
          var { prices } = await Product.findOne(
            { _id: productId },
            { prices: { $elemMatch: { tierName: "tierOne" } } }
          ).prices[0].price;

          var price = prices[0].price;
        }

        const paymentInformation = {
          product: productId,
          concept,
          amount: price,
          paypalEmail: user.paypalEmail,
          createdBy,
          payee: id,
        };

        const newPayment = await new Payment(paymentInformation).save();

        // payments.push(newPayment._id); // array of payments
        user.payments.list.push(newPayment._id);
        user.save();
        return newPayment._id;
      } catch (error) {
        errors.push({
          userId: id,
          error: error.message,
          where: "/create-order",
        });
      }
    })
  );

  const orderInformation = {
    product,
    concept,
    payments,
    createdBy,
    errorsList: errors,
  };

  try {
    const newOrder = await new Order(orderInformation).save();
    res.json({ order: newOrder });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put("/change-status/:action", auth, async (req, res) => {
  const { action } = req.params;

  const { [action]: status } = {
    payOrder: "payed",
    cancelOrder: "canceled",
  };
  try {
    if (!status) {
      throw Error("Such action doesn't is not available");
    }

    const { order: orderId } = req.body;

    const errors = [];

    const order = await Order.findById(orderId);

    const payments = await Promise.all(
      order.payments.map(async (paymentId) => {
        try {
          await Payment.findByIdAndUpdate(paymentId, {
            $set: { status: status },
          });

          return paymentId;
        } catch (error) {
          errors.push({
            paymentId,
            error: error.message,
            where: status,
          });
        }
      })
    );

    order.status = status;
    order.approvedBy = req.adminId;
    errors.map((error) => order.errorList.push(error));
    order.save();

    res.json({ order: { payments, errors } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;