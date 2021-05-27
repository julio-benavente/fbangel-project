const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
  concept: {
    type: String,
    required: true,
    // unique: true,
    default: function () {
      return this.product;
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  payee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  paymentMethod: {
    type: String,
    // required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  emailNotification: {
    type: Boolean,
    required: true,
    default: false,
  },
  whatsAppNotification: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "error", "payed", "canceled"],
    default: "pending",
  },
  paypalEmail: {
    type: String,
    required: true,
  },
  paypalCode: {
    type: String,
  },
  paymentDate: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminUser",
    required: true,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminUser",
  },
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);
