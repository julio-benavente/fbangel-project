const { transporter } = require("../emailTransporter");
const { createToken } = require("../createToken");

const paypalEmailVerification = async (user, to) => {
  const token = createToken(
    user._id,
    "1d",
    process.env.PAYPAL_EMAIL_CONFIRMATION
  );
  const url = `http://localhost:5000/auth/confirm-paypal-email/${token}`;

  try {
    const emailResponse = await transporter.sendMail({
      to,
      subject: "Paylpal email confirmation",
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
