const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  concept: {
    type: String,
    required: true,
    default: function () {
      return this.product;
    },
  },
  payments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "payment",
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "payed", "canceled"],
    default: "pending",
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
  errorsList: {
    type: Array,
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
