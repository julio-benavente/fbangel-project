const { transporter } = require("../emailTransporter");
const { createToken } = require("../createToken");
const { paypalEmailVerificationTemplate } = require("../../utils/emailsTemplates/templates");

const paypalEmailVerification = async (user, to, hostname) => {
  const token = createToken(user._id, "1d", process.env.PAYPAL_EMAIL_CONFIRMATION);
  const url = `${hostname === "localhost" ? "http://localhost:3000" : "//" + hostname}/confirm-paypal-email/${token}`;

  const html = paypalEmailVerificationTemplate(url);

  try {
    const emailResponse = await transporter.sendMail({
      from: `fb4angel  <${process.env.EMAIL_USER}>`,
      to,
      subject: "Paypal email confirmation",
      html,
    });

    return emailResponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { paypalEmailVerification };
