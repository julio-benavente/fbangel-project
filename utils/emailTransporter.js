const nodemailer = require("nodemailer");
require("dotenv").config();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

transporter
  .verify()
  .then(() => console.log("Ready form send email"))
  .catch((error) => console.log(error));

module.exports = { transporter };
