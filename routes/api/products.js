const router = require("express").Router();

// Models
const Product = require("../../models/Product");
const Order = require("../../models/Order");

// Middleware and utils
const auth = require("../../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/create-product", auth, async (req, res) => {
  const { name, prices } = req.body;
  try {
    const product = await new Product({ name, prices }).save();
    res.json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
