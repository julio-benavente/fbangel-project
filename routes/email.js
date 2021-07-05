const express = require("express");
const router = express.Router();
const { transporter } = require("../utils/emailTransporter");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  const html = `
  <p><b>From:</b> ${name}</p>
  <p><b>Email:</b> ${email}</p>
  <p><b>Message:</b> </br> ${message}</p>
  `;

  try {
    const response = await transporter.sendMail({
      from: `fb4angel  <${process.env.EMAIL_USER}>`,
      to: "julio@fbangel.com",
      subject: `A message from ${name}`,
      html: html,
    });

    res.json({ message: response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
