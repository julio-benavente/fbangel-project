const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  notificated: {
    type: Boolean,
    required: true,
    default: false,
  },
  concept: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "error", "success", "rejected"],
    default: "pending",
  },
  paypalEmail: {
    type: String,
    required: true,
  },
  paypalCode: {
    type: String,
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
  paymentDate: {
    type: Date,
  },
  whatsAppMessage: {
    type: Boolean,
    default: false,
  },
  payee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);
