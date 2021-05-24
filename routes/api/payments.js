const router = require("express").Router();
const Payment = require("../../models/Payment");
const User = require("../../models/User");

// Middlewares and utils
const auth = require("../../middlewares/auth");

// @desc get all the payments
router.get("/", auth, async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate({ path: "createdBy", select: "email" })
      .populate({ path: "approvedBy", select: "email" })
      .populate({ path: "payee", select: "email firstName lastName" });

    res.json({ payments: { list: payments } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { payments } = await User.findById(id, {
      payments: 1,
      _id: -1,
    }).populate({
      path: "payments.list",
      select: "status _id amount concept paypalEmail creationDate",
    });

    res.json({ payments: payments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// create a payment
router.post("/payment-creation/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw Error("User doesn't exit or is not logged in");
    }

    const newPayment = await new Payment({
      ...req.body,
      payee: id,
      paypalEmail: user.paypalEmail,
    }).save();

    user.payments.push(newPayment._id);
    user.save();

    res.json({ message: "New payment created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// make a payment and update payment date
// change status
router.put("/update-payment-status", async (req, res) => {
  const { id, status } = req.body;

  try {
    await Payment.findOneAndUpdate({ _id: id }, { $set: { status } });
    res.json({ message: "Payment status successfully changed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
