const express = require("express");
const router = express.Router();
const { transporter } = require("../utils/emailTransporter");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  console.log(name, email, message);

  try {
    const response = await transporter.sendMail({
      to: "julio@fbangel.com",
      subject: `A message from ${name}`,
      text: message,
    });

    res.json({ message: response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
