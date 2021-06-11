const { transporter } = require("../emailTransporter");
const { createToken } = require("../createToken");

const paypalEmailVerification = async (user, to, hostname) => {
  const token = createToken(
    user._id,
    "1d",
    process.env.PAYPAL_EMAIL_CONFIRMATION
  );
  const url = `${
    hostname === "localhost" ? "http://localhost:3000" : hostname
  }/confirm-paypal-email/${token}`;

  try {
    const emailResponse = await transporter.sendMail({
      to,
      subject: "Paypal email confirmation",
      html: `
      <p>
        Please, go to this link to confirm your paypal email: 
        <b><a href="${url}" target="_blank">HERE</a></b>
      </p>`,
    });

    return emailResponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { paypalEmailVerification };
