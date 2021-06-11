const { transporter } = require("../emailTransporter");
const { createToken } = require("../createToken");

const emailVerification = async (user, hostname) => {
  const token = createToken(user._id, "1d", process.env.EMAIL_VERIFICATION_KEY);

  const url = `${
    hostname === "localhost" ? "http://localhost:3000" : "//" + hostname
  }/confirm-email/${token}`;

  try {
    const emailResponse = await transporter.sendMail({
      to: user.email,
      subject: "Email confirmation",
      html: `
      <p>
        Please, confirm your email here:
        <b><a href="${url}" target="_blank">HERE</a></b>
      </p>
      <br/>
      <p>
        Your referral link is this:
        <b><a href="${user.referralCodeLink}" target="_blank">${user.referralCodeLink}</a></b>
      </p>`,
    });

    return emailResponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { emailVerification };
