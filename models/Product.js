const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  abrv: {
    type: String,
    default: function () {
      return this.name;
    },
  },
  prices: [
    {
      tierName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  pricesHistory: [
    {
      tierName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      creationDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
