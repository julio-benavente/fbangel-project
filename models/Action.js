const mongoose = require("mongoose");

const ActionSchema = new mongoose.Schema({
  details: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      modification: {
        type: Map,
        requred: true,
      },
      action: {
        type: String,
        required: true,
      },
    },
  ],
  target: {
    type: String,
    enum: ["user", "payment"],
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    requied: true,
    ref: "adminuser",
  },
  action: {
    type: String,
    required: true,
  },
  errorList: Array,
});

module.exports = Action = mongoose.model("action", ActionSchema);
