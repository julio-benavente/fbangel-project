const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: Number,
});

module.exports = Counter = mongoose.model("counter", CounterSchema);
