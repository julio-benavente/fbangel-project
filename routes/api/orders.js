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
      .populate({
        path: "payments",
        populate: {
          path: "payee",
          model: "user",
          select: "firstName lastName -_id",
        },
      })
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

  console.log("payees", payees);

  // create payment
  const payments = await Promise.all(
    payees.map(async ({ id, referenceId, referenceReferral, concept: paymentConcept }) => {
      try {
        const user = await User.findOne({ referralCode: referenceReferral });

        if (!user) {
          // If the user entered and wrong referral code as his referral
          // with this the reference will be 'paid' and will not longer appear again to be paid
          if (product.abrv === "referral") {
            User.findByIdAndUpdate(referenceId, {
              $set: { referralHasBeenPaid: true },
            }).exec();
          }

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
          concept: paymentConcept,
          amount: price,
          createdBy,
          payee: id,
          paymentMethod: user.paymentMethod,
        };

        if (user.paymentMethod === "paypal") {
          paymentInformation.paypalEmail = user.paypalEmail;
        }

        if (user.paymentMethod === "bank-peru") {
          paymentInformation.bankAngency = user.bankAngency;
        }

        const newPayment = await new Payment(paymentInformation).save();

        if (product.abrv === "rental") {
          User.findByIdAndUpdate(id, {
            $set: {
              "payments.firstRentPaid": true,
            },
          }).exec();
        }

        if (product.abrv === "referral") {
          User.findByIdAndUpdate(referenceId, {
            $set: { referralHasBeenPaid: true },
          }).exec();
        }

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
    payOrder: "paid",
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
          Payment.findByIdAndUpdate(paymentId, {
            $set: { status: status },
          }).exec();

          if (action === "payOrder") {
            Payment.findByIdAndUpdate(paymentId, {
              $set: { paymentDate: new Date() },
            }).exec();
          }

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

    await Order.findByIdAndUpdate(orderId, {
      $set: {
        status,
        approvedBy: req.adminId,
      },
      $push: {
        errorList: { $each: errors },
      },
    }).exec();

    res.json({ order: { payments, errors } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
