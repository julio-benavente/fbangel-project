const { transporter } = require("../emailTransporter");
const { createToken } = require("../createToken");
const { emailVerificationTemplate } = require("../../utils/emailsTemplates/templates");

const emailVerification = async (user, hostname) => {
  const token = createToken(user._id, "1d", process.env.EMAIL_VERIFICATION_KEY);

  const url = `${hostname === "localhost" ? "http://localhost:3000" : "//" + hostname}/confirm-email/${token}`;

  const html = emailVerificationTemplate(user.firstName, url, user.referralCodeLink);

  try {
    const emailResponse = await transporter.sendMail({
      from: `fb4angel  <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Email confirmation",
      html,
    });

    return emailResponse;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  emailVerification,
};
